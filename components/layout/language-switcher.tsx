'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const languages = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];
  
  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale prefix from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    
    // Navigate to new locale
    if (newLocale === routing.defaultLocale) {
      router.push(`/${pathWithoutLocale}`);
    } else {
      router.push(`/${newLocale}/${pathWithoutLocale}`);
    }
  };
  
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
        <span>{languages.find(lang => lang.code === locale)?.flag}</span>
        <span>{languages.find(lang => lang.code === locale)?.label}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-md shadow-lg border border-gray-200 py-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 ${
              locale === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
