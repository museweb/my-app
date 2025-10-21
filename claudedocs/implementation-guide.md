# Implementation Guide
## Quick Start & Data Flow Architecture

---

## 1. QUICK START GUIDE

### 1.1 Prerequisites

```bash
# Required software
- Node.js 20+ (LTS version)
- npm or yarn or pnpm
- Git
- VS Code (recommended)

# Recommended VS Code extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
```

### 1.2 Initial Setup (Already Complete)

Your project is already initialized with:
```
✓ Next.js 15.5.6 with App Router
✓ TypeScript configuration
✓ Tailwind CSS 4
✓ next-intl for i18n
✓ Basic folder structure
✓ Korean, English, Chinese locale support
```

### 1.3 Next Steps - Install Recommended Dependencies

```bash
# Navigate to project
cd C:\My_work\my-app

# Install form handling and validation
npm install react-hook-form @hookform/resolvers zod

# Install utility libraries
npm install clsx tailwind-merge

# Install icons
npm install lucide-react

# Install date formatting
npm install date-fns

# Install email service (choose one)
npm install resend  # Recommended for email

# Install toast notifications
npm install react-hot-toast

# Install animations (optional)
npm install framer-motion

# Install dev dependencies
npm install -D @tailwindcss/typography prettier prettier-plugin-tailwindcss eslint-config-prettier
```

---

## 2. DATA FLOW ARCHITECTURE

### 2.1 Request Flow Diagram

```
User Request Flow:
=================

1. Browser Request
   ↓
2. Middleware (middleware.ts)
   ├─ Detect/validate locale
   ├─ Redirect if needed
   └─ Add locale to request
   ↓
3. App Router (app/[locale]/...)
   ├─ Match route
   ├─ Load layout hierarchy
   └─ Render page component
   ↓
4. Server Components (Default)
   ├─ Fetch data directly
   ├─ Load translations
   └─ Render HTML
   ↓
5. Client Components (When needed)
   ├─ Hydrate interactivity
   ├─ Handle user interactions
   └─ Client-side state
   ↓
6. Response to Browser
   └─ HTML + JSON + Metadata
```

### 2.2 Translation Loading Flow

```
Translation System:
==================

Request with locale parameter
   ↓
i18n/request.ts (getRequestConfig)
   ├─ Validate locale (ko, en, zh)
   ├─ Default to 'ko' if invalid
   └─ Dynamic import: messages/${locale}.json
   ↓
NextIntlClientProvider (layout.tsx)
   ├─ Provide messages to components
   └─ Enable useTranslations hook
   ↓
Components
   ├─ Server: getTranslations('namespace')
   └─ Client: useTranslations('namespace')
   ↓
Rendered text in correct language
```

### 2.3 Navigation Flow

```
Navigation Pattern:
==================

User clicks navigation link
   ↓
LocalizedLink component
   ├─ Determine current locale
   ├─ Build href: /[locale]/path
   └─ Next.js <Link>
   ↓
Client-side navigation (SPA)
   ├─ Fetch new page data
   ├─ Update URL
   └─ Render new content
   ↓
Or Language Switch
   ├─ User selects new language
   ├─ Preserve current path
   ├─ Navigate to /[newLocale]/same-path
   └─ Re-render with new translations
```

### 2.4 Form Submission Flow

```
Contact Form Example:
====================

1. User fills form
   ↓
2. Client-side validation (Zod schema)
   ├─ Field-level validation
   ├─ Real-time error display
   └─ Submit button enabled when valid
   ↓
3. Form submission
   ├─ preventDefault default behavior
   └─ POST to /api/contact
   ↓
4. API Route Handler (app/api/contact/route.ts)
   ├─ Parse request body
   ├─ Validate with Zod schema (server-side)
   ├─ Rate limiting check
   ├─ Send email (Resend/SendGrid)
   ├─ Save to database (optional)
   └─ Return JSON response
   ↓
5. Handle Response
   ├─ Success: Show success message, reset form
   ├─ Error: Show error message
   └─ Track analytics event
```

### 2.5 SEO & Metadata Flow

```
Metadata Generation:
===================

Page request
   ↓
generateMetadata() function
   ├─ Get locale from params
   ├─ Load translations
   ├─ Generate metadata object
   │   ├─ title, description
   │   ├─ Open Graph tags
   │   ├─ Twitter Card
   │   └─ Alternate languages (hreflang)
   └─ Return metadata
   ↓
Next.js builds <head>
   ├─ <title>
   ├─ <meta> tags
   ├─ <link rel="alternate">
   └─ <script type="application/ld+json">
   ↓
Search engines index
```

