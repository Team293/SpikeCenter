#!/usr/bin/env bash
#
# deploy-web.sh
#
# Placeholder script for deploying web assets (Next.js apps + nitro-api).
# This is NOT yet wired to any real infrastructure. You will fill in the
# provider-specific steps (e.g. AWS S3 + CloudFront, Vercel, Fly.io, Render, etc.).
#
# Intended usage (inside CI after build job artifacts are downloaded/unpacked):
#   bash tooling/deploy-web.sh \
#     --apps "auth,landing,learn,scout" \
#     --api nitro-api \
#     --build-root "${GITHUB_WORKSPACE:-.}/apps" \
#     --strategy placeholder
#
# Safe bash settings
set -euo pipefail

#######################################
# Globals (defaults; can be overridden by flags or env)
#######################################
APPS_CSV="${APPS_CSV:-auth,landing,learn,scout}"   # Comma-separated Next.js apps
API_APP="${API_APP:-nitro-api}"                    # Nitro API directory name
BUILD_ROOT="${BUILD_ROOT:-apps}"                   # Root where app folders live
DEPLOY_STRATEGY="${DEPLOY_STRATEGY:-placeholder}"  # e.g. placeholder|vercel|aws|custom
DRY_RUN="${DRY_RUN:-false}"

# Color helpers
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
deploy-web.sh - Deploy built web artifacts (placeholder)

Flags:
  --apps <csv>            Comma-separated list of Next.js app directory names (default: ${APPS_CSV})
  --api <name>            Nitro API directory name (default: ${API_APP})
  --build-root <path>     Root directory containing app folders (default: ${BUILD_ROOT})
  --strategy <name>       Deployment strategy (placeholder|vercel|aws|custom) (default: ${DEPLOY_STRATEGY})
  --dry-run               Show what would be done without executing provider actions
  -h|--help               Show this help

Env overrides:
  APPS_CSV, API_APP, BUILD_ROOT, DEPLOY_STRATEGY, DRY_RUN

Exit codes:
  0 success
  2 usage error
EOF
}

#######################################
# Parse args
#######################################
while [[ $# -gt 0 ]]; do
  case "$1" in
    --apps) APPS_CSV="$2"; shift 2 ;;
    --api) API_APP="$2"; shift 2 ;;
    --build-root) BUILD_ROOT="$2"; shift 2 ;;
    --strategy) DEPLOY_STRATEGY="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) err "Unknown argument: $1"; usage; exit 2 ;;
  esac
done

IFS=',' read -r -a APPS <<<"$APPS_CSV"

#######################################
# Validation
#######################################
require_dir() {
  local d="$1"
  [[ -d "$d" ]] || { err "Missing directory: $d"; return 1; }
}

for app in "${APPS[@]}"; do
  require_dir "${BUILD_ROOT}/${app}" || exit 1
  require_dir "${BUILD_ROOT}/${app}/.next" || {
    warn "No .next build output for app '${app}' (was it built?)."
  }
done

require_dir "${BUILD_ROOT}/${API_APP}" || exit 1
# Nitro build output default: .output
if [[ ! -d "${BUILD_ROOT}/${API_APP}/.output" ]]; then
  warn "Nitro API build output not found: ${BUILD_ROOT}/${API_APP}/.output"
fi

log "Deployment strategy: ${DEPLOY_STRATEGY}"
log "Apps: ${APPS_CSV}"
log "API: ${API_APP}"
log "Build root: ${BUILD_ROOT}"
$DRY_RUN && warn "Running in DRY RUN mode (no external changes)."

#######################################
# Strategy dispatch
#######################################
deploy_placeholder_next_app() {
  local app="$1"
  local build_dir="${BUILD_ROOT}/${app}/.next"
  if [[ ! -d "$build_dir" ]]; then
    warn "Skipping app '${app}' (missing build dir: $build_dir)"
    return 0
  fi
  log "[placeholder] Would deploy Next.js app '${app}' from: ${build_dir}"
  # Future: implement provider-specific steps.
}

deploy_placeholder_nitro_api() {
  local api="$1"
  local out_dir="${BUILD_ROOT}/${api}/.output"
  if [[ ! -d "$out_dir" ]]; then
    warn "Skipping API '${api}' (missing output dir: $out_dir)"
    return 0
  fi
  log "[placeholder] Would deploy Nitro API '${api}' from: ${out_dir}"
  # Future: implement provider-specific steps.
}

deploy_apps_placeholder() {
  for app in "${APPS[@]}"; do
    deploy_placeholder_next_app "$app"
  done
  deploy_placeholder_nitro_api "$API_APP"
}

#######################################
# Future real strategies (stubs)
#######################################
deploy_apps_vercel() {
  err "Strategy 'vercel' not implemented. Fill in Vercel CLI/API steps."
  return 1
}

deploy_apps_aws() {
  err "Strategy 'aws' not implemented. Provide S3/CloudFront/Lambda steps."
  return 1
}

deploy_apps_custom() {
  err "Strategy 'custom' not implemented. Provide bespoke infra steps."
  return 1
}

#######################################
# Main dispatcher
#######################################
case "$DEPLOY_STRATEGY" in
  placeholder) deploy_apps_placeholder ;;
  vercel) deploy_apps_vercel ;;
  aws) deploy_apps_aws ;;
  custom) deploy_apps_custom ;;
  *)
    err "Unknown strategy: $DEPLOY_STRATEGY"
    exit 2
    ;;
esac

ok "Deployment script completed (strategy=${DEPLOY_STRATEGY})."

if [[ "$DEPLOY_STRATEGY" == "placeholder" ]]; then
  cat <<'NEXT_STEPS'

Next steps to implement real deployment:
  1. Decide hosting targets for each app (e.g. Vercel for Next.js, AWS Lambda + API Gateway for Nitro, etc.).
  2. Add secrets to the repository (Settings > Secrets and variables).
  3. Replace the placeholder strategy with a real one or implement a custom block:
       - Acquire artifacts: In GitHub Actions, use actions/download-artifact before running this script.
       - For Next.js static+SSR on Vercel: invoke 'vercel deploy' with proper token & project linking.
       - For AWS:
           a. Sync static assets (.next/static) to S3.
           b. Deploy server code (if using serverless) via CDK/SAM or Terraform.
           c. Invalidate CloudFront.
       - For Nitro: choose deployment preset (node server, lambda, edge). Deploy accordingly.

  4. Remove DRY_RUN or add a --confirm flag before destructive operations.
  5. Add logging + monitoring hooks.

Edit this script to embed the actual commands for your chosen provider(s).
NEXT_STEPS
fi
