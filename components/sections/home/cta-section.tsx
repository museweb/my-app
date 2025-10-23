import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export async function CtaSection() {
  const t = await getTranslations('home.cta');

  return (
    <section className="bg-blue-600 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              variant="outline"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/support/contact">
                {t('button')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