---

## 3. FILE CREATION SEQUENCE

### Phase 1: Foundation Setup (Week 1)

```bash
# 1. Create utility functions
touch lib/utils/cn.ts
touch lib/utils/formatters.ts
touch lib/constants/navigation.ts

# 2. Create base UI components
mkdir -p components/ui/Button components/ui/Card components/ui/Form
touch components/ui/Button/Button.tsx
touch components/ui/Card/Card.tsx
touch components/ui/Form/Input.tsx
touch components/ui/Form/TextArea.tsx
touch components/ui/Form/FormField.tsx

# 3. Create layout components
mkdir -p components/layout/Header components/layout/Footer
touch components/layout/Header/Header.tsx
touch components/layout/Header/Navigation.tsx
touch components/layout/Header/LanguageSwitcher.tsx
touch components/layout/Header/MobileMenu.tsx
touch components/layout/Footer/Footer.tsx
touch components/layout/Breadcrumbs/Breadcrumbs.tsx

# 4. Create shared components
mkdir -p components/shared/Link
touch components/shared/Link/LocalizedLink.tsx

# 5. Update translation files
# Edit messages/ko.json, messages/en.json, messages/zh.json
# Add navigation, footer, and common translations
```

### Phase 2: Core Pages (Week 2)

```bash
# 1. Update home page
# Edit app/[locale]/page.tsx with proper structure

# 2. Create company pages (already exist, enhance them)
# Edit app/[locale]/company/about/page.tsx
# Edit app/[locale]/company/history/page.tsx
# Edit app/[locale]/company/team/page.tsx

# 3. Create additional company pages
mkdir -p app/[locale]/company/locations
touch app/[locale]/company/locations/page.tsx

# 4. Create legal pages
mkdir -p app/[locale]/legal/privacy app/[locale]/legal/terms app/[locale]/legal/cookies
touch app/[locale]/legal/privacy/page.tsx
touch app/[locale]/legal/terms/page.tsx
touch app/[locale]/legal/cookies/page.tsx

# 5. Create contact page
mkdir -p app/[locale]/support/contact
touch app/[locale]/support/contact/page.tsx
```

### Phase 3: Products Section (Week 3-4)

```bash
# 1. Create product data structure
mkdir -p data/products
touch data/products/index.ts
touch data/products/products.json
touch types/product.ts

# 2. Create product pages
mkdir -p app/[locale]/products
touch app/[locale]/products/page.tsx
touch app/[locale]/products/[productId]/page.tsx

# 3. Create product components
mkdir -p components/sections/products
touch components/sections/products/ProductGrid.tsx
touch components/sections/products/ProductFilter.tsx
touch components/ui/Card/variants/ProductCard.tsx
```

### Phase 4: API Routes (Week 4)

```bash
# 1. Create API routes
mkdir -p app/api/contact app/api/newsletter
touch app/api/contact/route.ts
touch app/api/newsletter/route.ts

# 2. Create form components
mkdir -p components/forms/ContactForm
touch components/forms/ContactForm/ContactForm.tsx
touch components/forms/ContactForm/validations.ts
```

---

## 4. STEP-BY-STEP IMPLEMENTATION

### Step 1: Set Up Utilities

**File: lib/utils/cn.ts**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**File: lib/utils/formatters.ts**
```typescript
import { format } from 'date-fns';
import { ko, enUS, zhCN } from 'date-fns/locale';

const localeMap = {
  ko: ko,
  en: enUS,
  zh: zhCN,
};

export function formatDate(date: Date, locale: string = 'ko') {
  return format(date, 'PPP', { locale: localeMap[locale] || ko });
}

export function formatPrice(
  amount: number,
  currency: string = 'KRW',
  locale: string = 'ko'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(number: number, locale: string = 'ko') {
  return new Intl.NumberFormat(locale).format(number);
}
```

