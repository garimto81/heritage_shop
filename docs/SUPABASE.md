# Supabase Integration

## Environment Variables

```bash
# .env.local

# Supabase URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# 신규 키 시스템 (2025+)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...

# 또는 레거시 키 시스템
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# 선택
NEXT_PUBLIC_APP_URL=http://localhost:3000
RESEND_API_KEY=re_...
```

## Clients

> **Note**: Next.js 16에서 middleware가 proxy로 변경되었습니다.
> - `src/lib/supabase/middleware.ts` 삭제됨
> - 세션 검증은 `src/proxy.ts`에서 직접 처리

### Browser Client (`src/lib/supabase/client.ts`)

```typescript
import { createBrowserClient } from '@supabase/ssr'

// 듀얼 키 시스템 지원
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Server Client (`src/lib/supabase/server.ts`)

Server Components, Server Actions에서 사용. `cookies()` API로 세션 관리.

### Admin Client (`src/lib/supabase/admin.ts`)

서버 전용. 브라우저에서 호출 시 에러 발생.

```typescript
if (typeof window !== 'undefined') {
  throw new Error('Admin client is server-only')
}
```

## Local Development

```powershell
cd D:\AI\claude01\ggp_heritage_mall

# 로컬 Supabase 시작
supabase start

# 로컬 Supabase 중지
supabase stop

# 마이그레이션 목록
supabase migration list
```

### 로컬 포트

| 서비스 | 포트 |
|--------|------|
| API | 54321 |
| Database | 54322 |
| Studio | 54323 |
| Inbucket (이메일 테스트) | 54324 |
