import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function Navigation() {
  const t = await getTranslations('navigation');
  
  const navItems = [
    {
      label: t('company'),
      href: '/company/about',
      children: [
        { label: t('about'), href: '/company/about' },
        { label: t('history'), href: '/company/history' },
        { label: t('team'), href: '/company/team' },
        { label: t('locations'), href: '/company/locations' },
      ]
    },
    { label: t('products'), href: '/products' },
    { label: t('solutions'), href: '/solutions' },
    { label: t('resources'), href: '/resources' },
    { label: t('contact'), href: '/support/contact' },
  ];
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {item.label}
          </Link>
          
          {item.children && (
            <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-md shadow-lg border border-gray-200 py-2">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
