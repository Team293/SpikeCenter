#!/usr/bin/env bash
#
# deploy-mobile.sh
#
# Placeholder script for building and deploying the mobile (Expo / React Native) application.
# You will fill in the real steps later (EAS build/submit, Fastlane, etc.).
#
# Safe bash settings
set -euo pipefail

#######################################
# Defaults (can be overridden by flags / env)
#######################################
APP_DIR="${APP_DIR:-apps/mobile}"
PLATFORM="${PLATFORM:-all}" # ios|android|all
BUILD_PROFILE="${BUILD_PROFILE:-production}" # expo/eas profile name
OUTPUT_DIR="${OUTPUT_DIR:-dist-mobile}"
STRATEGY="${STRATEGY:-placeholder}" # placeholder|eas|fastlane|custom
DRY_RUN="${DRY_RUN:-false}"

c_red=$'\033[31m'
c_green=$'\033[32m'
c_yellow=$'\033[33m'
c_cyan=$'\033[36m'
c_reset=$'\033[0m'

log() { printf "%s[%s]%s %s\n" "$c_cyan" "$(date +'%H:%M:%S')" "$c_reset" "$*"; }
warn() { printf "%s[WARN]%s %s\n" "$c_yellow" "$c_reset" "$*"; }
err() { printf "%s[ERR ]%s %s\n" "$c_red" "$c_reset" "$*" >&2; }
ok() { printf "%s[OK  ]%s %s\n" "$c_green" "$c_reset" "$*"; }

usage() {
  cat <<EOF
deploy-mobile.sh - Placeholder mobile app deployment helper

Flags:
  --app-dir <dir>        Path to mobile app directory (default: $APP_DIR)
  --platform <name>      ios|android|all (default: $PLATFORM)
  --build-profile <name> EAS/Fastlane profile (default: $BUILD_PROFILE)
  --output <dir>         Where to write packaged artifacts (default: $OUTPUT_DIR)
  --strategy <name>      placeholder|eas|fastlane|custom (default: $STRATEGY)
  --dry-run              Show actions without executing
  -h|--help              Show this help

Env overrides: APP_DIR PLATFORM BUILD_PROFILE OUTPUT_DIR STRATEGY DRY_RUN

Exit codes:
  0 success
  2 usage error
EOF
}

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
    --app-dir) APP_DIR="$2"; shift 2 ;;
    --platform) PLATFORM="$2"; shift 2 ;;
    --build-profile) BUILD_PROFILE="$2"; shift 2 ;;
    --output) OUTPUT_DIR="$2"; shift 2 ;;
    --strategy) STRATEGY="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) err "Unknown argument: $1"; usage; exit 2 ;;
  esac
done

# Validation
if [[ ! -d "$APP_DIR" ]]; then
  err "Mobile app directory not found: $APP_DIR"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

log "Strategy: $STRATEGY"
log "App dir: $APP_DIR"
log "Platform(s): $PLATFORM"
log "Build profile: $BUILD_PROFILE"
$DRY_RUN && warn "Running in DRY RUN mode."

#######################################
# Placeholder actions
#######################################
placeholder_package() {
  local platform="$1"
  local fake_bundle="$OUTPUT_DIR/${platform}-placeholder.txt"
  if [[ "$DRY_RUN" == true ]]; then
    log "[placeholder] Would create artifact for $platform -> $fake_bundle"
  else
    echo "Placeholder artifact for $platform (profile=$BUILD_PROFILE)" > "$fake_bundle"
    log "[placeholder] Wrote $fake_bundle"
  fi
}

run_placeholder() {
  case "$PLATFORM" in
    ios) placeholder_package ios ;;
    android) placeholder_package android ;;
    all) placeholder_package ios; placeholder_package android ;;
    *) err "Unknown platform: $PLATFORM"; exit 2 ;;
  esac
  log "[placeholder] Deployment step would upload/sign/distribute here."
}

#######################################
# Strategy stubs
#######################################
run_eas() {
  err "Strategy 'eas' not implemented. Add 'eas build --platform ...' and 'eas submit' steps."
  return 1
}

run_fastlane() {
  err "Strategy 'fastlane' not implemented. Provide 'fastlane ios release' etc."
  return 1
}

run_custom() {
  err "Strategy 'custom' not implemented. Add bespoke pipeline logic."
  return 1
}

#######################################
# Dispatch
#######################################
case "$STRATEGY" in
  placeholder) run_placeholder ;;
  eas) run_eas ;;
  fastlane) run_fastlane ;;
  custom) run_custom ;;
  *) err "Unknown strategy: $STRATEGY"; exit 2 ;;
esac

ok "Mobile deployment script completed (strategy=$STRATEGY)."

if [[ "$STRATEGY" == "placeholder" ]]; then
  cat <<'NEXT_STEPS'

Next steps to implement real mobile deployment:
  1. Decide on distribution tooling (EAS, Fastlane, etc.).
  2. Add required secrets to CI (EXPO_TOKEN, APPLE_APP_SPECIFIC_PASSWORD, ANDROID_KEYSTORE, etc.).
  3. Replace placeholder strategy with real build commands, e.g.:
       eas build --platform ios --profile production
       eas build --platform android --profile production
  4. Optionally run 'eas submit' or Fastlane lanes to push to stores/TestFlight.
  5. Attach produced .ipa / .apk / .aab as artifacts or upload directly.
  6. Add versioning / changelog automation.

Edit this script to embed those commands.
NEXT_STEPS
fi
