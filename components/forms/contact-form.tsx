'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactFormSchema } from '@/lib/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import type { z } from 'zod';

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label={t('name')}
          {...register('name')}
          error={errors.name?.message}
          required
        />
        <Input
          label={t('email')}
          type="email"
          {...register('email')}
          error={errors.email?.message}
          required
        />
      </div>

      <Input
        label={t('phone')}
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Input
        label={t('subject')}
        {...register('subject')}
        error={errors.subject?.message}
        required
      />

      <Textarea
        label={t('message')}
        {...register('message')}
        error={errors.message?.message}
        rows={6}
        required
      />

      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          {t('success')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {t('error')}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </Button>
    </form>
  );
}
