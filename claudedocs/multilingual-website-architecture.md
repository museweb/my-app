# Multilingual Website Architecture Design
## Next.js 15 Corporate Website with Korean, English, Chinese Support

---

## 1. ARCHITECTURE OVERVIEW

### 1.1 Technology Stack
- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **i18n**: next-intl 4.3.12
- **Runtime**: React 19.1.0
- **Supported Languages**: Korean (default), English, Chinese
- **Locale Strategy**: `as-needed` prefix (ko: no prefix, en: /en, zh: /zh)

### 1.2 Core Architectural Principles
```
Principles Priority:
1. SEO-First → All pages SSG/ISR, semantic HTML, metadata optimization
2. Accessibility → WCAG 2.1 AA compliance, keyboard navigation, ARIA
3. Performance → Core Web Vitals optimization, image optimization, code splitting
4. Maintainability → Component reusability, clear separation of concerns
5. Scalability → Easy to add languages, pages, features
```

---

## 2. COMPLETE FOLDER STRUCTURE

```
my-app/
├── app/
│   ├── [locale]/                      # Language-based routing
│   │   ├── layout.tsx                 # Root layout with i18n provider
│   │   ├── page.tsx                   # Home page
│   │   ├── not-found.tsx              # 404 page (locale-aware)
│   │   ├── error.tsx                  # Error boundary
│   │   ├── loading.tsx                # Loading state
│   │   │
│   │   ├── (marketing)/               # Route group - marketing pages
│   │   │   ├── layout.tsx             # Marketing layout (with header/footer)
│   │   │   └── home/
│   │   │       └── page.tsx           # Alternative home if needed
│   │   │
│   │   ├── company/                   # Company information section
│   │   │   ├── about/
│   │   │   │   ├── page.tsx           # About us page
│   │   │   │   └── opengraph-image.tsx # OG image for about
│   │   │   ├── history/
│   │   │   │   └── page.tsx           # Company history
│   │   │   ├── team/
│   │   │   │   ├── page.tsx           # Team overview
│   │   │   │   └── [memberId]/        # Individual team member
│   │   │   │       └── page.tsx
│   │   │   ├── locations/
│   │   │   │   └── page.tsx           # Office locations
│   │   │   ├── careers/
│   │   │   │   ├── page.tsx           # Careers overview
│   │   │   │   └── [jobId]/           # Job posting detail
│   │   │   │       └── page.tsx
│   │   │   └── press/
│   │   │       ├── page.tsx           # Press releases list
│   │   │       └── [pressId]/
│   │   │           └── page.tsx       # Press release detail
│   │   │
│   │   ├── products/                  # Products/Services section
│   │   │   ├── page.tsx               # Products overview/catalog
│   │   │   ├── [productId]/
│   │   │   │   ├── page.tsx           # Product detail
│   │   │   │   └── opengraph-image.tsx
│   │   │   └── [category]/
│   │   │       └── page.tsx           # Category page
│   │   │
│   │   ├── solutions/                 # Solutions/Use cases
│   │   │   ├── page.tsx               # Solutions overview
│   │   │   └── [solutionId]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── resources/                 # Resources section
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx           # Blog list
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       # Blog post
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── guides/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── faq/
│   │   │       └── page.tsx           # FAQ page
│   │   │
│   │   ├── support/                   # Customer support
│   │   │   ├── page.tsx               # Support overview
│   │   │   ├── contact/
│   │   │   │   └── page.tsx           # Contact form
│   │   │   ├── documentation/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [docId]/
│   │   │   │       └── page.tsx
│   │   │   └── downloads/
│   │   │       └── page.tsx           # Download center
│   │   │
│   │   └── legal/                     # Legal pages
│   │       ├── privacy/
│   │       │   └── page.tsx           # Privacy policy
│   │       ├── terms/
│   │       │   └── page.tsx           # Terms of service
│   │       └── cookies/
│   │           └── page.tsx           # Cookie policy
│   │
│   ├── api/                           # API routes
│   │   ├── contact/
│   │   │   └── route.ts               # Contact form submission
│   │   ├── newsletter/
│   │   │   └── route.ts               # Newsletter signup
│   │   └── search/
│   │       └── route.ts               # Site search
│   │
│   ├── favicon.ico
│   ├── apple-icon.png                 # Apple touch icon
│   ├── opengraph-image.png            # Default OG image
│   ├── robots.ts                      # Dynamic robots.txt
│   ├── sitemap.ts                     # Dynamic sitemap
│   └── globals.css
│
├── components/                        # React components
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   ├── FooterLinks.tsx
│   │   │   └── SocialLinks.tsx
│   │   ├── Breadcrumbs/
│   │   │   └── Breadcrumbs.tsx
│   │   └── PageWrapper/
│   │       └── PageWrapper.tsx        # Common page container
│   │
│   ├── ui/                            # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.types.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── variants/
│   │   │       ├── ProductCard.tsx
│   │   │       ├── TeamCard.tsx
│   │   │       └── BlogCard.tsx
│   │   ├── Form/
│   │   │   ├── Input.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   └── FormField.tsx
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── ModalProvider.tsx
│   │   ├── Accordion/
│   │   │   └── Accordion.tsx
│   │   ├── Tabs/
│   │   │   └── Tabs.tsx
│   │   └── Badge/
│   │       └── Badge.tsx
│   │
│   ├── sections/                      # Page-specific sections
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Stats.tsx
│   │   ├── products/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilter.tsx
│   │   │   └── ProductDetail.tsx
│   │   └── company/
│   │       ├── Timeline.tsx
│   │       ├── TeamGrid.tsx
│   │       └── ValueProps.tsx
│   │
│   ├── shared/                        # Shared components
│   │   ├── SEO/
│   │   │   └── LocalizedSEO.tsx       # SEO component with i18n
│   │   ├── Image/
│   │   │   └── OptimizedImage.tsx     # Wrapper for next/image
│   │   ├── Link/
│   │   │   └── LocalizedLink.tsx      # Locale-aware Link
│   │   ├── Newsletter/
│   │   │   └── NewsletterSignup.tsx
│   │   └── Search/
│   │       └── SiteSearch.tsx
│   │
│   └── forms/                         # Form components
│       ├── ContactForm/
│       │   ├── ContactForm.tsx
│       │   └── validations.ts
│       ├── NewsletterForm/
│       │   └── NewsletterForm.tsx
│       └── CareerApplicationForm/
│           └── CareerApplicationForm.tsx
│
├── lib/                               # Utility functions & configs
│   ├── i18n/
│   │   ├── get-dictionary.ts          # Server-side translation helper
│   │   └── locales.ts                 # Locale constants
│   ├── api/
│   │   ├── client.ts                  # API client setup
│   │   └── endpoints.ts               # API endpoints
│   ├── utils/
│   │   ├── cn.ts                      # Tailwind class merger
│   │   ├── formatters.ts              # Date, number formatters
│   │   └── validators.ts              # Validation helpers
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── useLocalStorage.ts
│   └── constants/
│       ├── navigation.ts              # Navigation structure
│       └── seo.ts                     # SEO constants
│
├── i18n/
│   ├── request.ts                     # next-intl config
│   └── routing.ts                     # Routing config
│
├── messages/                          # Translation files
│   ├── ko.json
│   ├── en.json
│   ├── zh.json
│   └── shared/                        # Shared translations
│       ├── navigation.json
│       ├── footer.json
│       └── forms.json
│
├── public/                            # Static assets
│   ├── images/
│   │   ├── logo/
│   │   │   ├── logo.svg
│   │   │   └── logo-dark.svg
│   │   ├── products/
│   │   ├── team/
│   │   └── blog/
│   ├── icons/
│   │   └── ... (favicons, etc.)
│   └── documents/                     # Downloadable files
│       └── ... (PDFs, etc.)
│
├── types/                             # TypeScript types
│   ├── index.ts
│   ├── navigation.ts
│   ├── product.ts
│   ├── team.ts
│   └── api.ts
│
├── data/                              # Static data (alternative to CMS)
│   ├── products/
│   │   ├── index.ts
│   │   └── products.json
│   ├── team/
│   │   └── members.json
│   └── blog/
│       └── posts.json
│
├── styles/                            # Additional styles
│   └── prose.css                      # Typography for blog/docs
│
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local                         # Environment variables
```

