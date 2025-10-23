import { getTranslations } from 'next-intl/server';

export default async function TermsPage() {
  const t = await getTranslations('legal.terms');

  const sections = ['intro', 'services', 'accounts', 'prohibited', 'intellectual', 'disclaimer', 'limitation', 'termination'] as const;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {t('title')}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {t('lastUpdated')}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 bg-white p-8 shadow-md rounded-lg">
            {sections.map((section) => (
              <section key={section}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t(`sections.${section}.title`)}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`sections.${section}.content`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
