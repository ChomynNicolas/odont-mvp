This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


📦odontoclub-mvp
 ┣ 📂.github
 ┃ ┗ 📂workflows
 ┃   ┗ CI.yml             # GitHub Actions: lint, test, build, migrate
 ┣ 📂src
 ┃   ┣ 📂app              # App Router (Next.js)
 ┃   ┣ 📂components       # UI genéricos (shadcn/ui + custom)
 ┃   ┣ 📂styles           # globals.css, tokens
 ┃   ┣ 📂lib              # utilerías: prisma client, auth, api-clients
 ┃   ┣ 📂hooks            # React hooks reutilizables (usePatients,…)
 ┃   ┣ 📂config           # config (env schemas, zod schemas)
 ┃   ┣ 📂public           # imágenes, favicon
 ┃   ┣ next.config.js
 ┃   ┗ tsconfig.json
 ┣ 📂packages
 ┃ ┣ 📂db                # prisma/schema.prisma + migrations
 ┃ ┣ 📂types             # tipos TS compartidos (User, Patient,…)
 ┃ ┗ 📂ui                # tus componentes personalizados (tailwind + shadcn)
 ┣ 📂scripts
 ┃ ┣ seed.ts            # seeds de desarrollo
 ┃ ┗ migrate.sh         # script para CI: prisma migrate deploy
 ┣ .env.example         # variables de entorno mínimas
 ┣ docker-compose.yml   # Postgres dev
 ┣ package.json
 ┣ turbo.json           # (si usas Turborepo)
 ┣ README.md
 ┗ CHANGELOG.md



## Commits y convenciones

Commit inicial (“chore: init monorepo structure”)

Commits atómicos: cada PR aborda un solo propósito.

Mensajes semánticos (Conventional Commits):

feat: para nuevas funcionalidades

fix: para correcciones de bugs

chore: tareas de infraestructura (config, deps)

refactor: cambios de código sin nuevo feature ni bugfix

docs: cambios de documentación


## Estrategia de branches y releases

GitHub Flow ligero
main protegida: sólo merge via Pull Request.

feature/ ramas para funcionalidades: feature/auth-nextauth, feature/patients-crud.

hotfix/ para arreglos críticos en producción.

release/ opcional: si quieres QA antes de merge a main.