---

## 3. COMPLETE SITEMAP & ROUTING TABLE

### 3.1 Full Sitemap Structure

```
Website Structure (All pages × 3 languages):

/                                      # Home (Korean)
/en                                    # Home (English)
/zh                                    # Home (Chinese)

Company (회사소개)
├── /company/about                     # About us
├── /company/history                   # History & milestones
├── /company/team                      # Team overview
├── /company/team/[memberId]           # Team member detail
├── /company/locations                 # Office locations
├── /company/careers                   # Careers
├── /company/careers/[jobId]           # Job posting
└── /company/press                     # Press releases
    └── /company/press/[pressId]       # Press detail

Products/Services (제품/서비스)
├── /products                          # Product catalog
├── /products/[category]               # Category page
└── /products/[productId]              # Product detail

Solutions (솔루션)
├── /solutions                         # Solutions overview
└── /solutions/[solutionId]            # Solution detail

Resources (리소스)
├── /resources/blog                    # Blog
│   └── /resources/blog/[slug]
├── /resources/case-studies            # Case studies
│   └── /resources/case-studies/[slug]
├── /resources/guides                  # Guides
│   └── /resources/guides/[slug]
└── /resources/faq                     # FAQ

Support (지원)
├── /support                           # Support overview
├── /support/contact                   # Contact form
├── /support/documentation             # Documentation
│   └── /support/documentation/[docId]
└── /support/downloads                 # Downloads

Legal (법적고지)
├── /legal/privacy                     # Privacy policy
├── /legal/terms                       # Terms of service
└── /legal/cookies                     # Cookie policy
```

### 3.2 Routing Configuration
```typescript
// Routing pattern for all pages
URL Pattern: /{locale?}/{section}/{page}/{id?}

Examples:
- /                          → Korean home (no prefix)
- /en                        → English home
- /zh                        → Chinese home
- /company/about             → Korean about page
- /en/company/about          → English about page
- /products/laptop-pro       → Korean product detail
- /zh/products/laptop-pro    → Chinese product detail

// SEO-friendly URL structure
- Locale prefix only when needed (as-needed)
- Descriptive slugs in English (universal)
- Clean URLs without file extensions
- Consistent naming across languages
```

