import React from 'react';
import { contactData } from '@/content/contact';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mail, MapPin, Briefcase, ExternalLink, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact & Collaboration — Chinmoy Kalita',
  description:
    'Initiate a dialogue, discuss technical collaborations, research proposals, or engineering roles.',
};

export default function ContactPage() {
  return (
    <Container size="md" className="py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-theme-border pb-8">
        <Tag variant="amber" size="sm">
          The Story Continues
        </Tag>
        <h1 className="text-fluid-h1 font-serif font-black text-theme-text mt-3">
          Start a Conversation
        </h1>
        <p className="text-theme-muted text-sm sm:text-base max-w-2xl mt-3">
          {contactData.availability}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact details */}
        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-theme-text">Direct Channels</h2>
            <p className="text-xs text-theme-muted mt-1">
              Feel free to reach out directly via email or social networks.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-theme-amber shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono text-theme-muted block">Email</span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-medium text-theme-amber hover:underline"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-theme-amber shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono text-theme-muted block">Location</span>
                <span className="text-theme-text">{contactData.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-theme-amber shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono text-theme-muted block">Focus / Role</span>
                <span className="text-theme-text">{contactData.currentRoleOrStatus}</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="pt-4 border-t border-theme-border space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-theme-muted block">
              Networks & Profiles
            </span>
            <div className="space-y-2">
              {contactData.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-theme-surface-elevated border border-theme-border hover:border-theme-border-strong text-xs text-theme-text transition-all"
                >
                  <span className="font-medium">{social.platform}</span>
                  <span className="font-mono text-theme-muted flex items-center gap-1">
                    {social.handle}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Card>

        {/* Narrative Closing Note */}
        <Card withWash className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-theme-amber">
              <MessageSquare className="w-4 h-4" />
              Documentary Epilogue
            </div>

            <h3 className="text-xl font-serif font-bold text-theme-text mt-3">
              &ldquo;No story is finished while there is still work to be made.&rdquo;
            </h3>

            <p className="text-sm text-theme-muted leading-relaxed mt-4">
              {contactData.bioSnippet}
            </p>

            <p className="text-xs text-theme-muted mt-4 leading-relaxed">
              Whether you are an engineering team building complex systems, a researcher exploring
              user-facing AI, or a collaborator with a bold idea — my inbox is open.
            </p>
          </div>

          <div className="pt-4 border-t border-theme-border">
            <a href={`mailto:${contactData.email}`} className="w-full block">
              <Button size="lg" variant="accent" className="w-full">
                <Mail className="w-4 h-4 fill-current" />
                Send an Email
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </Container>
  );
}
