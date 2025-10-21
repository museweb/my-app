# Component Specifications & Interface Definitions
## Detailed Component Design for Multilingual Next.js Website

---

## 1. LAYOUT COMPONENTS

### 1.1 Header Component

```typescript
// components/layout/Header/Header.tsx
interface HeaderProps {
  locale: string;
  transparent?: boolean;
  sticky?: boolean;
  showSearch?: boolean;
}

export function Header({ 
  locale, 
  transparent = false, 
  sticky = true,
  showSearch = true 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <header 
      className={cn(
        "w-full transition-all duration-300",
        sticky && "sticky top-0 z-50",
        transparent && !isScrolled ? "bg-transparent" : "bg-white shadow-sm",
        "dark:bg-gray-900"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo locale={locale} />
          
          {/* Desktop Navigation */}
          <Navigation 
            locale={locale} 
            className="hidden lg:flex" 
          />
          
          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {showSearch && (
              <SearchToggle className="hidden md:block" />
            )}
            <LanguageSwitcher currentLocale={locale} />
            <MobileMenuToggle 
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        locale={locale}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
```

### 1.2 Navigation Component

```typescript
// components/layout/Header/Navigation.tsx
import { useTranslations } from 'next-intl';
import { navigationConfig } from '@/lib/constants/navigation';

interface NavigationProps {
  locale: string;
  className?: string;
}

export function Navigation({ locale, className }: NavigationProps) {
  const t = useTranslations('nav');

  return (
    <nav className={className} role="navigation">
      <ul className="flex items-center gap-1">
        {navigationConfig.map((item) => (
          <li key={item.id}>
            {item.children ? (
              <NavigationDropdown 
                item={item} 
                locale={locale}
                t={t}
              />
            ) : (
              <NavigationLink 
                item={item} 
                locale={locale}
                t={t}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Dropdown sub-component
function NavigationDropdown({ item, locale, t }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t(item.labelKey)}
        <ChevronDown className="ml-1 h-4 w-4 inline" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 dark:bg-gray-800">
          {item.children?.map((child) => (
            <LocalizedLink
              key={child.id}
              href={child.href}
              locale={locale}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t(child.labelKey)}
            </LocalizedLink>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 1.3 Language Switcher Component

```typescript
// components/layout/Header/LanguageSwitcher.tsx
interface LanguageSwitcherProps {
  currentLocale: string;
  variant?: 'dropdown' | 'inline';
}