### 3.3 Route Generation Strategy

```typescript
// Static routes (generated at build time)
generateStaticParams() for:
- All locale combinations
- All company pages
- Main navigation pages
- Legal pages

// Dynamic routes (ISR - Incremental Static Regeneration)
- Product detail pages (revalidate: 3600)
- Blog posts (revalidate: 1800)
- Team member pages (revalidate: 86400)

// Server-side rendered routes
- Contact form (interactive)
- Search results
- Career applications
```

---

## 4. COMPONENT ARCHITECTURE

### 4.1 Component Hierarchy

```
Component Structure (Atomic Design Pattern):

Level 1: Atoms (Basic UI elements)
├── Button
├── Input
├── Badge
├── Icon
└── Typography

Level 2: Molecules (Simple combinations)
├── FormField (Label + Input + Error)
├── Card (Container + Title + Content)
├── NavigationItem (Link + Icon + Label)
└── SearchBar (Input + Button + Icon)

Level 3: Organisms (Complex components)
├── Header (Logo + Navigation + LanguageSwitcher + MobileMenu)
├── Footer (Links + Social + Newsletter + Legal)
├── ProductCard (Image + Title + Price + CTA)
├── ContactForm (Multiple FormFields + Validation + Submit)
└── TeamGrid (Multiple TeamCards + Filter)

Level 4: Templates (Page layouts)
├── MarketingLayout (Header + Content + Footer)
├── ProductLayout (Breadcrumbs + Sidebar + Content)
├── BlogLayout (Article + Sidebar + Comments)
└── LegalLayout (Simple header + Content + Footer)

Level 5: Pages (Complete views)
├── HomePage
├── ProductDetailPage
├── AboutPage
└── ContactPage
```

### 4.2 Core Component Specifications

#### 4.2.1 Header Component
```typescript
// components/layout/Header/Header.tsx
interface HeaderProps {
  locale: string;
  transparent?: boolean;
  sticky?: boolean;
}

Features:
- Responsive navigation (desktop/mobile)
- Language switcher with current locale
- Search functionality
- Sticky behavior on scroll
- Dark mode toggle (optional)
- Accessibility: keyboard navigation, ARIA labels

Structure:
<Header>
  ├── Logo (LocalizedLink to home)
  ├── Navigation (desktop)
  │   ├── NavigationItem × N
  │   └── LanguageSwitcher
  ├── MobileMenuToggle
  └── MobileMenu (overlay)
```

#### 4.2.2 Navigation Component
```typescript
// lib/constants/navigation.ts
interface NavigationItem {
  id: string;
  labelKey: string;          // Translation key
  href: string;
  children?: NavigationItem[];
  icon?: string;
  requiresAuth?: boolean;
}

const navigation: NavigationItem[] = [
  {
    id: 'company',
    labelKey: 'nav.company',
    href: '/company/about',
    children: [
      { id: 'about', labelKey: 'nav.about', href: '/company/about' },
      { id: 'history', labelKey: 'nav.history', href: '/company/history' },
      { id: 'team', labelKey: 'nav.team', href: '/company/team' },
      { id: 'careers', labelKey: 'nav.careers', href: '/company/careers' },
    ]
  },
  {
    id: 'products',
    labelKey: 'nav.products',
    href: '/products',
    children: [
      { id: 'all', labelKey: 'nav.allProducts', href: '/products' },
      { id: 'software', labelKey: 'nav.software', href: '/products/software' },
      { id: 'hardware', labelKey: 'nav.hardware', href: '/products/hardware' },
    ]
  },
  {
    id: 'solutions',
    labelKey: 'nav.solutions',
    href: '/solutions'
  },
  {
    id: 'resources',
    labelKey: 'nav.resources',
    href: '/resources/blog',
    children: [
      { id: 'blog', labelKey: 'nav.blog', href: '/resources/blog' },
      { id: 'cases', labelKey: 'nav.caseStudies', href: '/resources/case-studies' },
      { id: 'guides', labelKey: 'nav.guides', href: '/resources/guides' },
      { id: 'faq', labelKey: 'nav.faq', href: '/resources/faq' },
    ]
  },
  {
    id: 'support',
    labelKey: 'nav.support',
    href: '/support',
    children: [
      { id: 'contact', labelKey: 'nav.contact', href: '/support/contact' },
      { id: 'docs', labelKey: 'nav.documentation', href: '/support/documentation' },
    ]
  }
];
```

#### 4.2.3 Language Switcher Component
```typescript
// components/layout/Header/LanguageSwitcher.tsx
interface LanguageSwitcherProps {
  currentLocale: string;
  variant?: 'dropdown' | 'inline';
}

Features:
- Display current language with flag/icon
- Dropdown menu with all available languages
- Preserve current path when switching
- Loading state during transition
- Accessible with keyboard navigation

Languages:
- 한국어 (Korean) - ko
- English - en
- 中文 (Chinese) - zh

Implementation:
- Use next-intl's useRouter for navigation
- Maintain current page path
- Update HTML lang attribute
- Store preference in localStorage (optional)
```

