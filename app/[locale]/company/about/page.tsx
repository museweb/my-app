import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('company.about');
  
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('intro.title')}</h2>
            <p className="text-lg leading-relaxed">{t('intro.content')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('vision.title')}</h2>
            <p className="text-lg leading-relaxed">{t('vision.content')}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('mission.title')}</h2>
            <p className="text-lg leading-relaxed">{t('mission.content')}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
