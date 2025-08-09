# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=18-alpine
ARG PNPM_VERSION=9.0.0
# APP must match a directory under /apps
ARG APP=auth
# Set to true to skip building inside Docker and use pre-built .next artifacts
ARG USE_PREBUILT=false

###############################################################################
# Stage 1: base dependencies (install only what's needed to resolve workspace)
###############################################################################
FROM node:${NODE_VERSION} AS base-deps
ARG PNPM_VERSION
ARG APP
ARG USE_PREBUILT

ENV CI=true \
    PNPM_HOME=/root/.local/share/pnpm \
    NODE_ENV=development

# Enable corepack & set pnpm version
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /repo

# Copy only the dependency graph first (maximize layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
# Optionally bring in .npmrc if it exists (non-fatal if absent)
COPY .npmrc* ./
RUN if [ -f .npmrc ]; then \
    echo "Using workspace .npmrc"; \
    else \
    echo "No .npmrc found; creating empty .npmrc placeholder" && touch .npmrc; \
    fi

# Copy all workspace package manifests (no source yet)
# This pattern copies only the package.json files for dependency resolution.
COPY packages ./packages
COPY apps/${APP}/package.json ./apps/${APP}/package.json

# Remove everything except package.json inside packages to avoid invalidating cache excessively
# (If your packages contain build scripts requiring other files at install time, remove this loop.)
RUN find packages -mindepth 2 -maxdepth 2 ! -name package.json -exec rm -rf {} + || true

# Install all dependencies (including dev) for the whole graph
# (We need dev deps for building TypeScript, etc.)
RUN pnpm install --frozen-lockfile

###############################################################################
# Stage 2: build the selected app with Turbo (and its dependency graph)
###############################################################################
FROM base-deps AS build
ARG APP
ARG USE_PREBUILT

# Copy the full repo (now including source)
COPY . .

# (Optional) You can enable Turbo remote caching here by providing env vars/secrets.
# ENV TURBO_TOKEN=... TURBO_TEAM=...

# Build ONLY the selected app (Turbo will build its dependent packages first)
# Using explicit --filter keeps build scope tight if other apps exist.
RUN if [ "${USE_PREBUILT}" != "true" ]; then pnpm turbo run build --filter=${APP}; else echo "Skipping Docker build step (USE_PREBUILT=true). Expecting prebuilt apps/${APP}/.next"; fi

# After build, prune dev dependencies to prepare for runtime
RUN pnpm prune --prod

###############################################################################
# Stage 3: create a pruned production filesystem for just the selected app
###############################################################################
FROM node:${NODE_VERSION} AS runtime
ARG PNPM_VERSION
ARG APP

ENV NODE_ENV=production \
    PORT=3000 \
    PNPM_HOME=/root/.local/share/pnpm

# Install pnpm (small footprint) for running 'pnpm start' if desired
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# Copy root manifests (some Next.js runtime code still resolves workspace metadata)
COPY --from=build /repo/package.json /repo/pnpm-lock.yaml /repo/pnpm-workspace.yaml /repo/turbo.json ./
COPY --from=build /repo/.npmrc ./.npmrc

# Copy production node_modules (already pruned)
COPY --from=build /repo/node_modules ./node_modules

# Copy the built app artifacts and required runtime files
# .next (build output), public assets, next config, package.json
# Copy entire app directory (contains .next, public, configs, middleware, package.json)
COPY --from=build /repo/apps/${APP} ./apps/${APP}

# Copy any built output / runtime code for shared packages that may be needed at runtime.
# If packages serve code directly from src/ at runtime, copy src instead or mount at runtime.
COPY --from=build /repo/packages ./packages

# Set working directory to the selected app for convenience
WORKDIR /app/apps/${APP}

EXPOSE 3000

# A simple healthcheck hitting Next.js default path
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1:${PORT}/api/health || exit 1

# Default command: start Next.js server

# We invoke via pnpm to respect the app's start script (typically `next start`)
CMD ["pnpm", "start"]
