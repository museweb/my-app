import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/contact-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default async function ContactPage() {
  const t = await getTranslations('contact');

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

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {t('form.title')}
                </h2>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {t('info.title')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t('info.address.title')}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                        {t('info.address.content')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t('info.phone.title')}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {t('info.phone.content')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t('info.email.title')}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {t('info.email.content')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t('info.hours.title')}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                        {t('info.hours.content')}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
