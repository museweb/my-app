import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';
import { Target, Eye, Award } from 'lucide-react';

export default async function AboutPage() {
  const t = await getTranslations('company.about');

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              {t('intro.content')}
            </p>
          </div>

          {/* Vision, Mission, Values Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">
                {t('vision.title')}
              </h2>
              <p className="mt-4 text-gray-600">
                {t('vision.content')}
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">
                {t('mission.title')}
              </h2>
              <p className="mt-4 text-gray-600">
                {t('mission.content')}
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">
                {t('values.title')}
              </h2>
              <p className="mt-4 text-gray-600">
                {t('values.content')}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
