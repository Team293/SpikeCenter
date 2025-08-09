# SpikeCenter
Crafting next-gen open-source solutions to accelerate FRC performance.

## Structure
SpikeCenter is a monorepo powered by turborepo.

## Contents
- `apps/`: Contains the main applications
  - `auth/`: Authentication service
  - `landing/`: Landing page
  - `learn/`: LMS
  - `mobile/`: Mobile app built with Expo
  - `nitro-api/`: TRPC API built with Nitro
  - `scout/`: SpikeScout
- `packages/`: Contains shared packages
  - `api/`: Contains the TRPC API endpoints
  - `auth/`: BetterAuth configuration
  - `client/`: TRPC client files
  - `config/`: Shared configuration files
  - `db/`: Database models and migrations
  - `env/`: Environment variable management
  - `features/`: Folder containing individual feature packages
  - `next/`: Next.js utilities (enhanced actions, trpc server callers)
  - `platforms/`: Folder containing platform-specific packages
  - `ui/`: Shared UI components
  - `mobile/`: Mobile utilities and components
- `tooling/`: Contains development tooling
  - `eslint-config/`: Shared ESLint configuration
  - `prettier-config/`: Shared Prettier configuration
  - `tailwind-config/`: Shared Tailwind CSS configuration
  - `typescript-config/`: Shared TypeScript configuration

## Getting Started
1. Clone the repository:
```bash
git clone https://github.com/Team293/SpikeCenter.git
cd SpikeCenter
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Setup Development Enviornment:
*Note: You need to have Docker installed and running.*
```bash
pnpm dev:setup
```

5. Start the development server:
```bash
pnpm dev
```

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug
3. Make your changes and commit them with clear messages.
4. Push your changes to your fork.
5. Create a pull request against the `staging` branch of the original repository.
