import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Static export는 server-side features (getTranslations, headers 등)와 호환되지 않음
  // 필요시 나중에 설정
  // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
};

export default withNextIntl(nextConfig);
