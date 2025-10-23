import type { Product, ProductCategory } from '@/lib/types/product';

export const productCategories: ProductCategory[] = [
  {
    id: '1',
    slug: 'cloud-solutions',
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and services',
  },
  {
    id: '2',
    slug: 'ai-analytics',
    name: 'AI & Analytics',
    description: 'Intelligent data analysis and machine learning solutions',
  },
  {
    id: '3',
    slug: 'security',
    name: 'Security',
    description: 'Enterprise-grade security and compliance solutions',
  },
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'cloud-platform',
    name: 'Cloud Platform',
    description: 'Comprehensive cloud infrastructure platform with automated scaling and management',
    category: 'cloud-solutions',
    features: [
      'Auto-scaling infrastructure',
      'Global CDN',
      'Real-time monitoring',
      '99.99% uptime SLA',
    ],
  },
  {
    id: '2',
    slug: 'data-analytics',
    name: 'Data Analytics Suite',
    description: 'Advanced analytics platform for business intelligence and data visualization',
    category: 'ai-analytics',
    features: [
      'Real-time data processing',
      'AI-powered insights',
      'Custom dashboards',
      'Predictive analytics',
    ],
  },
  {
    id: '3',
    slug: 'ml-platform',
    name: 'ML Platform',
    description: 'End-to-end machine learning platform for model development and deployment',
    category: 'ai-analytics',
    features: [
      'AutoML capabilities',
      'Model versioning',
      'A/B testing',
      'Production deployment',
    ],
  },
  {
    id: '4',
    slug: 'security-shield',
    name: 'Security Shield',
    description: 'Comprehensive security solution protecting your infrastructure and data',
    category: 'security',
    features: [
      'DDoS protection',
      'Web application firewall',
      'Threat detection',
      '24/7 monitoring',
    ],
  },
  {
    id: '5',
    slug: 'compliance-manager',
    name: 'Compliance Manager',
    description: 'Automated compliance management and audit reporting',
    category: 'security',
    features: [
      'Automated audits',
      'Compliance reporting',
      'Policy management',
      'Multi-framework support',
    ],
  },
  {
    id: '6',
    slug: 'serverless-functions',
    name: 'Serverless Functions',
    description: 'Run code without managing servers with automatic scaling',
    category: 'cloud-solutions',
    features: [
      'Pay per execution',
      'Auto-scaling',
      'Multiple runtimes',
      'Built-in monitoring',
    ],
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}
