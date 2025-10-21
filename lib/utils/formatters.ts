import { format } from 'date-fns';
import { ko, enUS, zhCN } from 'date-fns/locale';

const locales = {
  ko,
  en: enUS,
  zh: zhCN,
};

/**
 * Format date based on locale
 * @param date - Date to format
 * @param locale - Locale code (ko, en, zh)
 * @param formatStr - Format string (default: 'PPP')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: 'ko' | 'en' | 'zh' = 'ko',
  formatStr: string = 'PPP'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: locales[locale] });
}

/**
 * Format currency based on locale
 * @param amount - Amount to format
 * @param locale - Locale code (ko, en, zh)
 * @param currency - Currency code (default: KRW for ko, USD for en, CNY for zh)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  locale: 'ko' | 'en' | 'zh' = 'ko',
  currency?: string
): string {
  const currencyMap: Record<string, string> = {
    ko: currency || 'KRW',
    en: currency || 'USD',
    zh: currency || 'CNY',
  };

  return new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : locale === 'en' ? 'en-US' : 'zh-CN', {
    style: 'currency',
    currency: currencyMap[locale],
  }).format(amount);
}

/**
 * Format number with locale-specific separators
 * @param number - Number to format
 * @param locale - Locale code (ko, en, zh)
 * @returns Formatted number string
 */
export function formatNumber(
  number: number,
  locale: 'ko' | 'en' | 'zh' = 'ko'
): string {
  return new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : locale === 'en' ? 'en-US' : 'zh-CN').format(number);
}
