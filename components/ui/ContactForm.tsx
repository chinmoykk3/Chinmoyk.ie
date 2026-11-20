'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { contactData } from '@/content/contact';

export interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Anti-bot honeypot field
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide a valid name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus('error');
      setServerMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch transmission. Please use direct email.');
      }

      setStatus('success');
      setServerMessage(data.message || 'Message received. I will reply to your transmission promptly.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
      setFieldErrors({});
    } catch (err: unknown) {
      setStatus('error');
      setServerMessage(
        err instanceof Error
          ? err.message
          : 'Unable to deliver message automatically. Please reach out directly via email.'
      );
    }
  };

  const mailtoFallbackUrl = `mailto:${contactData.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Transmission'
  )}&body=${encodeURIComponent(
    `From: ${formData.name || 'Anonymous'} (${formData.email || 'No email provided'})\n\n${
      formData.message || ''
    }`
  )}`;

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Anti-spam Honeypot (Hidden from human visitors and assistive technologies) */}
        <div aria-hidden="true" className="opacity-0 absolute -left-[9999px] -top-[9999px] pointer-events-none select-none h-0 w-0 overflow-hidden">
          <label htmlFor="hp_company_field">Do not fill this field</label>
          <input
            id="hp_company_field"
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact_name" className="text-xs font-mono text-theme-muted block">
              YOUR NAME <span className="text-theme-rose" aria-hidden="true">*</span>
            </label>
            <input
              id="contact_name"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? 'name_error' : undefined}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold transition-colors"
              placeholder="Ada Lovelace"
            />
            {fieldErrors.name && (
              <p id="name_error" className="text-[11px] font-mono text-theme-rose mt-1">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact_email" className="text-xs font-mono text-theme-muted block">
              EMAIL ADDRESS <span className="text-theme-rose" aria-hidden="true">*</span>
            </label>
            <input
              id="contact_email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'email_error' : undefined}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold transition-colors"
              placeholder="ada@example.com"
            />
            {fieldErrors.email && (
              <p id="email_error" className="text-[11px] font-mono text-theme-rose mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Optional Subject */}
        <div className="space-y-1.5">
          <label htmlFor="contact_subject" className="text-xs font-mono text-theme-muted block">
            SUBJECT / TOPIC <span className="text-theme-muted/50 font-normal">(OPTIONAL)</span>
          </label>
          <input
            id="contact_subject"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold transition-colors"
            placeholder="Collaboration, engineering opportunity, or research dialogue"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="contact_message" className="text-xs font-mono text-theme-muted block">
            TRANSMISSION &amp; PROPOSAL <span className="text-theme-rose" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact_message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message_error' : undefined}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
            }}
            className="w-full px-3.5 py-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border text-xs text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold resize-none transition-colors"
            placeholder="Share a vision, question, project proposal, or inquiry..."
          />
          {fieldErrors.message && (
            <p id="message_error" className="text-[11px] font-mono text-theme-rose mt-1">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Status Alerts */}
        {status === 'error' && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-theme-rose/10 border border-theme-rose/30 text-theme-rose text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span>{serverMessage}</span>
              <div className="pt-1">
                <a
                  href={mailtoFallbackUrl}
                  className="font-mono underline hover:text-theme-text inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send via direct email client instead &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div
            role="status"
            aria-live="polite"
            className="p-3.5 rounded-lg bg-theme-azure/10 border border-theme-azure/30 text-theme-azure text-xs flex items-center gap-2.5"
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{serverMessage}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            variant="accent"
            size="md"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4" />
            <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
          </Button>

          {/* Mailto Fallback Alternative */}
          <a
            href={mailtoFallbackUrl}
            className="text-xs font-mono text-theme-muted hover:text-theme-gold transition-colors inline-flex items-center gap-1.5 focus:outline-none focus-visible:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Mailto client fallback</span>
          </a>
        </div>
      </form>
    </div>
  );
}
