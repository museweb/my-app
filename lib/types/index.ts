/**
 * Supported locales
 */
export type Locale = 'ko' | 'en' | 'zh';

/**
 * Navigation item structure
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Product interface
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  price?: number;
  features?: string[];
}

/**
 * Team member interface
 */
export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
}

/**
 * Blog post interface
 */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  tags?: string[];
}

/**
 * SEO metadata interface
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
}
