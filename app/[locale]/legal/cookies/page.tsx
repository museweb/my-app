import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';

export default async function CookiesPage() {
  const t = await getTranslations('legal.cookies');

  const sections = ['intro', 'what', 'types', 'usage', 'control', 'updates'] as const;
  const cookieTypes = ['essential', 'performance', 'functional', 'targeting'] as const;

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
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section} className="bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t(`sections.${section}.title`)}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`sections.${section}.content`)}
                </p>
              </div>
            ))}

            {/* Cookie Types Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('cookieTypes.title')}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {cookieTypes.map((type) => (
                  <Card key={type} className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t(`cookieTypes.${type}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(`cookieTypes.${type}.description`)}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
