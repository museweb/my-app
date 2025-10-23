import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

type HeroData = {
  title?: { ko?: string; en?: string; zh?: string };
  subtitle?: { ko?: string; en?: string; zh?: string };
  ctaText?: { ko?: string; en?: string; zh?: string };
  ctaLink?: string;
  backgroundImage?: any;
};

type Props = {
  data?: HeroData;
  locale: string;
};

export async function HeroSection({ data, locale }: Props) {
  const t = await getTranslations('home.hero');

  // Sanity 데이터가 있으면 사용, 없으면 번역 파일 사용
  const title = data?.title?.[locale as keyof typeof data.title] || t('title');
  const subtitle = data?.subtitle?.[locale as keyof typeof data.subtitle] || t('subtitle');
  const ctaText = data?.ctaText?.[locale as keyof typeof data.ctaText] || t('cta.primary');

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href={data?.ctaLink || '/products'}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/company/about">
                {t('cta.secondary')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
