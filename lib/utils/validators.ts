import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Search form schema
 */
export const searchSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
});

export type SearchData = z.infer<typeof searchSchema>;
