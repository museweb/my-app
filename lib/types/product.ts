export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  image?: string;
  price?: {
    amount: number;
    currency: string;
  };
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
}
