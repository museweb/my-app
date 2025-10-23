import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navigation } from './navigation';
import { LanguageSwitcher } from './language-switcher';

export async function Header() {
  const t = await getTranslations('common');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MuseWorks</span>
          </Link>
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
