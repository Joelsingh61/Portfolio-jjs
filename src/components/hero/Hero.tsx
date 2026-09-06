import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, FileText, Bot } from 'lucide-react';
import type { Profile } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  const social = profile.social || {};

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Subtle Tech Grid & Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--grid-color)_1px,transparent_1px)] [background-size:32px_32px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-start gap-6 text-left">
          
          {/* Status Indicator & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            {profile.status && (
              <Badge variant="emerald" icon={<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}>
                {profile.status.toUpperCase()}
              </Badge>
            )}

            <span className="text-xs font-mono text-muted tracking-wider uppercase border-l border-surface-border pl-3">
              ROBOTICS × AI × AUTONOMOUS SYSTEMS
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-[1.1]"
          >
            Building intelligent systems <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              for the physical world.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-secondary max-w-3xl leading-relaxed"
          >
            {profile.name} — {profile.title} at {profile.university}, focused on robotics, autonomous systems, computer vision, AI and intelligent machines.
          </motion.p>

          {/* Buttons & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <a href="#projects">
              <Button variant="primary" size="lg" icon={<Bot className="w-5 h-5" />}>
                VIEW PROJECTS
              </Button>
            </a>

            <Button
              variant="secondary"
              size="lg"
              onClick={onOpenResume}
              icon={<FileText className="w-5 h-5" />}
            >
              VIEW RESUME
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 pt-4 border-t border-surface-border/60 w-full"
          >
            <span className="text-xs font-mono text-muted uppercase tracking-widest">Connect:</span>

            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </motion.div>

        </div>
      </div>

      {/* Down Arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted flex flex-col items-center gap-1 animate-bounce"
      >
        <span className="text-[10px] font-mono tracking-widest text-muted">SCROLL</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
