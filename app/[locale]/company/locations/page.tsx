import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export default async function LocationsPage() {
  const t = await getTranslations('company.locations');

  const locations = ['seoul', 'newyork', 'shanghai'] as const;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card key={location} className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t(`offices.${location}.name`)}
                </h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="text-sm text-gray-600">
                      {t(`offices.${location}.address`)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="text-sm text-gray-600">
                      {t(`offices.${location}.phone`)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="text-sm text-gray-600">
                      {t(`offices.${location}.email`)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
