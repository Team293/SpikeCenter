# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=18-alpine
ARG PNPM_VERSION=10.14.0
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
# Remove all other apps so their lifecycle scripts (e.g. prepare) cannot run during prune
RUN find apps -mindepth 1 -maxdepth 1 ! -name "${APP}" -exec rm -rf {} +


# (Optional) You can enable Turbo remote caching here by providing env vars/secrets.
# ENV TURBO_TOKEN=... TURBO_TEAM=...

# Build ONLY the selected app (Turbo will build its dependent packages first)
# Using explicit --filter keeps build scope tight if other apps exist.
RUN if [ "${USE_PREBUILT}" != "true" ]; then pnpm turbo run build --filter=${APP}; else echo "Skipping Docker build step (USE_PREBUILT=true). Expecting prebuilt apps/${APP}/.next"; fi

# After build, create separate production dependency layer instead of in-place prune
###############################################################################
# Stage 3: production dependencies (install only prod graph for target app)
###############################################################################
FROM node:${NODE_VERSION} AS prod-deps
ARG PNPM_VERSION
ARG APP
ENV NODE_ENV=production \
    PNPM_HOME=/root/.local/share/pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /repo
# Copy manifests needed to resolve dependency graph
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY --from=build /repo/.npmrc .npmrc
# Copy workspace packages (source needed if shared code not fully bundled)
COPY packages ./packages
# Copy target app manifest
COPY apps/${APP}/package.json ./apps/${APP}/package.json
# Install only production dependencies for the selected app and its graph
RUN pnpm install --prod --frozen-lockfile --filter ./apps/${APP}

###############################################################################
# Stage 4: production runtime image
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
COPY --from=prod-deps /repo/package.json /repo/pnpm-lock.yaml /repo/pnpm-workspace.yaml /repo/turbo.json ./
COPY --from=prod-deps /repo/.npmrc ./.npmrc

# Copy production node_modules
COPY --from=prod-deps /repo/node_modules ./node_modules

# Copy the built app artifacts and required runtime files
COPY --from=build /repo/apps/${APP} ./apps/${APP}
# If only a production env file was shipped in the artifact, promote it to .env
RUN if [ -d "./apps/${APP}" ]; then \
    if [ ! -f "./apps/${APP}/.env" ] && [ -f "./apps/${APP}/.env.production" ]; then \
    echo "No .env found; using .env.production as .env"; \
    cp ./apps/${APP}/.env.production ./apps/${APP}/.env; \
    fi; \
    fi

# Copy any runtime code for shared packages that may be required
COPY --from=prod-deps /repo/packages ./packages

# Set working directory to the selected app for convenience
WORKDIR /app/apps/${APP}

EXPOSE 3000

# A simple healthcheck hitting Next.js default path
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1:${PORT}/api/health || exit 1

CMD ["pnpm", "start"]
