import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Cpu, Activity, Compass, Code, Target } from 'lucide-react';
import type { Profile } from '../../types';
import { Badge } from '../ui/Badge';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const infoBlocks = [
    { label: 'LOCATION', value: profile.location || profile.social?.location, icon: MapPin },
    { label: 'UNIVERSITY', value: profile.university, icon: GraduationCap },
    { label: 'FIELD', value: profile.field || profile.title, icon: Cpu },
    { label: 'CURRENT STATUS', value: profile.status, icon: Activity },
  ].filter(block => Boolean(block.value));

  return (
    <section id="about" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">01 / ABOUT</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio & Current Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Engineering autonomous &amp; intelligent robotics hardware-software stacks.
            </h2>

            <div className="text-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans">
              {profile.description}
            </div>

            {profile.current_focus && (
              <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-accent/10 text-accent mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                    CURRENT FOCUS
                  </h4>
                  <p className="text-sm text-primary leading-normal">
                    {profile.current_focus}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Metadata Info Blocks & Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Metadata Info Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <div
                    key={block.label}
                    className="p-4 rounded-xl bg-surface border border-surface-border shadow-xs flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-2 text-muted">
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="text-[11px] font-mono tracking-wider">{block.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary truncate">
                      {block.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Interest Categorization Cards */}
            <div className="p-6 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-5">
              
              {profile.robotics_interests && profile.robotics_interests.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5 text-xs font-mono text-muted">
                    <Compass className="w-3.5 h-3.5 text-accent" />
                    <span>ROBOTICS &amp; AUTONOMOUS INTERESTS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.robotics_interests.map((item) => (
                      <Badge key={item} variant="tech">{item}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {profile.ai_interests && profile.ai_interests.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5 text-xs font-mono text-muted">
                    <Code className="w-3.5 h-3.5 text-brand-indigo" />
                    <span>AI &amp; COMPUTER VISION INTERESTS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.ai_interests.map((item) => (
                      <Badge key={item} variant="tech">{item}</Badge>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
