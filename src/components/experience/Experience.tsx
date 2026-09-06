import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building } from 'lucide-react';
import type { Experience as ExperienceType } from '../../types';
import { Badge } from '../ui/Badge';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">04 / EXPERIENCE</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Professional Experience &amp; Positions
          </h2>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l border-surface-border flex flex-col gap-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col gap-4"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-neon-green" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-sm text-secondary font-mono">
                    <Building className="w-4 h-4 text-accent" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-secondary bg-surface-muted px-3 py-1 rounded-lg border border-surface-border w-fit">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>{exp.start_date} — {exp.end_date}</span>
                </div>
              </div>

              {exp.description && (
                <p className="text-sm text-secondary leading-relaxed max-w-3xl">
                  {exp.description}
                </p>
              )}

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="flex flex-col gap-2 text-xs text-secondary list-disc list-inside max-w-3xl">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="tech">{tech}</Badge>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
