import React from 'react';
import type { Metadata } from 'next';
import { contactData } from '@/content/contact';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/ui/ContactForm';
import {
  Mail,
  MapPin,
  Briefcase,
  ExternalLink,
  Target,
  Rocket,
  Sparkles,
  Code,
  Users2,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Collaboration — Chinmoy Kalita',
  description:
    'Initiate a dialogue, discuss technical collaborations, research proposals, or engineering roles with Chinmoy Kalita.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <Container size="lg" className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-theme-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag variant="gold" size="sm">
            The Story Continues
          </Tag>
          <Tag variant="default" size="sm">
            Epilogue & Contact
          </Tag>
        </div>
        <h1 className="text-fluid-h1 font-serif font-black text-theme-text tracking-tight">
          Start a Conversation
        </h1>
        <p className="text-theme-muted text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
          {contactData.availability}
        </p>
      </div>

      {/* Main Grid: Direct Ingress Details + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Direct Channels & Profiles */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-6 p-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-theme-text">Direct Channels</h2>
              <p className="text-xs text-theme-muted mt-1">
                Direct channels for high-impact engineering inquiries, research collaborations, and
                builds.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-theme-gold shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-mono text-theme-muted block">Direct Email</span>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="font-medium text-theme-gold hover:underline font-mono"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-theme-gold shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-mono text-theme-muted block">Location</span>
                  <span className="text-theme-text text-xs">{contactData.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-theme-gold shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-mono text-theme-muted block">Focus / Role</span>
                  <span className="text-theme-text text-xs">{contactData.currentRoleOrStatus}</span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-4 border-t border-theme-border space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-theme-muted block">
                Verified Networks & Profiles
              </span>
              <div className="space-y-2">
                {contactData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border hover:border-theme-border-strong text-xs text-theme-text transition-all group"
                  >
                    <span className="font-medium group-hover:text-theme-gold transition-colors">
                      {social.platform}
                    </span>
                    <span className="font-mono text-theme-muted flex items-center gap-1">
                      {social.handle}
                      <ExternalLink className="w-3 h-3 text-theme-muted group-hover:text-theme-gold" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (7 cols): Full Interactive Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-serif font-bold text-xl text-theme-text">Send a Message</h2>
              <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                Client and server validated form with anti-bot protection and direct mailto
                fallback.
              </p>
            </div>

            <ContactForm />
          </Card>
        </div>
      </div>

      {/* Aspirations & Horizons Section */}
      <section className="space-y-6 pt-12 border-t border-theme-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl font-serif font-bold text-theme-text">
            Horizons, Convictions & Collaborations
          </h2>
          <span className="text-xs font-mono text-theme-muted">
            Structured Content from /content/contact.ts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-theme-gold font-semibold uppercase tracking-wider mb-2">
                <Target className="w-4 h-4" />
                <span>What I Want to Become</span>
              </div>
              <p className="text-xs text-theme-text leading-relaxed font-sans">
                {contactData.whatIWantToBecome}
              </p>
            </div>
            <div className="text-[10px] font-mono text-theme-ember flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>[Placeholder: Chinmoy to supply]</span>
            </div>
          </Card>

          <Card className="p-6 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-theme-azure font-semibold uppercase tracking-wider mb-2">
                <Rocket className="w-4 h-4" />
                <span>What I Want to Build</span>
              </div>
              <p className="text-xs text-theme-text leading-relaxed font-sans">
                {contactData.whatIWantToBuild}
              </p>
            </div>
            <div className="text-[10px] font-mono text-theme-ember flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>[Placeholder: Chinmoy to supply]</span>
            </div>
          </Card>

          <Card className="p-6 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-theme-rose font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Core Ambition</span>
              </div>
              <p className="text-xs text-theme-text leading-relaxed font-sans">
                {contactData.ambitions}
              </p>
            </div>
            <div className="text-[10px] font-mono text-theme-ember flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>[Placeholder: Chinmoy to supply]</span>
            </div>
          </Card>

          <Card className="p-6 space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono text-theme-iris font-semibold uppercase tracking-wider mb-2">
              <Code className="w-4 h-4" />
              <span>Technologies to Explore</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {contactData.technologiesToExplore.map((tech, i) => (
                <Tag key={i} variant="default" size="sm">
                  {tech}
                </Tag>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-theme-ember font-semibold uppercase tracking-wider mb-2">
              <Users2 className="w-4 h-4" />
              <span>Collaboration Opportunities</span>
            </div>
            <ul className="space-y-1.5 text-xs text-theme-muted">
              {contactData.collaborationOpportunities.map((collab, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-theme-ember select-none">&bull;</span>
                  <span>{collab}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </Container>
  );
}
