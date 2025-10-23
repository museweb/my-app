import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { products, productCategories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export default async function ProductsPage() {
  const t = await getTranslations('products');

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

          {/* Products by Category */}
          <div className="space-y-16">
            {productCategories.map((category) => {
              const categoryProducts = products.filter(
                (p) => p.category === category.slug
              );

              return (
                <div key={category.id}>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {t(`categories.${category.slug}.name`)}
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                      {t(`categories.${category.slug}.description`)}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryProducts.map((product) => (
                      <Card key={product.id} className="flex flex-col p-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {t(`items.${product.slug}.name`)}
                        </h3>
                        <p className="mt-3 flex-1 text-sm text-gray-600">
                          {t(`items.${product.slug}.description`)}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {product.features.map((_, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="text-blue-600">✓</span>
                              {t(`items.${product.slug}.features.${index}`)}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6">
                          <Button asChild variant="outline" className="w-full">
                            <Link href={`/products/${product.slug}`}>
                              {t('learnMore')}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
