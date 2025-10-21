# Multilingual Website Architecture Documentation
## Complete Design Specification for Next.js 15 Corporate Website

---

## 📚 Documentation Overview

This documentation suite provides a comprehensive, production-ready architecture design for building a multilingual corporate website with Next.js 15, supporting Korean (default), English, and Chinese languages.

### Document Structure

1. **multilingual-website-architecture.md** (Main Architecture Document)
   - Complete folder structure
   - Full sitemap and routing table
   - Component architecture
   - Data management strategy
   - SEO and performance optimization
   - API design
   - Implementation roadmap (12-week plan)
   - Technical decisions and recommendations

2. **component-specifications.md** (Detailed Component Design)
   - Layout components (Header, Footer, Navigation, etc.)
   - UI components (Button, Form, Card, etc.)
   - Specialized components (ProductCard, ContactForm, etc.)
   - Utility components (LocalizedLink, OptimizedImage, etc.)
   - Complete TypeScript interfaces
   - Implementation examples

3. **implementation-guide.md** (Practical Implementation)
   - Quick start guide
   - Data flow architecture diagrams
   - Step-by-step file creation sequence
   - Complete code examples
   - Testing strategy
   - Deployment checklist
   - Common patterns and best practices
   - Troubleshooting guide

---

## 🎯 Project Overview

### Current State
```
✓ Next.js 15.5.6 with App Router
✓ TypeScript 5
✓ Tailwind CSS 4
✓ next-intl 4.3.12
✓ React 19.1.0
✓ Basic i18n setup (ko, en, zh)
✓ Initial page structure
```

### Target Architecture
```
→ Complete multilingual corporate website
→ 30+ pages across 3 languages (90 total pages)
→ SEO-optimized with structured data
→ WCAG 2.1 AA accessible
→ Core Web Vitals optimized
→ Production-ready deployment
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Essential dependencies
npm install react-hook-form @hookform/resolvers zod clsx tailwind-merge lucide-react date-fns resend react-hot-toast

# Development dependencies
npm install -D @tailwindcss/typography prettier prettier-plugin-tailwindcss eslint-config-prettier
```

### 2. Create Core Structure

```bash
# Create utility folders
mkdir -p lib/utils lib/constants lib/hooks

# Create component folders
mkdir -p components/layout/Header components/layout/Footer components/ui/Button components/ui/Form components/ui/Card

# Create type definitions
mkdir -p types

# Create data folder (for static content)
mkdir -p data/products

# Update translation files
# Edit messages/ko.json, messages/en.json, messages/zh.json
```

### 3. Follow Implementation Phases

Refer to **multilingual-website-architecture.md** Section 9 for detailed 12-week implementation roadmap:

- **Phase 1**: Foundation (Week 1-2)
- **Phase 2**: Core Pages (Week 3-4)
- **Phase 3**: Products (Week 5-6)
- **Phase 4**: Content & Resources (Week 7-8)
- **Phase 5**: Enhancement & Polish (Week 9-10)
- **Phase 6**: Testing & Launch (Week 11-12)

---

## 📁 Architecture Highlights

### URL Structure
```
/                          → Korean home (default)
/en                        → English home
/zh                        → Chinese home
/company/about             → Korean about page
/en/company/about          → English about page
/zh/company/about          → Chinese about page
```

### Component Hierarchy
```
Atoms → Molecules → Organisms → Templates → Pages

Example:
Button → FormField → ContactForm → PageLayout → ContactPage
```

### Data Flow
```
Request → Middleware → Route → Server Component → Translations → Render → Response
```

### Translation System
```
messages/${locale}.json → i18n/request.ts → NextIntlProvider → Components
```

---

## 🎨 Key Features

### ✅ Internationalization
- 3 languages: Korean (default), English, Chinese
- URL-based locale detection (`as-needed` prefix)
- Complete translation coverage
- Localized metadata and SEO
- hreflang implementation

### ✅ SEO Optimization
- Dynamic metadata generation
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- XML sitemap with language alternates
- Robots.txt configuration
- Breadcrumb navigation with schema