#### 4.2.4 Footer Component
```typescript
// components/layout/Footer/Footer.tsx
interface FooterProps {
  locale: string;
  minimal?: boolean;
}

Structure:
<Footer>
  ├── FooterTop
  │   ├── CompanyInfo (logo, description)
  │   ├── FooterLinks (multiple columns)
  │   │   ├── Company links
  │   │   ├── Product links
  │   │   ├── Resource links
  │   │   └── Support links
  │   └── Newsletter signup
  ├── FooterMiddle
  │   └── SocialLinks (LinkedIn, Twitter, etc.)
  └── FooterBottom
      ├── Copyright
      ├── Legal links (Privacy, Terms, Cookies)
      └── Language selector (optional)
```

#### 4.2.5 Breadcrumbs Component
```typescript
// components/layout/Breadcrumbs/Breadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

Features:
- Auto-generate from current path
- Localized labels
- Structured data (JSON-LD for SEO)
- Accessible navigation
- Custom override support

Example output:
Home > Company > About Us
홈 > 회사소개 > 회사 소개
首页 > 公司 > 关于我们
```

---

## 5. DATA ARCHITECTURE & CONTENT MANAGEMENT

### 5.1 Content Storage Strategy

#### Option A: JSON-based Static Content (Recommended for MVP)
```typescript
// data/products/index.ts
export interface Product {
  id: string;
  slug: string;
  category: string;
  translations: {
    [locale: string]: {
      title: string;
      description: string;
      features: string[];
      specifications: Record<string, string>;
    };
  };
  price: {
    amount: number;
    currency: string;
  };
  images: string[];
  featured: boolean;
  publishedAt: string;
}

// Advantages:
✅ Simple, no external dependencies
✅ Version controlled with git
✅ Fast build times
✅ Type-safe with TypeScript
✅ Works offline

// Disadvantages:
❌ Requires deployment for content updates
❌ Non-technical users can't edit
❌ No draft/publish workflow
```

#### Option B: Headless CMS Integration (Recommended for Scale)
```typescript
// Recommended CMS Options:

1. Contentful (Best for enterprise)
   - Rich localization support
   - GraphQL API
   - Image optimization
   - Webhooks for rebuilds
   
2. Sanity.io (Best for flexibility)
   - Real-time collaboration
   - Portable Text (rich text)
   - Custom schemas
   - Free tier available
   
3. Strapi (Best for self-hosting)
   - Open source
   - Full control
   - Good i18n plugin
   - GraphQL support

Implementation approach:
- Use during build time (SSG)
- Implement ISR for automatic updates
- Cache strategy with revalidation
```

### 5.2 Translation File Organization

```
messages/
├── ko.json                    # Korean (main file)
├── en.json                    # English
├── zh.json                    # Chinese
└── structure.json             # Structure reference

Organization strategy:
{
  "metadata": { ... },         # Site metadata
  "nav": { ... },              # Navigation labels
  "footer": { ... },           # Footer content
  "common": { ... },           # Common UI text
  "forms": { ... },            # Form labels/errors
  "home": { ... },             # Home page specific
  "company": {
    "about": { ... },
    "history": { ... },
    "team": { ... }
  },
  "products": { ... },
  "errors": { ... },           # Error messages
  "validation": { ... }        # Validation messages
}

Best practices:
- Nested structure by section
- Consistent key naming
- Include context comments
- Use ICU MessageFormat for plurals/variables
- Keep common strings in shared section
```

### 5.3 Asset Management Strategy

```
public/
├── images/
│   ├── logo/
│   │   ├── logo.svg              # Main logo (SVG preferred)
│   │   ├── logo-dark.svg         # Dark mode version
│   │   └── logo-square.png       # Square version for social
│   ├── products/
│   │   ├── [product-slug]/
│   │   │   ├── hero.jpg          # Main product image (1200×800)
│   │   │   ├── gallery-1.jpg     # Gallery images
│   │   │   └── thumbnail.jpg     # Thumbnail (400×300)
│   ├── team/
│   │   └── [member-id].jpg       # Team photos (400×400 square)
│   ├── blog/
│   │   └── [post-slug]/
│   │       └── cover.jpg         # Blog cover images (1200×630)
│   └── og/
│       └── default.png           # Default Open Graph image
├── icons/
│   ├── favicon.ico
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── documents/
    ├── brochures/
    ├── whitepapers/
    └── downloads/

Image optimization strategy:
- Use next/image for all images
- WebP format with JPG fallback
- Responsive images with srcset
- Lazy loading by default
- CDN integration (Vercel, Cloudflare)
```

---

## 6. FEATURE-SPECIFIC DESIGNS

### 6.1 Contact Form System

```typescript
// components/forms/ContactForm/ContactForm.tsx
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  consent: boolean;
  locale: string;
}

Features:
✓ Client-side validation (Zod/Yup)
✓ Server-side validation
✓ reCAPTCHA v3 integration
✓ Email notification (Resend/SendGrid)
✓ Auto-response email
✓ Success/error states
✓ Loading states
✓ Accessibility (ARIA labels, error announcements)

Flow:
1. User fills form
2. Client validation
3. Submit to /api/contact
4. Server validation
5. Send email notification
6. Return success/error
7. Show confirmation message
8. Optional: Save to database/CRM

Error handling:
- Field-level validation errors
- Network error handling
- Rate limiting
- Spam protection
```

