import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 다음 경로를 제외한 모든 경로에서 미들웨어 실행:
  // - /api 로 시작하는 경로 (API 라우트)
  // - /_next 로 시작하는 경로 (Next.js 내부 파일)
  // - /_vercel 로 시작하는 경로 (Vercel 내부 파일)
  // - /studio 로 시작하는 경로 (Sanity Studio)
  // - 점(.)을 포함하는 경로 (정적 파일: favicon.ico, images 등)
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)']
};