### ✅ Performance
- Server Components by default
- Image optimization with next/image
- Code splitting and lazy loading
- ISR for dynamic content
- CDN delivery (Vercel Edge)
- Bundle optimization

### ✅ Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### ✅ Developer Experience
- TypeScript for type safety
- Reusable component library
- Consistent naming conventions
- Clear folder structure
- Comprehensive documentation

---

## 📊 Complete Page Sitemap

### Main Navigation (×3 languages = 90 pages)

```
Home (/)
├── Korean: /
├── English: /en
└── Chinese: /zh

Company (/company)
├── About (/company/about)
├── History (/company/history)
├── Team (/company/team)
│   └── Member Detail (/company/team/[memberId])
├── Locations (/company/locations)
├── Careers (/company/careers)
│   └── Job Detail (/company/careers/[jobId])
└── Press (/company/press)
    └── Press Detail (/company/press/[pressId])

Products (/products)
├── Catalog (/products)
├── Category (/products/[category])
└── Product Detail (/products/[productId])

Solutions (/solutions)
├── Overview (/solutions)
└── Solution Detail (/solutions/[solutionId])

Resources (/resources)
├── Blog (/resources/blog)
│   └── Post (/resources/blog/[slug])
├── Case Studies (/resources/case-studies)
│   └── Case Study (/resources/case-studies/[slug])
├── Guides (/resources/guides)
│   └── Guide (/resources/guides/[slug])
└── FAQ (/resources/faq)

Support (/support)
├── Overview (/support)
├── Contact (/support/contact)
├── Documentation (/support/documentation)
│   └── Doc Detail (/support/documentation/[docId])
└── Downloads (/support/downloads)

Legal (/legal)
├── Privacy Policy (/legal/privacy)
├── Terms of Service (/legal/terms)
└── Cookie Policy (/legal/cookies)
```

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.5.6**: App Router, Server Components, ISR
- **React 19.1.0**: Latest features and optimizations
- **TypeScript 5**: Type safety and developer experience

### Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **CSS Modules**: Component-scoped styles (when needed)

### Internationalization
- **next-intl 4.3.12**: Translation management
- **Middleware**: Locale detection and routing

### Form Handling
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **@hookform/resolvers**: Integration layer

### UI & Icons
- **lucide-react**: Icon library
- **clsx** + **tailwind-merge**: Conditional classes

### Date & Numbers
- **date-fns**: Date formatting and manipulation
- **Intl API**: Number and currency formatting

### Email
- **Resend**: Transactional email service

### Deployment
- **Vercel**: Hosting and deployment platform
- **Vercel Analytics**: Performance monitoring
- **Vercel Speed Insights**: Core Web Vitals tracking

---

## 📈 Implementation Timeline

### Estimated Duration: 12 Weeks

```
Week 1-2:   Foundation & Layout Components
Week 3-4:   Core Pages (Company, Contact, Legal)
Week 5-6:   Products Section & Filtering
Week 7-8:   Content & Resources (Blog, Guides)
Week 9-10:  Enhancement & Optimization
Week 11-12: Testing & Launch
```

### Milestone Deliverables

**End of Phase 1 (Week 2)**
- ✓ Complete layout system
- ✓ Navigation working
- ✓ Language switcher functional
- ✓ Translation system operational

**End of Phase 2 (Week 4)**
- ✓ Company section complete
- ✓ Contact form working
- ✓ Legal pages published

**End of Phase 3 (Week 6)**
- ✓ Product catalog live
- ✓ Product detail pages
- ✓ Filtering and search

**End of Phase 4 (Week 8)**
- ✓ Blog platform operational
- ✓ Content management system
- ✓ Site-wide search

**End of Phase 5 (Week 10)**
- ✓ Performance optimized
- ✓ Accessibility compliant
- ✓ SEO fully implemented

**End of Phase 6 (Week 12)**
- ✓ All tests passed
- ✓ Production deployment
- ✓ Monitoring in place

---

## 🎓 Key Concepts

### Server vs Client Components

**Use Server Components (default) for:**
- Static content
- SEO-critical pages
- Data fetching from databases/APIs
- Accessing backend resources

