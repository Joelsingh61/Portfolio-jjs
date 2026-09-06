import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink } from 'lucide-react';
import type { Achievement } from '../../types';
import { Badge } from '../ui/Badge';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">06 / ACHIEVEMENTS</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Honors, Awards &amp; Recognized Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col justify-between gap-4 hover:border-accent/40 transition-colors"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    <Badge variant="accent">{ach.category}</Badge>
                  </div>
                  {ach.date && (
                    <span className="text-xs font-mono text-muted">{ach.date}</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-primary">{ach.title}</h3>
                {ach.issuer && (
                  <span className="text-xs font-mono text-secondary">Issued by {ach.issuer}</span>
                )}
                <p className="text-sm text-secondary leading-relaxed">{ach.description}</p>
              </div>

              {ach.link && (
                <a
                  href={ach.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-accent hover:underline flex items-center gap-1 w-fit"
                >
                  View Details <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
