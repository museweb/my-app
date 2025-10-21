import { getTranslations } from 'next-intl/server';

export default async function HistoryPage() {
  const t = await getTranslations('company.history');
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h3 className="text-xl font-semibold mb-2">{t('milestones.2020.year')}</h3>
            <p className="text-lg">{t('milestones.2020.event')}</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h3 className="text-xl font-semibold mb-2">{t('milestones.2021.year')}</h3>
            <p className="text-lg">{t('milestones.2021.event')}</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <h3 className="text-xl font-semibold mb-2">{t('milestones.2022.year')}</h3>
            <p className="text-lg">{t('milestones.2022.event')}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
