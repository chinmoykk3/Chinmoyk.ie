import React from 'react';
import { contactData } from '@/content/contact';
import { Mail, MapPin, Briefcase, ExternalLink, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact & Collaboration — Chinmoy Kalita',
  description:
    'Initiate a dialogue, discuss technical collaborations, research proposals, or engineering roles.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-canvas-border pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          The Story Continues
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white mt-2">
          Start a Conversation
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
          {contactData.availability}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact details */}
        <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-white">Direct Channels</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Feel free to reach out directly via email or social networks.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono text-zinc-400 block">Email</span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-medium text-amber-300 hover:underline"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono text-zinc-400 block">Location</span>
                <span className="text-zinc-200">{contactData.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-mono text-zinc-400 block">Focus / Role</span>
                <span className="text-zinc-200">{contactData.currentRoleOrStatus}</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="pt-4 border-t border-canvas-border space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              Networks & Profiles
            </span>
            <div className="space-y-2">
              {contactData.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-canvas-card border border-canvas-border hover:border-amber-400/40 text-xs text-zinc-300 hover:text-white transition-all"
                >
                  <span className="font-medium">{social.platform}</span>
                  <span className="font-mono text-zinc-400 flex items-center gap-1">
                    {social.handle}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative Closing Note */}
        <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <MessageSquare className="w-4 h-4" />
              Documentary Epilogue
            </div>

            <h3 className="text-xl font-serif font-bold text-white mt-3">
              &ldquo;No story is finished while there is still work to be made.&rdquo;
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed mt-4">{contactData.bioSnippet}</p>

            <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
              Whether you are an engineering team building complex systems, a researcher exploring
              the next evolution of user-facing AI, or a collaborator with a bold idea — my inbox is
              open.
            </p>
          </div>

          <div className="pt-4 border-t border-canvas-border">
            <a
              href={`mailto:${contactData.email}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all shadow-lg"
            >
              <Mail className="w-4 h-4 fill-current" />
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
