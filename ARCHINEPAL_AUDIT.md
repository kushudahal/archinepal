# ArchiNepal Existing Project Audit

Date: 2026-06-02

## 1. Existing Features Already Working

- Next.js App Router frontend with Tailwind CSS, reusable UI primitives, navbar, footer, cards, filters, and dashboard shell.
- Express backend with modular route/controller/service structure.
- Prisma + PostgreSQL configuration with a schema covering users, profiles, firms, projects, jobs, articles, events, comments, likes, bookmarks, notifications, sessions, reports, search logs, and audit logs.
- JWT authentication using access and refresh tokens.
- HTTP-only signed cookie support on the backend.
- Current-user endpoint at `GET /api/users/me`.
- Public browse endpoints for projects, firms, jobs, articles, events, and search.
- Authenticated create endpoints for projects, firms, jobs, articles, events, comments, likes, notifications, and upload URLs.
- Admin overview, report listing, project moderation, and role update endpoints exist in backend form.
- Storage service can generate S3 presigned URLs or Cloudinary signed upload parameters when credentials are configured.
- Socket.IO package and socket bootstrap file are present.

## 2. Existing Database Models

- `User`
- `Profile`
- `Firm`
- `Project`
- `Job`
- `Article`
- `Event`
- `Comment`
- `Like`
- `Bookmark`
- `Notification`
- `Session`
- `PasswordReset`
- `EmailVerification`
- `Report`
- `SearchLog`
- `AuditLog`

Current enums:

- `Role`: `architect`, `civil_engineer`, `interior_designer`, `student`, `firm_owner`, `admin`, `super_admin`, `moderator`, `editor`
- `ProjectCategory`: `residential`, `commercial`, `interior`, `landscape`, `urban`, `structural`, `BIM`
- `ProjectStatus`: `draft`, `pending_review`, `published`, `rejected`, `archived`
- `EmploymentType`: `full_time`, `part_time`, `contract`, `internship`, `remote`
- `EventType`: `seminar`, `workshop`, `webinar`, `competition`, `architecture_walk`
- `NotificationType`: `like`, `comment`, `follow`, `project_featured`, `event_reminder`, `job_alert`, `system`
- `ReportStatus`: `open`, `investigating`, `resolved`, `dismissed`

## 3. Existing API Routes

Mounted under `/api`:

- `/auth`: register, login, logout, refresh, forgot password, reset password
- `/users`: me, update me, get user by id
- `/projects`: list, view by slug, create, update, delete, like, comment
- `/firms`: list, create, view by slug
- `/jobs`: list, create, view by id
- `/articles`: list/create article routes exist
- `/events`: list/create event routes exist
- `/search`: global search, autocomplete, trending routes exist
- `/notifications`: notification routes exist
- `/storage/upload-url`: signed upload URL creation
- `/admin`: overview, reports, project status moderation, user role update

## 4. Existing Dashboard Pages

- Frontend has only `/dashboard`.
- No physical pages currently exist for:
  - `/dashboard/projects`
  - `/dashboard/upload`
  - `/dashboard/analytics`
  - `/dashboard/bookmarks`
  - `/dashboard/followers`
  - `/dashboard/settings`
  - `/admin`
  - `/admin/users`
  - `/admin/projects`
  - `/admin/jobs`
  - `/admin/companies`
  - `/admin/reports`
  - `/admin/categories`
  - `/admin/settings`
  - `/admin/analytics`
  - `/company/dashboard`
  - `/company/jobs`
  - `/company/applications`
  - `/company/settings`
  - `/company/analytics`

## 5. Existing Authentication System

- Registration hashes passwords with bcrypt.
- Login verifies bcrypt password and rejects suspended users.
- Access tokens are signed with `JWT_SECRET`.
- Refresh tokens are signed with `REFRESH_SECRET`, hashed, and stored in `Session`.
- Logout blacklists access-token JTIs in Redis when available and revokes refresh sessions.
- Forgot/reset password tables and email flows are present.
- Email verification token table and email creation exist during registration.
- Missing: verify-email endpoint, change-password endpoint, frontend auth forms beyond login, and role-specific frontend route guards.

## 6. Existing Upload System

- Backend storage route exists at `POST /api/storage/upload-url`.
- Supports images and PDFs.
- Uses S3 if AWS credentials are configured.
- Falls back to Cloudinary if `CLOUDINARY_URL` is configured.
- Missing: frontend upload components, upload completion persistence, video support, CV/portfolio-specific validation, and profile/company/project integration.

## 7. Existing Missing Features

- Unified target roles `USER`, `CREATOR`, `COMPANY`, `ADMIN`.
- Company approval/suspension workflow.
- Job approval/removal workflow.
- Job applications and application status tracking.
- Company dashboards.
- Admin frontend pages.
- Creator project upload/edit pages.
- Follow system.
- Messaging system.
- Bookmark endpoints beyond project bookmark model.
- Notification triggers for all required events.
- Real dashboard analytics endpoint.
- Site settings, SEO settings, homepage settings, categories admin.
- Sitemap and robots routes.
- Frontend forms for project upload, company registration, job posting, job application, password reset, and email verification.

## 8. Existing Broken Or Risky Features

- Dashboard stats are hard-coded.
- Dashboard greeting is hard-coded to "Aashna".
- Dashboard sidebar uses `<button>` elements and does not navigate.
- Navbar `Projects` link points to a single sample project instead of a project index.
- Navbar search and mobile menu buttons are not connected.
- Frontend services silently fall back to mock data on API errors or empty result sets, hiding backend failures.
- Project detail route is named `/projects/[id]` but backend fetches by slug.
- Existing role enum is profession-oriented and does not match the requested platform roles.
- Admin backend allows `moderator` and `editor`, which are outside the requested final role set.
- Upload service allows images and PDFs only, but requirements include videos.

## 9. Existing Placeholder Data

- `src/data/mock.ts` contains mock navigation, projects, professionals, firms, articles, events, jobs, and categories.
- Dashboard uses fake stats, fake recent activity, and fake chart bars.
- Frontend project/firm/job services return mock data when API results are empty or requests fail.
- Home, explore, project details, firms, jobs, students, articles, and events pages are primarily mock-backed unless the API returns items.

## 10. Existing Sidebar Links That Do Not Work

Current dashboard sidebar labels are rendered as buttons with no navigation target:

- Overview
- Projects
- Bookmarks
- Followers
- Notifications
- Settings

Expected pages for several of these routes are missing.

## Implementation Starting Point

Phase 1 should first remove the most visible broken dashboard behavior:

- Add real dashboard API metrics.
- Replace dashboard hard-coded stats and greeting with authenticated database-backed data.
- Convert sidebar buttons to links and create missing dashboard route pages.
- Stop hiding key dashboard API failures behind mock data.

