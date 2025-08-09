# syntax=docker/dockerfile:1.6
ARG NODE_VERSION=18-alpine
ARG PNPM_VERSION=9.0.0
ARG APP=nitro-api
ARG USE_PREBUILT=false

###############################################################################
# Stage 1: Base dependency graph installation (maximize layer caching)
###############################################################################
FROM node:${NODE_VERSION} AS base-deps
ARG PNPM_VERSION
ARG APP
ARG USE_PREBUILT

ENV CI=true \
    PNPM_HOME=/root/.local/share/pnpm \
    NODE_ENV=development

# Enable corepack & activate specific pnpm version
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /repo

# Copy workspace root manifests (only what is needed to resolve dependency graph)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
# Optionally include .npmrc if present (BuildKit bind mount); create empty placeholder if absent
COPY .npmrc* ./
RUN if [ -f .npmrc ]; then \
    echo "Using workspace .npmrc"; \
    else \
    echo "No .npmrc found; creating empty .npmrc placeholder" && touch .npmrc; \
    fi
# Copy all packages' package.json files
COPY packages ./packages
# Copy target Nitro app manifest
COPY apps/${APP}/package.json ./apps/${APP}/package.json

# Strip non-package.json files from packages to optimize caching (optional)
RUN find packages -mindepth 2 -maxdepth 2 ! -name package.json -exec rm -rf {} + || true

# Install full dependency graph (including dev dependencies for build)
RUN pnpm install --frozen-lockfile

###############################################################################
# Stage 2: Build the Nitro app
###############################################################################
FROM base-deps AS build
ARG APP
ARG USE_PREBUILT

# Copy the full repository (source code)
COPY . .

# Build only the specified Nitro app (Turbo optional; fall back if not configured)
# We try turbo first for consistency with monorepo; if no turbo task defined for the app
# you may switch to: RUN pnpm --filter ${APP} run build
RUN if [ "${USE_PREBUILT}" != "true" ]; then (pnpm turbo run build --filter=${APP}) || (echo "Turbo build fallback -> pnpm build" && pnpm --filter ${APP} run build); else echo "Skipping build (USE_PREBUILT=true); expecting prebuilt apps/${APP}/.output"; fi

# After build, .output will exist at apps/${APP}/.output
#
# (Skip pruning here; we'll create a clean production-only install in a separate stage.)
###############################################################################
# Stage 3: Production dependencies (install only prod graph)
###############################################################################
FROM node:${NODE_VERSION} AS prod-deps
ARG PNPM_VERSION
ARG APP
ENV NODE_ENV=production \
    PNPM_HOME=/root/.local/share/pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /repo
# Copy manifests needed to resolve production dependency graph
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY --from=build /repo/.npmrc .npmrc
# Copy workspace packages (source needed if they are not fully bundled by Nitro)
COPY packages ./packages
# Copy target app manifest
COPY apps/${APP}/package.json ./apps/${APP}/package.json
# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

###############################################################################
# Stage 4: Production runtime image
###############################################################################
FROM node:${NODE_VERSION} AS runtime
ARG PNPM_VERSION
ARG APP

ENV NODE_ENV=production \
    PNPM_HOME=/root/.local/share/pnpm \
    PORT=5000

# Install pnpm (lightweight; optional but keeps parity with dev scripts if needed)
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# Copy root manifests (sometimes required for resolving workspace meta)
COPY --from=prod-deps /repo/package.json /repo/pnpm-lock.yaml /repo/pnpm-workspace.yaml /repo/turbo.json ./
COPY --from=prod-deps /repo/.npmrc ./.npmrc

# Copy production node_modules
COPY --from=prod-deps /repo/node_modules ./node_modules

# Copy any runtime-needed workspace package source (if Nitro left externals were left unbundled)
COPY --from=prod-deps /repo/packages ./packages

# Copy compiled Nitro output only (no source needed at runtime)
COPY --from=build /repo/apps/${APP}/.output ./apps/${APP}/.output
# Optionally keep the app's package.json for reference / debugging
COPY --from=build /repo/apps/${APP}/package.json ./apps/${APP}/package.json

# Switch to the Nitro output directory for runtime execution convenience
WORKDIR /app/apps/${APP}

EXPOSE 5000

# Basic healthcheck (tweak path if you add a dedicated endpoint)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -qO- "http://127.0.0.1:${PORT}/" >/dev/null 2>&1 || exit 1

# Start the Nitro server
# For Node preset: node .output/server/index.mjs
CMD ["node", ".output/server/index.mjs"]
