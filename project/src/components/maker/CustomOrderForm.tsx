import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button, Input, Select, Textarea } from '@/components/common';
import { customOrderService, type CustomOrderSubmission } from '@/services/customOrderService';
import { productService } from '@/services/productService';
import type { Category } from '@/types';

interface FormValues extends CustomOrderSubmission {}

function CustomOrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    productService.getCategories().then(setCategories);
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      await customOrderService.submitRequest(data);
      setSubmitted(true);
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card border border-border bg-bg-surface p-8 text-center animate-fade-in">
        <CheckCircle2 size={48} strokeWidth={1} className="mx-auto text-accent mb-4" />
        <h2 className="text-xl font-semibold text-ink-primary">
          Request received
        </h2>
        <p className="mt-2 text-sm text-ink-secondary">
          Thank you for your interest. The maker will review your request and
          respond personally within a few days.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-card border border-border bg-bg-surface p-6 lg:p-8 space-y-5"
    >
      <Input
        label="Your name"
        placeholder="Jane Doe"
        error={errors.name?.message}
        {...register('name', { required: 'Please enter your name' })}
      />
      <Input
        label="Email"
        type="email"
        placeholder="jane@example.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Please enter your email',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email',
          },
        })}
      />
      <Select
        label="Category"
        options={categories.map((c) => ({ value: c.slug, label: c.name }))}
        error={errors.category?.message}
        {...register('category', { required: 'Please select a category' })}
      />
      <Textarea
        label="Describe your vision"
        placeholder="Tell me about the piece you have in mind — size, colour, mood, intended use..."
        rows={5}
        error={errors.description?.message}
        {...register('description', {
          required: 'Please describe your request',
          minLength: { value: 20, message: 'A few more details would help' },
        })}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Budget (optional)"
          placeholder="e.g. $100–200"
          {...register('budget')}
        />
        <Input
          label="Timeline (optional)"
          placeholder="e.g. 4–6 weeks"
          {...register('timeline')}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        fullWidth
        isLoading={submitting}
        leftIcon={<Send size={18} />}
      >
        Submit request
      </Button>
    </form>
  );
}

export { CustomOrderForm };
