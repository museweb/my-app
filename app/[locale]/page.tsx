import { HeroSection } from '@/components/sections/home/hero-section';
import { FeaturesSection } from '@/components/sections/home/features-section';
import { CtaSection } from '@/components/sections/home/cta-section';
import { client, queries } from '@/lib/sanity';
import { getLocale } from 'next-intl/server';

export default async function Home() {
  const locale = await getLocale();

  // Sanity에서 홈페이지 데이터 가져오기
  const homeData = await client.fetch(queries.homePage);

  return (
    <div className="flex flex-col">
      <HeroSection data={homeData?.hero} locale={locale} />
      <FeaturesSection data={homeData?.features} locale={locale} />
      <CtaSection locale={locale} />
    </div>
  );
}
