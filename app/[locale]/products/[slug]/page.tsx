import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { getProductBySlug, products } from '@/data/products';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations('products');

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToProducts')}
              </Link>
            </Button>
          </div>

          {/* Product Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t(`items.${product.slug}.name`)}
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              {t(`items.${product.slug}.description`)}
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {t('keyFeatures')}
              </h2>
              <ul className="space-y-4">
                {product.features.map((_, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {t(`items.${product.slug}.features.${index}`)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {t(`items.${product.slug}.featureDetails.${index}`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {t('benefits.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{t(`items.${product.slug}.benefits.0`)}</p>
                <p>{t(`items.${product.slug}.benefits.1`)}</p>
                <p>{t(`items.${product.slug}.benefits.2`)}</p>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/support/contact">
                  {t('contactSales')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
