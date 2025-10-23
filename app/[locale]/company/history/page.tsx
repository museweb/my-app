import { getTranslations } from 'next-intl/server';
import { Calendar } from 'lucide-react';

export default async function HistoryPage() {
  const t = await getTranslations('company.history');

  const milestones = [
    { year: '2020', key: '2020' },
    { year: '2021', key: '2021' },
    { year: '2022', key: '2022' },
    { year: '2023', key: '2023' },
    { year: '2024', key: '2024' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-blue-200"></div>

            {milestones.map((milestone, index) => (
              <div key={milestone.key} className="relative pl-20">
                {/* Year Badge */}
                <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                  <Calendar className="h-6 w-6" />
                </div>

                {/* Content Card */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {t(`milestones.${milestone.key}.year`)}
                  </h3>
                  <p className="mt-2 text-lg text-gray-700">
                    {t(`milestones.${milestone.key}.event`)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {t(`milestones.${milestone.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