**File: lib/constants/navigation.ts**
```typescript
export interface NavigationItem {
  id: string;
  labelKey: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'company',
    labelKey: 'nav.company',
    href: '/company/about',
    children: [
      { id: 'about', labelKey: 'nav.about', href: '/company/about' },
      { id: 'history', labelKey: 'nav.history', href: '/company/history' },
      { id: 'team', labelKey: 'nav.team', href: '/company/team' },
      { id: 'locations', labelKey: 'nav.locations', href: '/company/locations' },
    ],
  },
  {
    id: 'products',
    labelKey: 'nav.products',
    href: '/products',
  },
  {
    id: 'support',
    labelKey: 'nav.support',
    href: '/support/contact',
    children: [
      { id: 'contact', labelKey: 'nav.contact', href: '/support/contact' },
    ],
  },
];

export const footerLinks = {
  company: [
    { labelKey: 'footer.about', href: '/company/about' },
    { labelKey: 'footer.history', href: '/company/history' },
    { labelKey: 'footer.team', href: '/company/team' },
  ],
  support: [
    { labelKey: 'footer.contact', href: '/support/contact' },
  ],
  legal: [
    { labelKey: 'footer.privacy', href: '/legal/privacy' },
    { labelKey: 'footer.terms', href: '/legal/terms' },
    { labelKey: 'footer.cookies', href: '/legal/cookies' },
  ],
};
```

### Step 2: Update Translation Files

**File: messages/ko.json** (enhance existing)
```json
{
  "metadata": {
    "title": "회사명 - 혁신적인 솔루션",
    "description": "최고의 제품과 서비스를 제공하는 회사입니다."
  },
  "nav": {
    "company": "회사소개",
    "about": "회사 소개",
    "history": "연혁",
    "team": "팀",
    "locations": "오시는 길",
    "products": "제품",
    "support": "지원",
    "contact": "문의하기"
  },
  "footer": {
    "description": "혁신적인 기술로 고객의 성공을 돕습니다.",
    "company": {
      "title": "회사"
    },
    "support": {
      "title": "지원"
    },
    "legal": {
      "title": "법적 고지"
    },
    "about": "회사 소개",
    "history": "연혁",
    "team": "팀",
    "contact": "문의하기",
    "privacy": "개인정보처리방침",
    "terms": "이용약관",
    "cookies": "쿠키 정책",
    "copyright": "© {year} 회사명. All rights reserved.",
    "newsletter": {
      "title": "뉴스레터 구독",
      "description": "최신 소식을 받아보세요.",
      "placeholder": "이메일 주소",
      "submit": "구독하기"
    }
  },
  "common": {
    "home": "홈",
    "readMore": "더 보기",
    "learnMore": "자세히 보기",
    "contactUs": "문의하기",
    "getStarted": "시작하기",
    "loading": "로딩 중...",
    "error": "오류가 발생했습니다.",
    "success": "성공했습니다."
  },
  "contact": {
    "title": "문의하기",
    "description": "궁금하신 사항이 있으시면 언제든지 문의해주세요.",
    "form": {
      "name": {
        "label": "이름",
        "placeholder": "홍길동"
      },
      "email": {
        "label": "이메일",
        "placeholder": "email@example.com"
      },
      "phone": {
        "label": "연락처",
        "placeholder": "010-1234-5678"
      },
      "company": {
        "label": "회사명",
        "placeholder": "회사명 (선택사항)"
      },
      "subject": {
        "label": "제목",
        "placeholder": "문의 제목을 입력하세요"
      },
      "message": {
        "label": "내용",
        "placeholder": "문의 내용을 입력하세요"
      },
      "consent": "개인정보 수집 및 이용에 동의합니다.",
      "privacyPolicy": "개인정보처리방침",
      "submit": "문의 보내기",
      "success": "문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.",
      "error": "문의 전송에 실패했습니다. 다시 시도해주세요."
    }
  },
  "products": {
    "title": "제품",
    "description": "혁신적인 제품을 만나보세요.",
    "featured": "추천",
    "viewDetails": "상세보기",
    "allProducts": "모든 제품",
    "noProducts": "제품이 없습니다."
  }
}
```

