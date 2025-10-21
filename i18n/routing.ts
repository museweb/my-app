import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 지원하는 모든 언어 목록
  locales: ['ko', 'en', 'zh'],

  // 기본 언어 (한국어)
  defaultLocale: 'ko',

  // 기본 언어(ko)는 경로에 prefix 없음, 다른 언어만 /en, /zh
  localePrefix: 'as-needed',

  // 도메인별 로케일 매핑 (도메인 구매 후 활성화)
  // domains: [
  //   {
  //     domain: 'lavarwave.co.kr',
  //     defaultLocale: 'ko',
  //     locales: ['ko']
  //   },
  //   {
  //     domain: 'lavarwave.com',
  //     defaultLocale: 'en',
  //     locales: ['en']
  //   },
  //   {
  //     domain: 'lavarwave.cn',
  //     defaultLocale: 'zh',
  //     locales: ['zh']
  //   }
  // ]
});
