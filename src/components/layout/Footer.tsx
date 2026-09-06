import React from 'react';
import { Github, Linkedin, Mail, Cpu } from 'lucide-react';
import type { Profile } from '../../types';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();
  const social = profile.social || {};

  return (
    <footer className="py-12 bg-surface border-t border-surface-border text-secondary font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & University */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-sm">
            <Cpu className="w-4 h-4 text-accent" />
            <span>{profile.name}</span>
          </div>
          <p className="text-muted">
            {profile.title} — {profile.university}
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right: Copyright & Intention Tagline */}
        <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
          <span className="text-muted font-sans">
            Designed &amp; engineered with human intention.
          </span>
          <span className="text-muted">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};