### 6.2 Newsletter Signup

```typescript
// components/shared/Newsletter/NewsletterSignup.tsx
interface NewsletterFormData {
  email: string;
  locale: string;
  source?: string;          // Where they signed up from
}

Features:
✓ Email validation
✓ Duplicate prevention
✓ Double opt-in (recommended)
✓ Integration with email service (Mailchimp, ConvertKit)
✓ GDPR compliance
✓ Success animation

Implementation:
- Inline form in footer
- Modal popup (optional)
- API route: /api/newsletter
- Store in email service provider
- Send confirmation email
```

### 6.3 Search Functionality

```typescript
// components/shared/Search/SiteSearch.tsx
interface SearchResult {
  type: 'page' | 'product' | 'blog' | 'doc';
  title: string;
  excerpt: string;
  url: string;
  locale: string;
}

Implementation options:

Option A: Client-side search (Simple)
- Build search index at build time
- Use libraries like Fuse.js
- Fast, no server needed
- Limited to public content

Option B: API-based search (Recommended)
- Algolia (best performance, paid)
- ElasticSearch (self-hosted)
- Database full-text search
- Better for large content

Features:
✓ Instant search (as-you-type)
✓ Keyboard navigation
✓ Search history
✓ Filters by type/category
✓ Localized results
✓ Highlights matching text
```

### 6.4 Product Catalog & Filtering

```typescript
// app/[locale]/products/page.tsx
interface ProductFilters {
  category?: string[];
  priceRange?: [number, number];
  features?: string[];
  sortBy?: 'name' | 'price' | 'date';
  sortOrder?: 'asc' | 'desc';
}

Features:
✓ Category filtering
✓ Price range slider
✓ Feature toggles
✓ Sort options
✓ Grid/List view toggle
✓ Pagination or infinite scroll
✓ URL-based filters (shareable)
✓ Loading skeletons

Layout:
<ProductsPage>
  ├── PageHeader (title, breadcrumbs)
  ├── FilterSidebar (desktop) / FilterModal (mobile)
  │   ├── CategoryFilter
  │   ├── PriceRangeFilter
  │   ├── FeatureFilter
  │   └── ClearFilters button
  ├── ProductGrid
  │   ├── SortControls
  │   ├── ViewToggle (grid/list)
  │   ├── ProductCard × N
  │   └── Pagination
  └── EmptyState (if no results)
```

---

## 7. SEO & PERFORMANCE OPTIMIZATION

### 7.1 SEO Strategy

```typescript
// Metadata configuration for each page
// app/[locale]/company/about/page.tsx

export async function generateMetadata({ 
  params 
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company.about' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    
    // Open Graph
    openGraph: {
      title: t('meta.og.title'),
      description: t('meta.og.description'),
      images: ['/images/og/about.jpg'],
      locale: locale,
      alternateLocale: ['ko', 'en', 'zh'].filter(l => l !== locale),
      type: 'website',
      siteName: t('meta.siteName'),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('meta.twitter.title'),
      description: t('meta.twitter.description'),
      images: ['/images/og/about.jpg'],
    },
    
    // Alternate languages
    alternates: {
      canonical: `/${locale}/company/about`,
      languages: {
        'ko': '/company/about',
        'en': '/en/company/about',
        'zh': '/zh/company/about',
      },
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

### 7.2 Structured Data (JSON-LD)

```typescript
// lib/utils/structured-data.ts

export function generateOrganizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    url: `https://yoursite.com/${locale === 'ko' ? '' : locale}`,
    logo: 'https://yoursite.com/images/logo/logo.png',
    description: getLocalizedDescription(locale),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-XXXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Korean', 'English', 'Chinese'],
    },
    sameAs: [
      'https://www.linkedin.com/company/yourcompany',
      'https://twitter.com/yourcompany',
    ],
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };
}

export function generateProductSchema(product: Product, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.translations[locale].title,
    description: product.translations[locale].description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: 'https://schema.org/InStock',
    },
  };
}
```

### 7.3 Performance Optimization Strategy

```typescript
// Performance targets (Core Web Vitals)
const performanceTargets = {
  LCP: '< 2.5s',        // Largest Contentful Paint
  FID: '< 100ms',       // First Input Delay
  CLS: '< 0.1',         // Cumulative Layout Shift
  TTFB: '< 600ms',      // Time to First Byte
  FCP: '< 1.8s',        // First Contentful Paint
};

// Optimization techniques:

1. Code Splitting
   - Automatic route-based splitting (Next.js default)
   - Dynamic imports for heavy components
   - Lazy load below-the-fold content

2. Image Optimization
   - Use next/image for all images
   - WebP with fallbacks
   - Responsive images
   - Priority loading for above-fold images
   - Blur placeholder

3. Font Optimization
   - Use next/font for Google Fonts
   - Subset fonts (latin, korean, chinese)
   - font-display: swap
   - Preload critical fonts

4. Caching Strategy
   - Static pages: Cache-Control: public, max-age=31536000, immutable
   - ISR pages: Revalidate intervals
   - API responses: Appropriate cache headers
   - CDN caching (Vercel Edge Network)

5. Bundle Optimization
   - Tree shaking unused code
   - Minimize dependencies
   - Use server components where possible
   - Analyze bundle with @next/bundle-analyzer