**File: messages/en.json**
```json
{
  "metadata": {
    "title": "Company Name - Innovative Solutions",
    "description": "We provide the best products and services."
  },
  "nav": {
    "company": "Company",
    "about": "About Us",
    "history": "History",
    "team": "Team",
    "locations": "Locations",
    "products": "Products",
    "support": "Support",
    "contact": "Contact"
  },
  "footer": {
    "description": "We help our customers succeed with innovative technology.",
    "company": {
      "title": "Company"
    },
    "support": {
      "title": "Support"
    },
    "legal": {
      "title": "Legal"
    },
    "about": "About Us",
    "history": "History",
    "team": "Team",
    "contact": "Contact",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "cookies": "Cookie Policy",
    "copyright": "© {year} Company Name. All rights reserved.",
    "newsletter": {
      "title": "Subscribe to Newsletter",
      "description": "Get the latest updates.",
      "placeholder": "Email address",
      "submit": "Subscribe"
    }
  },
  "common": {
    "home": "Home",
    "readMore": "Read More",
    "learnMore": "Learn More",
    "contactUs": "Contact Us",
    "getStarted": "Get Started",
    "loading": "Loading...",
    "error": "An error occurred.",
    "success": "Success!"
  },
  "contact": {
    "title": "Contact Us",
    "description": "Feel free to reach out with any questions.",
    "form": {
      "name": {
        "label": "Name",
        "placeholder": "John Doe"
      },
      "email": {
        "label": "Email",
        "placeholder": "email@example.com"
      },
      "phone": {
        "label": "Phone",
        "placeholder": "+1 (555) 123-4567"
      },
      "company": {
        "label": "Company",
        "placeholder": "Company name (optional)"
      },
      "subject": {
        "label": "Subject",
        "placeholder": "Enter subject"
      },
      "message": {
        "label": "Message",
        "placeholder": "Enter your message"
      },
      "consent": "I agree to the privacy policy.",
      "privacyPolicy": "Privacy Policy",
      "submit": "Send Message",
      "success": "Your message has been sent successfully. We'll get back to you soon.",
      "error": "Failed to send message. Please try again."
    }
  },
  "products": {
    "title": "Products",
    "description": "Discover our innovative products.",
    "featured": "Featured",
    "viewDetails": "View Details",
    "allProducts": "All Products",
    "noProducts": "No products available."
  }
}
```

**File: messages/zh.json**
```json
{
  "metadata": {
    "title": "公司名称 - 创新解决方案",
    "description": "我们提供最好的产品和服务。"
  },
  "nav": {
    "company": "公司",
    "about": "关于我们",
    "history": "历史",
    "team": "团队",
    "locations": "地点",
    "products": "产品",
    "support": "支持",
    "contact": "联系"
  },
  "footer": {
    "description": "我们用创新技术帮助客户成功。",
    "company": {
      "title": "公司"
    },
    "support": {
      "title": "支持"
    },
    "legal": {
      "title": "法律"
    },
    "about": "关于我们",
    "history": "历史",
    "team": "团队",
    "contact": "联系",
    "privacy": "隐私政策",
    "terms": "服务条款",
    "cookies": "Cookie政策",
    "copyright": "© {year} 公司名称。保留所有权利。",
    "newsletter": {
      "title": "订阅新闻",
      "description": "获取最新更新。",
      "placeholder": "电子邮件地址",
      "submit": "订阅"
    }
  },
  "common": {
    "home": "首页",
    "readMore": "阅读更多",
    "learnMore": "了解更多",
    "contactUs": "联系我们",
    "getStarted": "开始",
    "loading": "加载中...",
    "error": "发生错误。",
    "success": "成功！"
  },
  "contact": {
    "title": "联系我们",
    "description": "如有任何问题，请随时联系我们。",
    "form": {
      "name": {
        "label": "姓名",
        "placeholder": "张三"
      },
      "email": {
        "label": "电子邮件",
        "placeholder": "email@example.com"
      },
      "phone": {
        "label": "电话",
        "placeholder": "+86 138-1234-5678"
      },
      "company": {
        "label": "公司",
        "placeholder": "公司名称（可选）"
      },
      "subject": {
        "label": "主题",
        "placeholder": "输入主题"
      },
      "message": {
        "label": "消息",
        "placeholder": "输入您的消息"
      },
      "consent": "我同意隐私政策。",
      "privacyPolicy": "隐私政策",
      "submit": "发送消息",
      "success": "您的消息已成功发送。我们会尽快回复您。",
      "error": "发送消息失败。请重试。"
    }
  },
  "products": {
    "title": "产品",
    "description": "发现我们的创新产品。",
    "featured": "推荐",
    "viewDetails": "查看详情",
    "allProducts": "所有产品",
    "noProducts": "没有可用的产品。"
  }
}
```

### Step 3: Create TypeScript Types

**File: types/index.ts**
```typescript
export interface Locale {
  code: string;
  name: string;
  flag: string;
}

export interface NavigationItem {
  id: string;
  labelKey: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}
```

**File: types/product.ts**
```typescript
export interface Product {
  id: string;
  slug: string;
  category: string;
  translations: {
    [locale: string]: {
      title: string;
      description: string;
      features: string[];
      specifications?: Record<string, string>;
    };
  };
  price: {
    amount: number;
    currency: string;
  };
  images: string[];
  featured?: boolean;
  publishedAt: string;
  updatedAt?: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  translations: {
    [locale: string]: {
      name: string;
      description: string;
    };
  };
}
```

---

## 5. TESTING STRATEGY

### 5.1 Manual Testing Checklist

