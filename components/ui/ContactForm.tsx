'use client';

import React, { useState } from 'react';
import { contactData } from '@/content/contact';
import { Button } from '@/components/ui/Button';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContactForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden honeypot field for anti-bot protection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  // Client-side validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please write a message of at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage('');

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setServerMessage(data.error || 'Failed to deliver message. Please use direct email.');
      } else {
        setStatus('success');
        setServerMessage(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: '',
        });
        setErrors({});
      }
    } catch {
      setStatus('error');
      setServerMessage('Network error occurred. Please use direct email fallback.');
    }
  };

  const mailtoHref = `mailto:${contactData.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry for Chinmoy Kalita'
  )}&body=${encodeURIComponent(
    `Hello Chinmoy,\n\n${formData.message}\n\nFrom,\n${formData.name} (${formData.email})`
  )}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Direct Contact Form"
      className={cn('space-y-4 text-xs font-mono', className)}
    >
      {/* Anti-Spam Hidden Honeypot Field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Leave this empty</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Input */}
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="block text-theme-text font-semibold">
          Your Name <span className="text-theme-ember">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          placeholder="e.g. Maya Lin"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-xl bg-theme-surface border text-theme-text font-sans text-xs transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold',
            errors.name ? 'border-theme-ember bg-theme-ember/5' : 'border-theme-border'
          )}
        />
        {errors.name && (
          <p
            id="contact-name-error"
            className="text-[11px] text-theme-ember flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="block text-theme-text font-semibold">
          Your Email <span className="text-theme-ember">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          placeholder="e.g. maya@domain.com"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-xl bg-theme-surface border text-theme-text font-sans text-xs transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold',
            errors.email ? 'border-theme-ember bg-theme-ember/5' : 'border-theme-border'
          )}
        />
        {errors.email && (
          <p
            id="contact-email-error"
            className="text-[11px] text-theme-ember flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Input (Optional) */}
      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="block text-theme-text font-semibold">
          Subject / Context <span className="text-theme-muted font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          placeholder="e.g. Engineering collaboration / Research inquiry"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-theme-surface border border-theme-border text-theme-text font-sans text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold"
        />
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-theme-text font-semibold">
          Message <span className="text-theme-ember">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="Describe your project, question, or collaboration opportunity..."
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-xl bg-theme-surface border text-theme-text font-sans text-xs transition-all resize-y',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold',
            errors.message ? 'border-theme-ember bg-theme-ember/5' : 'border-theme-border'
          )}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            className="text-[11px] text-theme-ember flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Success Notification */}
      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="p-3.5 rounded-xl bg-theme-surface-elevated border border-theme-border text-xs flex items-start gap-2.5 text-theme-text animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-theme-gold shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">{serverMessage}</div>
            <p className="text-[11px] text-theme-muted mt-0.5">
              I usually respond within 24–48 hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3.5 rounded-xl bg-theme-ember/10 border border-theme-ember/30 text-xs flex items-start gap-2.5 text-theme-ember animate-fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">{serverMessage}</div>
            <p className="text-[11px] text-theme-muted mt-0.5">
              You can alternatively use the direct mailto button below.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons: Submit & Mailto Fallback */}
      <div className="pt-2 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="accent"
          size="md"
          disabled={status === 'submitting'}
          className="shadow-md"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </>
          )}
        </Button>

        {/* Mailto Fallback Button */}
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-medium text-theme-muted hover:text-theme-text bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold"
        >
          <Mail className="w-3.5 h-3.5 text-theme-gold" />
          <span>Direct Mailto Fallback</span>
        </a>
      </div>
    </form>
  );
}