6. Database Optimization (if using)
   - Connection pooling
   - Query optimization
   - Caching layer (Redis)
   - Read replicas for scaling
```

### 7.4 Accessibility (WCAG 2.1 AA Compliance)

```typescript
// Accessibility requirements checklist

1. Semantic HTML
   ✓ Proper heading hierarchy (h1 → h2 → h3)
   ✓ Landmarks (header, nav, main, footer)
   ✓ Lists for navigation and content
   ✓ Tables for tabular data only

2. Keyboard Navigation
   ✓ All interactive elements focusable
   ✓ Logical tab order
   ✓ Skip to main content link
   ✓ Visible focus indicators
   ✓ No keyboard traps

3. ARIA Labels & Roles
   ✓ aria-label for icon buttons
   ✓ aria-expanded for dropdowns
   ✓ aria-current for current page
   ✓ role="navigation" for nav
   ✓ aria-live for dynamic content

4. Color & Contrast
   ✓ Minimum 4.5:1 contrast ratio for text
   ✓ Don't rely on color alone
   ✓ Focus indicators visible
   ✓ Error states clearly marked

5. Forms
   ✓ Associated labels for all inputs
   ✓ Error messages linked to fields
   ✓ Required fields indicated
   ✓ Autocomplete attributes
   ✓ Validation feedback

6. Images & Media
   ✓ Alt text for all images
   ✓ Empty alt for decorative images
   ✓ Captions for videos
   ✓ Transcripts for audio

7. Language
   ✓ lang attribute on html tag
   ✓ lang attribute for mixed-language content
   ✓ Clear, simple language
```

---

## 8. API DESIGN

### 8.1 API Route Structure

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
  locale: z.enum(['ko', 'en', 'zh']),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const data = contactSchema.parse(body);
    
    // Rate limiting (implement with Upstash or similar)
    // const rateLimit = await checkRateLimit(request);
    // if (!rateLimit.success) {
    //   return NextResponse.json(
    //     { error: 'Too many requests' },
    //     { status: 429 }
    //   );
    // }
    
    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'contact@yoursite.com',
      to: 'info@yourcompany.com',
      subject: `Contact Form: ${data.subject}`,
      html: generateEmailTemplate(data),
    });
    
    // Optionally save to database
    // await db.contacts.create({ data });
    
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 8.2 Server Actions (Alternative to API Routes)

```typescript
// app/actions/contact.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(
  prevState: any,
  formData: FormData
) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Send email or save to database
    await sendEmail(validatedFields.data);
    
    revalidatePath('/support/contact');
    
    return { success: true };
  } catch (error) {
    return { error: 'Failed to send message' };
  }
}

// Usage in component:
// const [state, formAction] = useFormState(submitContactForm, null);
// <form action={formAction}>...</form>
```

---

## 9. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2)
**Priority**: Critical
```
Tasks:
✓ Set up folder structure
✓ Configure i18n routing
✓ Create base layout components
  ├── Header with navigation
  ├── Footer
  ├── Language switcher
  └── Page wrapper

✓ Set up translation files structure
✓ Implement core UI components
  ├── Button
  ├── Input
  ├── Card
  └── Link (localized)

✓ Configure SEO basics
  ├── Metadata generation
  ├── Sitemap
  ├── Robots.txt
  └── Structured data utilities

Deliverables:
- Working multi-language navigation
- Base page templates
- Translation system operational
```

### Phase 2: Core Pages (Week 3-4)
**Priority**: High
```
Tasks:
✓ Home page
  ├── Hero section
  ├── Features section
  ├── CTA section
  └── Responsive design

✓ Company section
  ├── About page
  ├── History page (timeline)
  ├── Team page (grid)
  └── Locations page

✓ Contact page
  ├── Contact form
  ├── Form validation
  ├── Email integration
  └── Success/error handling

✓ Legal pages
  ├── Privacy policy
  ├── Terms of service
  └── Cookie policy

Deliverables:
- Complete company information section
- Working contact form
- Legal compliance pages
```

### Phase 3: Products/Services (Week 5-6)
**Priority**: High
```
Tasks:
✓ Product catalog structure
  ├── Data modeling
  ├── Product list page
  ├── Filtering system
  └── Sort functionality

✓ Product detail pages
  ├── Image gallery
  ├── Specifications
  ├── CTA buttons
  └── Related products

✓ Category pages
✓ SEO optimization for products

Deliverables:
- Complete product catalog
- Product detail pages
- Category browsing
```

### Phase 4: Content & Resources (Week 7-8)
**Priority**: Medium
```
Tasks:
✓ Blog system
  ├── Blog listing
  ├── Blog post template
  ├── Categories/tags
  └── Pagination

✓ Case studies
✓ Guides/Documentation
✓ FAQ page
  └── Accordion component

✓ Search functionality
  ├── Search UI
  ├── Search API
  └── Result display

Deliverables:
- Content management system
- Blog platform
- Search functionality
```

### Phase 5: Enhancement & Polish (Week 9-10)
**Priority**: Medium
```
Tasks:
✓ Performance optimization
  ├── Image optimization
  ├── Code splitting
  ├── Bundle analysis
  └── Caching strategy

✓ Accessibility audit
  ├── Screen reader testing
  ├── Keyboard navigation
  ├── ARIA improvements
  └── Color contrast fixes