const languages = {
  ko: { name: '한국어', flag: '🇰🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  zh: { name: '中文', flag: '🇨🇳' },
};

export function LanguageSwitcher({ 
  currentLocale, 
  variant = 'dropdown' 
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: string) => {
    // Preserve current path when switching languages
    router.push(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        {Object.entries(languages).map(([locale, { name, flag }]) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              locale === currentLocale
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
            aria-label={`Switch to ${name}`}
          >
            {flag} {name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-md dark:hover:bg-gray-800"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        {languages[currentLocale].flag}
        <span className="hidden sm:inline">
          {languages[currentLocale].name}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-800">
            {Object.entries(languages).map(([locale, { name, flag }]) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                  locale === currentLocale && "bg-gray-50 dark:bg-gray-700"
                )}
              >
                <span className="text-xl">{flag}</span>
                <span>{name}</span>
                {locale === currentLocale && (
                  <Check className="ml-auto h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

### 1.4 Footer Component

```typescript
// components/layout/Footer/Footer.tsx
interface FooterProps {
  locale: string;
  minimal?: boolean;
}

export function Footer({ locale, minimal = false }: FooterProps) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  if (minimal) {
    return (
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>{t('copyright', { year: currentYear })}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Logo locale={locale} className="mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('description')}
            </p>
            <SocialLinks />
          </div>

          {/* Footer links */}
          <div>
            <h3 className="font-semibold mb-4">{t('company.title')}</h3>
            <FooterLinkList links={footerLinks.company} locale={locale} />
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('resources.title')}</h3>
            <FooterLinkList links={footerLinks.resources} locale={locale} />
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('support.title')}</h3>
            <FooterLinkList links={footerLinks.support} locale={locale} />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <NewsletterSignup locale={locale} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>{t('copyright', { year: currentYear })}</p>
            <div className="flex gap-6">
              <LocalizedLink href="/legal/privacy" locale={locale}>
                {t('privacy')}
              </LocalizedLink>
              <LocalizedLink href="/legal/terms" locale={locale}>
                {t('terms')}
              </LocalizedLink>
              <LocalizedLink href="/legal/cookies" locale={locale}>
                {t('cookies')}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### 1.5 Breadcrumbs Component

```typescript
// components/layout/Breadcrumbs/Breadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const t = useTranslations('common');

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol 
        className="flex items-center gap-2 text-sm"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home */}
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <LocalizedLink
            href="/"
            locale={locale}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            itemProp="item"
          >
            <span itemProp="name">{t('home')}</span>
          </LocalizedLink>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {item.href ? (
              <LocalizedLink
                href={item.href}
                locale={locale}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </LocalizedLink>
            ) : (
              <span 
                className="text-gray-900 dark:text-gray-100 font-medium"
                itemProp="name"
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Auto-generate breadcrumbs from path
export function useBreadcrumbs(locale: string) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  
  const segments = pathname.split('/').filter(Boolean);
  // Remove locale from segments if present
  const pathSegments = segments[0] === locale ? segments.slice(1) : segments;
  
  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = t(segment, { default: segment });
    
    return { label, href };
  });
  
  return breadcrumbs;
}
```

---

## 2. UI COMPONENTS

### 2.1 Button Component

```typescript
// components/ui/Button/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center font-medium rounded-lg transition-all",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        
        // Variants
        variant === 'primary' && [
          "bg-primary-600 text-white hover:bg-primary-700",
          "focus:ring-primary-500",
        ],
        variant === 'secondary' && [
          "bg-gray-200 text-gray-900 hover:bg-gray-300",
          "dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
          "focus:ring-gray-500",
        ],
        variant === 'outline' && [
          "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
          "dark:hover:bg-primary-900/20",
          "focus:ring-primary-500",
        ],
        variant === 'ghost' && [
          "text-gray-700 hover:bg-gray-100",
          "dark:text-gray-300 dark:hover:bg-gray-800",
          "focus:ring-gray-500",
        ],
        variant === 'danger' && [
          "bg-red-600 text-white hover:bg-red-700",
          "focus:ring-red-500",
        ],
        
        // Sizes
        size === 'sm' && "px-3 py-1.5 text-sm gap-1.5",
        size === 'md' && "px-4 py-2 text-base gap-2",
        size === 'lg' && "px-6 py-3 text-lg gap-2.5",
        
        // Full width
        fullWidth && "w-full",
        
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
```

### 2.2 Form Components

```typescript
// components/ui/Form/FormField.tsx
interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}

export function FormField({
  label,
  name,
  error,
  required,
  children,
  hint,
}: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-1.5">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {React.cloneElement(children as React.ReactElement, {
        id,
        name,
        'aria-invalid': !!error,
        'aria-describedby': cn(
          error && errorId,
          hint && hintId
        ),
      })}
      
      {hint && !error && (
        <p id={hintId} className="text-sm text-gray-500">
          {hint}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId} 
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 border rounded-lg transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary-500",
        "disabled:bg-gray-100 disabled:cursor-not-allowed",
        error 
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-primary-500",
        "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
}

// TextArea component
export function TextArea({ error, className, ...props }: InputProps) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 border rounded-lg transition-colors resize-none",
        "focus:outline-none focus:ring-2 focus:ring-primary-500",
        "disabled:bg-gray-100 disabled:cursor-not-allowed",
        error 
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-primary-500",
        "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
}
```

### 2.3 Card Component

```typescript
// components/ui/Card/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
}: CardProps) {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "rounded-lg transition-all",
        
        // Variants
        variant === 'default' && "bg-white dark:bg-gray-800",
        variant === 'elevated' && "bg-white dark:bg-gray-800 shadow-lg",
        variant === 'outlined' && "border border-gray-200 dark:border-gray-700",
        
        // Padding
        padding === 'none' && "p-0",
        padding === 'sm' && "p-4",
        padding === 'md' && "p-6",
        padding === 'lg' && "p-8",
        
        // Hoverable
        hoverable && "hover:shadow-xl hover:scale-[1.02] cursor-pointer",
        
        onClick && "text-left",
        
        className
      )}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-xl font-semibold", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", className)}>{children}</div>;
}
```

---

## 3. SPECIALIZED COMPONENTS

### 3.1 Product Card

```typescript
// components/ui/Card/variants/ProductCard.tsx
interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  image: string;
  category: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('products');
  
  return (
    <Card 
      hoverable 
      variant="outlined"
      padding="none"
      className="overflow-hidden group"
    >
      <LocalizedLink href={`/products/${product.slug}`} locale={locale}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {product.featured && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="primary">{t('featured')}</Badge>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price, locale)}
            </div>
            
            <Button size="sm" variant="outline">
              {t('viewDetails')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </LocalizedLink>
    </Card>
  );
}