**Use Client Components ('use client') for:**
- Interactive features (forms, modals)
- Browser APIs (localStorage, window)
- Event handlers (onClick, onChange)
- State management (useState, useReducer)
- React hooks (useEffect, useContext)

### Translation Best Practices

```typescript
// ✅ Good: Namespaced translations
const t = useTranslations('contact.form');
<label>{t('name.label')}</label>

// ❌ Avoid: Flat structure
const t = useTranslations();
<label>{t('contactFormNameLabel')}</label>

// ✅ Good: Variables in translations
// messages/ko.json: "greeting": "안녕하세요, {name}님"
t('greeting', { name: userName })

// ✅ Good: Pluralization
// messages/ko.json: "items": "{count}개의 항목"
t('items', { count: itemCount })
```

### SEO Best Practices

```typescript
// ✅ Always implement hreflang
alternates: {
  canonical: `/${locale}/page`,
  languages: {
    'ko': '/page',
    'en': '/en/page',
    'zh': '/zh/page',
  },
}

// ✅ Unique metadata per language
title: t('meta.title'),
description: t('meta.description'),

// ✅ Add structured data
<script type="application/ld+json">
  {JSON.stringify(organizationSchema)}
</script>
```

---

## 🔍 Quality Standards

### Performance Targets
- **Lighthouse Score**: ≥ 90
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms

### Accessibility Requirements
- **WCAG Level**: 2.1 AA
- **Contrast Ratio**: ≥ 4.5:1 for text
- **Keyboard Navigation**: All interactive elements
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Indicators**: Visible on all focusable elements

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: No errors on build
- **Prettier**: Consistent formatting
- **No Console Logs**: In production code
- **Error Handling**: Comprehensive try-catch blocks

---

## 📝 Next Steps

### Immediate Actions (Week 1)

1. **Install dependencies** (see Quick Start above)

2. **Create utility functions**
   - `lib/utils/cn.ts`
   - `lib/utils/formatters.ts`
   - `lib/constants/navigation.ts`

3. **Update translation files**
   - Enhance `messages/ko.json`
   - Enhance `messages/en.json`
   - Enhance `messages/zh.json`

4. **Create base components**
   - Button, Input, Card
   - Header, Footer, Navigation
   - LocalizedLink

5. **Set up environment variables**
   - Create `.env.local`
   - Add email service keys
   - Configure analytics IDs

### Development Workflow

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit

# Linting
npx eslint .

# Format code
npx prettier --write .
```

---

## 📞 Support & Resources

### Documentation References
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

### Recommended Tools
- **VS Code**: Primary IDE
- **Vercel**: Deployment platform
- **Resend**: Email service
- **Lighthouse**: Performance auditing
- **axe DevTools**: Accessibility testing

---

## ✅ Success Criteria

### Technical Success
- ✓ All pages render correctly in 3 languages
- ✓ Core Web Vitals meet targets
- ✓ Zero accessibility violations
- ✓ SEO score > 90
- ✓ All forms functional
- ✓ Email delivery working

### Business Success
- ✓ Professional appearance
- ✓ Fast load times
- ✓ Mobile-friendly
- ✓ Easy to maintain
- ✓ Scalable architecture
- ✓ Search engine indexed

### User Success
- ✓ Intuitive navigation
- ✓ Clear content
- ✓ Fast page transitions
- ✓ Working contact forms
- ✓ Accessible to all users
- ✓ Consistent experience across devices

---

## 🎉 Conclusion

This architecture provides a **complete, production-ready foundation** for building a professional multilingual corporate website. 

**Key Strengths:**
- Scalable and maintainable
- SEO-optimized from the ground up
- Accessibility-first approach
- Performance-focused design
- Modern development practices
- Comprehensive documentation

**Ready for:**
- Immediate implementation
- Team collaboration
- Future expansion
- Multiple languages
- High traffic
- Professional deployment

Follow the implementation guide step-by-step, and you'll have a world-class multilingual website in 12 weeks.

---

**Last Updated**: 2025-01-21
**Version**: 1.0
**Status**: Ready for Implementation
