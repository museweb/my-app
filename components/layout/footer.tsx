import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function Footer() {
  const t = await getTranslations('footer');
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">MuseWorks</h3>
            <p className="text-sm text-gray-600">{t('description')}</p>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              <li><Link href="/company/about" className="text-sm text-gray-600 hover:text-blue-600">{t('about')}</Link></li>
              <li><Link href="/company/history" className="text-sm text-gray-600 hover:text-blue-600">{t('history')}</Link></li>
              <li><Link href="/company/team" className="text-sm text-gray-600 hover:text-blue-600">{t('team')}</Link></li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('resources')}</h4>
            <ul className="space-y-2">
              <li><Link href="/resources/blog" className="text-sm text-gray-600 hover:text-blue-600">{t('blog')}</Link></li>
              <li><Link href="/resources/faq" className="text-sm text-gray-600 hover:text-blue-600">{t('faq')}</Link></li>
              <li><Link href="/support" className="text-sm text-gray-600 hover:text-blue-600">{t('support')}</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy" className="text-sm text-gray-600 hover:text-blue-600">{t('privacy')}</Link></li>
              <li><Link href="/legal/terms" className="text-sm text-gray-600 hover:text-blue-600">{t('terms')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {currentYear} MuseWorks. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