✓ SEO optimization
  ├── Meta tags review
  ├── Structured data
  ├── Open Graph images
  └── XML sitemap

✓ Analytics integration
  ├── Google Analytics 4
  ├── Event tracking
  └── Conversion tracking

Deliverables:
- Optimized performance
- WCAG 2.1 AA compliant
- SEO optimized
- Analytics operational
```

### Phase 6: Testing & Launch (Week 11-12)
**Priority**: Critical
```
Tasks:
✓ Cross-browser testing
  ├── Chrome, Firefox, Safari, Edge
  └── Mobile browsers

✓ Responsive testing
  ├── Mobile (320px - 767px)
  ├── Tablet (768px - 1023px)
  └── Desktop (1024px+)

✓ Content review
  ├── All translations complete
  ├── Grammar/spelling check
  └── Image optimization

✓ Security audit
  ├── Form validation
  ├── Rate limiting
  ├── HTTPS enforcement
  └── Security headers

✓ Performance testing
  ├── Lighthouse audit
  ├── Core Web Vitals
  └── Load testing

✓ Deployment
  ├── Vercel deployment
  ├── Custom domain setup
  ├── SSL certificate
  └── CDN configuration

Deliverables:
- Production-ready website
- All tests passed
- Documentation complete
```

---

## 10. TECHNICAL DECISIONS & RECOMMENDATIONS

### 10.1 State Management

```typescript
// Recommended approach for this project:

1. Server State (Recommended)
   - React Server Components (RSC) by default
   - Fetch data on server
   - No client-side state management needed for most pages
   
2. Client State (When needed)
   - React hooks (useState, useReducer) for simple cases
   - URL state for filters/pagination
   - Local storage for preferences (language, theme)

3. Form State
   - React Hook Form + Zod validation
   - Server actions for submission
   - Optimistic updates where appropriate

// AVOID unless necessary:
❌ Redux, MobX, Zustand for this project
❌ Complex global state management
✓ Keep state close to where it's used
✓ Lift state only when needed
```

### 10.2 Styling Strategy

```typescript
// Tailwind CSS 4 configuration

// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... color scale
          950: '#082f49',
        },
        // Brand colors
        brand: {
          primary: '#...',
          secondary: '#...',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        // Korean fonts
        korean: ['Noto Sans KR', 'sans-serif'],
        // Chinese fonts
        chinese: ['Noto Sans SC', 'sans-serif'],
      },
      spacing: {
        // Custom spacing if needed
      },
      borderRadius: {
        // Custom radius values
      },
    },
  },
  plugins: [
    // @tailwindcss/typography for blog content
    // @tailwindcss/forms for better form styles
    // @tailwindcss/aspect-ratio for images
  ],
};

// Styling patterns:
✓ Use Tailwind utility classes
✓ Extract common patterns to components
✓ Use CSS variables for theme values
✓ Support dark mode (optional)
✓ Consistent spacing scale
```

### 10.3 Recommended Libraries

```json
{
  "dependencies": {
    // Already installed
    "next": "15.5.6",
    "next-intl": "^4.3.12",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    
    // Recommended additions
    "zod": "^3.22.0",                    // Schema validation
    "react-hook-form": "^7.50.0",        // Form management
    "clsx": "^2.1.0",                    // Classname utility
    "tailwind-merge": "^2.2.0",          // Merge Tailwind classes
    "lucide-react": "^0.300.0",          // Icons
    "date-fns": "^3.0.0",                // Date formatting
    "resend": "^3.0.0",                  // Email sending
    
    // Optional but useful
    "react-hot-toast": "^2.4.1",         // Toast notifications
    "framer-motion": "^11.0.0",          // Animations
    "sharp": "^0.33.0",                  // Image processing
    "@vercel/analytics": "^1.1.0",       // Analytics
    "@vercel/speed-insights": "^1.0.0",  // Performance insights
  },
  
  "devDependencies": {
    // Already installed
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5",
    
    // Recommended additions
    "@tailwindcss/typography": "^0.5.10", // Blog styling
    "@next/bundle-analyzer": "^15.0.0",   // Bundle analysis
    "eslint": "^8.56.0",                  // Linting
    "eslint-config-next": "^15.0.0",      // Next.js ESLint config
    "prettier": "^3.2.0",                 // Code formatting
    "prettier-plugin-tailwindcss": "^0.5.0" // Sort Tailwind classes
  }
}
```

### 10.4 Environment Variables

```bash
# .env.local (not committed to git)
# .env.example (committed as template)

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME=Your Company Name

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=xxxxxxxx

# CMS (If using)
CONTENTFUL_SPACE_ID=xxxx
CONTENTFUL_ACCESS_TOKEN=xxxx
CONTENTFUL_PREVIEW_ACCESS_TOKEN=xxxx