```markdown
## Pre-Launch Testing

### Multi-language Testing
- [ ] All pages accessible in ko, en, zh
- [ ] Language switcher works on all pages
- [ ] URL structure correct (ko no prefix, en /en, zh /zh)
- [ ] Translations complete and accurate
- [ ] Right-to-left text handled (if applicable)
- [ ] Date/number formatting correct per locale

### Navigation Testing
- [ ] All navigation links work
- [ ] Active page highlighted
- [ ] Breadcrumbs accurate
- [ ] Mobile menu functional
- [ ] Keyboard navigation works

### Form Testing
- [ ] Client-side validation works
- [ ] Server-side validation works
- [ ] Error messages display correctly
- [ ] Success states work
- [ ] Email sending functional
- [ ] CAPTCHA works (if implemented)

### Responsive Testing
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1920px+)
- [ ] Touch interactions work

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Images optimized
- [ ] No console errors

### SEO Testing
- [ ] Meta tags present on all pages
- [ ] hreflang tags correct
- [ ] Sitemap.xml generated
- [ ] Robots.txt correct
- [ ] Structured data valid
- [ ] Open Graph images

### Accessibility Testing
- [ ] Screen reader compatible
- [ ] Keyboard navigation
- [ ] ARIA labels present
- [ ] Color contrast 4.5:1+
- [ ] Focus indicators visible
- [ ] Forms accessible

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome
```

---

## 6. DEPLOYMENT CHECKLIST

```markdown
## Pre-Deployment

### Environment Variables
- [ ] All env vars set in Vercel dashboard
- [ ] Production API keys configured
- [ ] Email service configured
- [ ] Analytics IDs set

### Content Review
- [ ] All translations reviewed
- [ ] Images optimized
- [ ] No placeholder content
- [ ] Legal pages complete
- [ ] Contact information correct

### Technical Checks
- [ ] Build succeeds locally
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Tests passing (if any)
- [ ] Bundle size acceptable

### Security
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Form validation secure
- [ ] No secrets in code

## Post-Deployment

### Verification
- [ ] All pages load correctly
- [ ] Forms work in production
- [ ] Email sending works
- [ ] Analytics tracking
- [ ] Sitemap accessible
- [ ] SSL certificate valid

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor Core Web Vitals
- [ ] Check server logs
- [ ] Monitor email delivery
- [ ] Track form submissions

### Marketing
- [ ] Submit sitemap to Google
- [ ] Submit to Bing Webmaster
- [ ] Set up Google Analytics
- [ ] Configure Google Search Console
- [ ] Social media sharing tested
```

---

## 7. COMMON PATTERNS & BEST PRACTICES

### Pattern 1: Server Component with Translations

```typescript
// app/[locale]/example/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function ExamplePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'example' });

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Pattern 2: Client Component with Translations

```typescript
// components/Example.tsx
'use client';

import { useTranslations } from 'next-intl';

export function Example() {
  const t = useTranslations('example');

  return (
    <button>{t('buttonLabel')}</button>
  );
}
```

### Pattern 3: Dynamic Route with Metadata

```typescript
// app/[locale]/products/[productId]/page.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; productId: string }>
}): Promise<Metadata> {
  const { locale, productId } = await params;
  const product = await getProduct(productId);
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: product.translations[locale].title,
    description: product.translations[locale].description,
    alternates: {
      canonical: `/${locale}/products/${productId}`,
      languages: {
        'ko': `/products/${productId}`,
        'en': `/en/products/${productId}`,
        'zh': `/zh/products/${productId}`,
      },
    },
  };
}
```

### Pattern 4: Error Handling

```typescript
// app/[locale]/error.tsx
'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('description')}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg"
        >
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
```

---

## 8. TROUBLESHOOTING

### Common Issues & Solutions

**Issue: Translations not loading**
```
Solution:
1. Check messages/${locale}.json exists
2. Verify i18n/request.ts imports correctly
3. Check namespace matches in getTranslations()
4. Restart dev server
```

**Issue: Language switcher not working**
```
Solution:
1. Verify routing.ts configuration
2. Check middleware.ts is running
3. Ensure locale is in URL for non-default
4. Check useRouter from next-intl/client
```

**Issue: Build fails with type errors**
```
Solution:
1. Run: npm run build
2. Fix TypeScript errors
3. Check async params are awaited
4. Verify all imports are correct
```

**Issue: Images not optimizing**
```
Solution:
1. Use next/image component
2. Provide width/height or fill
3. Check image paths are correct
4. Verify images in public/ directory
```

---

This implementation guide provides step-by-step instructions for building out the complete multilingual website architecture.
