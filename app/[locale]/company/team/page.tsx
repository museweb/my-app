import { getTranslations } from 'next-intl/server';

export default async function TeamPage() {
  const t = await getTranslations('company.team');
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">{t('members.ceo.name')}</h3>
            <p className="text-gray-600 mb-4">{t('members.ceo.position')}</p>
            <p className="text-lg">{t('members.ceo.bio')}</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">{t('members.cto.name')}</h3>
            <p className="text-gray-600 mb-4">{t('members.cto.position')}</p>
            <p className="text-lg">{t('members.cto.bio')}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