// Price formatting utility
function formatPrice(price: { amount: number; currency: string }, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency,
  }).format(price.amount);
}
```

### 3.2 Contact Form

```typescript
// components/forms/ContactForm/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      reset();
      
      // Track event
      event({
        action: 'contact_form_submit',
        category: 'Contact',
        label: locale,
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label={t('name.label')}
          name="name"
          error={errors.name?.message}
          required
        >
          <Input
            {...register('name')}
            placeholder={t('name.placeholder')}
            error={!!errors.name}
          />
        </FormField>

        <FormField
          label={t('email.label')}
          name="email"
          error={errors.email?.message}
          required
        >
          <Input
            {...register('email')}
            type="email"
            placeholder={t('email.placeholder')}
            error={!!errors.email}
            autoComplete="email"
          />
        </FormField>

        <FormField
          label={t('phone.label')}
          name="phone"
          error={errors.phone?.message}
        >
          <Input
            {...register('phone')}
            type="tel"
            placeholder={t('phone.placeholder')}
            error={!!errors.phone}
            autoComplete="tel"
          />
        </FormField>

        <FormField
          label={t('company.label')}
          name="company"
          error={errors.company?.message}
        >
          <Input
            {...register('company')}
            placeholder={t('company.placeholder')}
            error={!!errors.company}
            autoComplete="organization"
          />
        </FormField>
      </div>

      <FormField
        label={t('subject.label')}
        name="subject"
        error={errors.subject?.message}
        required
      >
        <Input
          {...register('subject')}
          placeholder={t('subject.placeholder')}
          error={!!errors.subject}
        />
      </FormField>

      <FormField
        label={t('message.label')}
        name="message"
        error={errors.message?.message}
        required
      >
        <TextArea
          {...register('message')}
          rows={6}
          placeholder={t('message.placeholder')}
          error={!!errors.message}
        />
      </FormField>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register('consent')}
          id="consent"
          className="mt-1"
        />
        <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400">
          {t('consent')}{' '}
          <LocalizedLink 
            href="/legal/privacy" 
            locale={locale}
            className="text-primary-600 hover:underline"
          >
            {t('privacyPolicy')}
          </LocalizedLink>
          {errors.consent && (
            <span className="block text-red-600 mt-1">
              {errors.consent.message}
            </span>
          )}
        </label>
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {t('success')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {t('error')}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        fullWidth
      >
        {t('submit')}
      </Button>
    </form>
  );
}
```

---

## 4. UTILITY COMPONENTS

### 4.1 Localized Link

```typescript
// components/shared/Link/LocalizedLink.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LocalizedLinkProps {
  href: string;
  locale: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export function LocalizedLink({
  href,
  locale,
  children,
  className,
  activeClassName,
  ...props
}: LocalizedLinkProps) {
  const pathname = usePathname();
  
  // Build localized href
  const localizedHref = locale === 'ko' ? href : `/${locale}${href}`;
  
  // Check if current page
  const isActive = pathname === localizedHref;
  
  return (
    <Link
      href={localizedHref}
      className={cn(
        className,
        isActive && activeClassName
      )}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
```

### 4.2 Optimized Image

```typescript
// components/shared/Image/OptimizedImage.tsx
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  aspectRatio,
}: OptimizedImageProps) {
  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
  };

  return (
    <div className={cn(
      aspectRatio && aspectClasses[aspectRatio],
      "relative overflow-hidden",
      className
    )}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
```

---

This component specification provides detailed, production-ready implementations for all core components in the multilingual website architecture.
