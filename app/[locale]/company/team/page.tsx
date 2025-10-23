import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

export default async function TeamPage() {
  const t = await getTranslations('company.team');

  const members = ['ceo', 'cto', 'cmo', 'coo'] as const;

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

          {/* Team Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <Card key={member} className="overflow-hidden">
                {/* Avatar Placeholder */}
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                  <User className="h-24 w-24 text-white opacity-50" />
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {t(`members.${member}.name`)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {t(`members.${member}.position`)}
                  </p>
                  <p className="mt-4 text-sm text-gray-600">
                    {t(`members.${member}.bio`)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
