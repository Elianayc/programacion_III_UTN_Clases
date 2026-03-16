# Copilot Instructions (UTNito)

This repo supports an educational full-stack chat system built incrementally (course checkpoints) and a complete reference app.

## High-level architecture (what to edit)
- **Frontend**: `utn-utnito/full_project/frontend/chat-app`
  - Angular (v19), single-page chat UI.
  - Uses `src/environments/environment.ts` for the backend base URL (`coreServiceUrl`).
  - Auth is JWT-based; the app stores access/refresh tokens and attaches them via `core/auth/auth.interceptor.ts`.
- **Backend**: `utn-utnito/full_project/backend/chat-core-service`
  - NestJS (v10) with modular structure (`src/auth`, `src/chat-app`, `src/conversation`, `src/message`, `src/ai`).
  - Uses TypeORM + SQLite (auto-generated DB file under `backend/chat-core-service/database`).
  - API responses are wrapped in `basic/response-object.ts` and controllers extend `basic/abstract.controller.ts`.
- **AI integration**:
  - Default local mode uses a mock provider (`src/ai/mock-ai.provider.ts`).
  - Production-like mode uses n8n + OpenAI (via `src/ai/chatgpt-ai.provider.ts` and `backend/n8n/workflows/utnito_chatgpt_message_response.json`).

## Key developer workflows
### Local frontend dev (Angular)
```bash
cd utn-utnito/full_project/frontend/chat-app
npm install
npm run start
```
Default URL: `http://localhost:5300`

### Local backend dev (NestJS)
```bash
cd utn-utnito/full_project/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```
Default URL: `http://localhost:5001`
Swagger: `http://localhost:5001/utn-chat-back/api`

### Docker (recommended for AI/n8n)
From `utn-utnito/full_project/chat-docker`:
- Start only n8n (fast):
  ```bash
  cp .env.example .env
  docker compose up -d chat-n8n
  ```
- Start full stack (frontend + backend + n8n):
  ```bash
  docker compose --profile full up -d
  ```

There are helper scripts under `utn-utnito/full_project/scripts` (e.g., `start.sh`, `start-full.sh`, `start-n8n.sh`).

## Important patterns / conventions
- **Environment switching**:
  - The backend reads `.env` by default, but uses `.env.docker` when `NODE_ENV=docker`.
  - Use `.env.example` as the template; `.env` is not committed.
- **AI provider switching**:
  - `AI_PROVIDER=mock` (default) uses `MockAiProvider`.
  - `AI_PROVIDER=chatgpt` uses `ChatGptAiProvider`, which calls n8n via `AI_N8N_WEBHOOK_URL`.
  - Fallback behavior is driven by `AI_ON_ERROR_FALLBACK`.
- **Startup / health**:
  - Backend exposes `/health` for container healthchecks (configured in `chat-docker/docker-compose.yml`).
  - Swagger is enabled under `SWAGGER_BASE_PATH` (`/utn-chat-back/api` by default).
- **Routes / API structure**:
  - Auth: `/auth/login`, `/auth/refresh-token`, `/auth/me`.
  - Chat app: `/chat-app/conversations`, `/chat-app/conversations/:id/messages`, etc.
  - Controllers are guarded with `JwtAuthGuard` and expect a Bearer token.

## Where to look for common tasks
- **Add new backend feature**: create a new module under `src/` and register it in `app.module.ts`.
- **Update conversation/message behavior**: `src/chat-app/chat-app.service.ts` and `src/conversation`, `src/message` feature modules.
- **Adjust authentication/user list**: `AUTH_USERS_JSON` in `.env.example` and `src/auth/auth-users.service.ts`.
- **Modify AI prompt behavior**: `src/ai/prompt/chatgpt-message.prompt.ts` and the n8n workflow JSON at `backend/n8n/workflows/utnito_chatgpt_message_response.json`.

## Notes for AI assistance
- Prefer working in the `full_project` folder unless the task explicitly targets the course checkpoints under `utn-utnito/course`.
- The repo is educational: keep changes consistent with the incremental class-based structure (e.g., don't make large architectural refactors unless asked).
- Avoid changing `.env` / `.env.docker` values without explicit instruction (these control running behaviors in different modes).

---

If any section is unclear or you want more detail on a specific part of the stack (e.g., how AI prompts are built, or how the Angular auth flow works), let me know and I can expand it.