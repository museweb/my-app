import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

type Feature = {
  title?: { ko?: string; en?: string; zh?: string };
  description?: { ko?: string; en?: string; zh?: string };
  icon?: string;
  image?: any;
};

type Props = {
  data?: Feature[];
  locale: string;
};

export async function FeaturesSection({ data, locale }: Props) {
  const t = await getTranslations('home.features');

  // Fallback 기본 features (Sanity 데이터가 없을 때)
  const defaultFeatures = [
    { key: 'performance', icon: 'Zap' },
    { key: 'security', icon: 'Shield' },
    { key: 'global', icon: 'Globe' },
    { key: 'innovation', icon: 'Sparkles' },
  ];

  // Sanity 데이터가 있으면 사용, 없으면 기본값 사용
  const features = data && data.length > 0 ? data : null;

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features ? (
            // Sanity 데이터 사용
            features.map((feature, index) => {
              const iconName = feature.icon || 'Sparkles';
              const Icon = (LucideIcons as any)[iconName] || LucideIcons.Sparkles;

              return (
                <Card key={index} className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {feature.title?.[locale as keyof typeof feature.title] || ''}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {feature.description?.[locale as keyof typeof feature.description] || ''}
                  </p>
                </Card>
              );
            })
          ) : (
            // 기본값 사용
            defaultFeatures.map((feature) => {
              const Icon = (LucideIcons as any)[feature.icon];
              return (
                <Card key={feature.key} className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {t(`items.${feature.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {t(`items.${feature.key}.description`)}
                  </p>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
