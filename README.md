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

## 🛠️ Flujo de Trabajo Diario

### 1. Ramas (Branches)

- **main**
  - Rama protegida: sólo se hacen merges vía Pull Request (PR).
  - Contiene siempre código estable y listo para producción o demo.

- **feature/**  
  - Prefijo para nuevas funcionalidades.  
  - Ejemplo: `feature/patients-crud`, `feature/appointments-calendar`.

- **fix/**  
  - Prefijo para correcciones de bugs.  
  - Ejemplo: `fix/auth-redirect`, `fix/db-connection`.

- **refactor/**  
  - Prefijo para refactorizaciones de código sin añadir features ni fixes.  
  - Ejemplo: `refactor/ui-layout`, `refactor/hooks`.

- **hotfix/**  
  - Prefijo para arreglos críticos que van directo a producción.  
  - Ejemplo: `hotfix/logout-error`.

- **release/** (opcional)  
  - Para preparar un conjunto de cambios antes de merge a `main`.  
  - Ejemplo: `release/v0.1.0`.

  
- **Tipos principales**:  
  - `feat`: nueva funcionalidad  
  - `fix`: corrección de bug  
  - `refactor`: cambio de código sin feature ni bugfix  
  - `chore`: tareas de infraestructura o config  
  - `docs`: cambios en documentación  
  - `test`: añadir o modificar tests

- **Scopes**:  
  - Define el área afectada: `patients`, `auth`, `ui`, `db`, etc.  
  - Ejemplo: `feat(patients): add GET /api/patients endpoint`

- **Ejemplos**:  
  - `feat(ui): create reusable Button component`  
  - `fix(db): correct foreign key relation on Appointment`  
  - `chore(ci): add Prisma migrate deploy step`  

### 3. Pull Requests & Merges

1. **Crear PR** desde tu rama `feature/...` hacia `main`.  
2. **Descripción del PR**:
   - ¿Qué cambia?  
   - ¿Por qué?  
   - Capturas de pantalla o ejemplos (si aplica).  
   - Referencia al issue (`Closes #23`).

3. **Revisiones**:
   - Al menos 1 revisor.  
   - Verificar lint, tests y cumplimiento de convenciones.

4. **Merge Strategy**:
   - **Squash and merge** para unificar commits de la rama en uno solo en `main`.  
   - Mensaje resultante: usar el título del PR o combinar múltiples Conventional Commits.

### 4. Versionado y Releases

- Sigue [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`.
  - **PATCH** (0.0.x): bug fixes no rompen compatibilidad.
  - **MINOR** (0.x.0): nuevas features compatibles.
  - **MAJOR** (x.0.0): cambios que rompen compatibilidad.
- Crea un **tag** tras un merge a `main`:
  ```bash
  git tag v0.1.0
  git push origin v0.1.0


## 🚀 Cómo trabajar día a día

Este es tu flujo de trabajo diario para mantener orden, calidad y velocidad en el desarrollo de tu sistema odontológico:

1. 🔄 **Sincronizar con `main`**  
   Antes de arrancar cada jornada o cada nueva tarea, trae los últimos cambios:
   
   git fetch origin
   git checkout main
   git pull origin main


2. 🌿 **Cambiar a la rama de trabajo**
Escoge la rama feature/fix/refactor correspondiente:

    git checkout feature/mi-tarea

3. 🔧 **Rebase para mantener historial limpio**
Integra los cambios de main en tu rama antes de empezar a codificar:

    git fetch origin
    git rebase origin/main


4. ✍️ **Commits atómicos y descriptivos**

Haz commits pequeños que aborden una sola unidad de trabajo (una API, un componente, un test).
Usa Conventional Commits:

    git add ruta/al/archivo
    git commit -m "feat(patients): create POST /api/patients endpoint"

Tipos y scopes:

feat(scope): descripción breve

fix(scope): descripción breve

refactor(scope): descripción breve

chore(scope): descripción breve


🛠 **RAMAS CREADAS**
      Rama	                                 Descripción
feature/auth-nextauth	        Configuración y desarrollo del sistema de autenticación con NextAuth.js
feature/patients-crud	        CRUD completo para pacientes
feature/professionals-crud	  CRUD para profesionales odontológicos
feature/schedule-calendar	    Gestión de turnos y calendario de citas
feature/invoice-crud	        Módulo de facturación y cobros




## 🗓️ Día 2: Modelado de Datos & Migraciones

Hoy hemos diseñado e implementado la **columna vertebral** de datos de nuestro MVP odontológico. A continuación, un resumen de los avances y artefactos generados:

### 🎯 Objetivos alcanzados
- Formalizar los **requisitos de datos** de nuestro sistema (usuarios, pacientes, profesionales, turnos, facturas).
- Diseñar un **ERD simplificado** que refleja relaciones 1 a N y N a 1.
- Normalizar el modelo hasta **3 FN**, eliminando arrays y dependencias transitivas.
- Utilizar **enums nativos** de Prisma/PostgreSQL para valores estrictos (`Role`, `DayOfWeek`, `AppointmentType`).

---

### 📦 Modelos Prisma implementados

```prisma
model User { 
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  role         Role     @default(RECEP)
  createdAt    DateTime @default(now())
}

model Patient {
  id           String        @id @default(cuid())
  name         String
  email        String?       @unique
  phone        String?
  notes        String?
  createdAt    DateTime      @default(now())
  appointments Appointment[]
}

model Professional {
  id             String          @id @default(cuid())
  name           String
  specialty      String
  createdAt      DateTime        @default(now())
  availabilities Availability[]
  appointments   Appointment[]
}

model Availability {
  id             String        @id @default(cuid())
  professional   Professional  @relation(fields: [professionalId], references: [id])
  professionalId String
  day            DayOfWeek
  startTime      String
  endTime        String
  @@unique([professionalId, day])
}

model Appointment {
  id              String          @id @default(cuid())
  patient         Patient         @relation(fields: [patientId], references: [id])
  patientId       String
  professional    Professional    @relation(fields: [professionalId], references: [id])
  professionalId  String
  startAt         DateTime
  endAt           DateTime
  type            AppointmentType
  createdAt       DateTime        @default(now())
  invoice         Invoice?
  @@index([professionalId, startAt])
}

model Invoice {
  id             String      @id @default(cuid())
  appointment    Appointment @relation(fields: [appointmentId], references: [id])
  appointmentId  String      @unique
  amount         Float
  paid           Boolean     @default(false)
  createdAt      DateTime    @default(now())
}

enum Role {
  ADMIN
  ODONT
  RECEP
}

enum DayOfWeek {
  MON
  TUE
  WED
  THU
  FRI
  SAT
  SUN
}

enum AppointmentType {
  CONSULTATION
  CLEANING
  FILLING
  EXTRACTION
  ROOT_CANAL
  ORTHODONTICS
  PERIODONTICS
  PROSTHODONTICS
  EMERGENCY
  WHITENING
}
```

## 📘 Estado Actual del Proyecto

A continuación un **resumen claro y conciso** de todo lo implementado hasta el momento:

### 🚀 Configuración Inicial  
- Monorepo con **Next.js (App Router) + TypeScript** bajo `src/app`.  
- **TailwindCSS** y `@shadcn/ui` instalados y configurados.  
- **Docker Compose** levantando PostgreSQL (dev) y Prisma configurado en `packages/db`.  
- Estructura de carpetas profesional organizada en:
  - `src/app/` → rutas, layouts y API Routes  
  - `src/lib/` → instancia de Prisma, configuración de NextAuth y esquemas Zod  
  - `src/components/` → UI genéricos  
  - `src/hooks/`, `src/styles/` y `scripts/`

---

### 🗄️ Modelado de Datos & Migraciones  
- **Prisma schema** normalizado (3FN) en `packages/db/prisma/schema.prisma` con modelos:
  - `User`, `Patient`, `Professional`, `Availability`, `Appointment`, `Invoice`  
  - Enums nativos: `Role`, `DayOfWeek`, `AppointmentType`  
- Migraciones aplicadas (`npx prisma migrate dev`) y cliente generado (`npx prisma generate`).  
- **Prisma Studio** listo para inspeccionar datos de desarrollo.

---

### 🔐 Autenticación con NextAuth.js  
- **NextAuth.js** integrado via App Router en `src/app/api/auth/[...nextauth]/route.ts`.  
- **CredentialsProvider** con hash de contraseña (bcrypt) y validación en `authorize`.  
- **Callbacks** para inyectar `role` en JWT y `session.user`.  
- **Module augmentation** de NextAuth para TypeScript (`src/types/next-auth.d.ts`).  
- **Middleware** (`src/middleware.ts`) protegiendo rutas bajo `/patients`, `/professionals`, `/schedule`, `/invoices`.  
- **Providers** Client Component (`src/app/providers.tsx`) para envolver la app con `SessionProvider`.

---

### ✍️ Registro de Usuarios (Endpoint `/api/register`)  
- **Esquema Zod** (`src/lib/schemas/user.ts`) validando `email`, `password`, `name` y `role`.  
- **API Route** `POST /api/register` en `src/app/api/register/route.ts`:
  - Valida input, checa existencia, hashea contraseña y crea usuario.  
  - Devuelve solo campos públicos (`id`, `email`, `name`, `role`, `createdAt`).  
  - Códigos HTTP apropiados: **201**, **400**, **422**.  
- **Pruebas** manuales en Postman o cURL confirmadas.



