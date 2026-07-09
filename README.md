# Voryent Solutions

Production-ready monorepo for the Voryent Solutions website.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **UI:** shadcn/ui
- **Monorepo:** Turborepo
- **Linting:** ESLint
- **Formatting:** Prettier

## Structure

```
voryent_solutions-website/
├── apps/
│   └── website/          # Next.js application
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── config/           # Shared configuration
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utility functions
├── docs/                 # Documentation
├── scripts/              # Build & utility scripts
├── .github/workflows/    # CI/CD pipelines
└── .vscode/              # Editor settings
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Type Check

```bash
npm run type-check
```

## License

Private — all rights reserved.