# Database (If using)
DATABASE_URL=postgresql://...

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Feature Flags
NEXT_PUBLIC_ENABLE_SEARCH=true
NEXT_PUBLIC_ENABLE_BLOG=true
```

---

## 11. SEO BEST PRACTICES FOR MULTILINGUAL SITES

### 11.1 hreflang Implementation

```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({ 
  params 
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const currentPath = '/company/about'; // Dynamic based on route
  
  return {
    alternates: {
      canonical: `/${locale}${currentPath}`,
      languages: {
        'ko': currentPath,
        'en': `/en${currentPath}`,
        'zh': `/zh${currentPath}`,
        'x-default': currentPath, // Default for unknown locales
      },
    },
  };
}

// Generated HTML output:
<link rel="canonical" href="https://yoursite.com/ko/company/about" />
<link rel="alternate" hreflang="ko" href="https://yoursite.com/company/about" />
<link rel="alternate" hreflang="en" href="https://yoursite.com/en/company/about" />
<link rel="alternate" hreflang="zh" href="https://yoursite.com/zh/company/about" />
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/company/about" />
```

### 11.2 XML Sitemap with Language Alternates

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

const baseUrl = 'https://yoursite.com';
const locales = ['ko', 'en', 'zh'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/company/about',
    '/company/history',
    '/company/team',
    '/products',
    '/support/contact',
    // ... all routes
  ];

  const sitemapEntries = routes.flatMap((route) => {
    return locales.map((locale) => {
      const url = locale === 'ko' 
        ? `${baseUrl}${route}`
        : `${baseUrl}/${locale}${route}`;
      
      return {
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '/' ? 1.0 : 0.8,
        alternates: {
          languages: {
            ko: `${baseUrl}${route}`,
            en: `${baseUrl}/en${route}`,
            zh: `${baseUrl}/zh${route}`,
          },
        },
      };
    });
  });

  return sitemapEntries;
}
```

### 11.3 Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

---

## 12. DEPLOYMENT & HOSTING

### 12.1 Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod

# Environment variables (set in Vercel dashboard or CLI)
vercel env add RESEND_API_KEY
vercel env add DATABASE_URL
```

### 12.2 Performance Configuration

```typescript
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Compression
  compress: true,
  
  // Trailing slashes
  trailingSlash: false,
  
  // Strict mode
  reactStrictMode: true,
  
  // Type checking
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

---

## 13. MONITORING & ANALYTICS

### 13.1 Analytics Setup

```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log events
export const event = ({ 
  action, 
  category, 
  label, 
  value 
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Usage in components:
// import { event } from '@/lib/analytics';
// event({ action: 'contact_form_submit', category: 'Contact' });
```

### 13.2 Performance Monitoring

```typescript
// Use Vercel Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

// Add to root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 14. MAINTENANCE & SCALING

### 14.1 Content Update Strategy

```
Regular content updates:
- Blog posts: Weekly or bi-weekly
- Product updates: As needed
- Team changes: As needed
- News/Press: As occurs

Translation workflow:
1. Create content in primary language (Korean)
2. Professional translation to English/Chinese
3. Review by native speakers
4. Update all JSON files
5. Deploy to production

Version control:
- Git for code and content
- Semantic versioning (MAJOR.MINOR.PATCH)
- Change log maintenance
```

### 14.2 Scaling Considerations

```
When to scale:

Traffic growth:
- Add CDN (Vercel Edge Network included)
- Implement ISR for frequently updated pages
- Add database read replicas

Content growth:
- Migrate to headless CMS (Contentful, Sanity)
- Implement full-text search (Algolia)
- Add image CDN (Cloudinary, imgix)

Team growth:
- Implement CMS for non-technical editors
- Add preview/draft mode
- Implement approval workflows
- Add role-based access control

International growth:
- Add more languages
- Implement geo-routing
- Localize currencies/dates/numbers
- Consider regional servers
```

---

## 15. DEVELOPMENT WORKFLOW

### 15.1 Git Workflow

```bash
# Branch naming convention
feature/add-product-catalog
fix/contact-form-validation
content/update-team-page
i18n/add-spanish-translations

# Commit message format
feat: Add product filtering functionality
fix: Resolve language switcher bug on mobile
content: Update company history
i18n: Add Chinese translations for contact page
perf: Optimize image loading on product pages
a11y: Improve keyboard navigation in header

# Development workflow
1. Create feature branch from main
2. Develop and test locally
3. Create pull request
4. Code review
5. Merge to main
6. Auto-deploy to production
```

### 15.2 Code Quality

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "react/no-unescaped-entities": "off"
  }
}

// prettier.config.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss']
};
```

---

## SUMMARY

This architecture provides a comprehensive, production-ready foundation for a multilingual corporate website with:

**✓ Scalable Structure**: Easy to add pages, languages, and features
**✓ SEO Optimized**: Full metadata, structured data, sitemaps
**✓ Performance Focused**: Core Web Vitals optimized, image optimization
**✓ Accessible**: WCAG 2.1 AA compliant design
**✓ Maintainable**: Clear component hierarchy, TypeScript, organized code
**✓ Modern Stack**: Next.js 15, React 19, Tailwind CSS 4, next-intl

**Implementation Priority**:
1. Phase 1: Foundation & Layout (2 weeks)
2. Phase 2: Core Pages (2 weeks)
3. Phase 3: Products (2 weeks)
4. Phase 4: Content & Resources (2 weeks)
5. Phase 5: Polish & Optimization (2 weeks)
6. Phase 6: Testing & Launch (2 weeks)

**Total estimated timeline: 12 weeks**

This design is ready for implementation and can be adapted based on specific business requirements and constraints.
