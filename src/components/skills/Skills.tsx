import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Eye, Database, Wrench } from 'lucide-react';
import type { SkillCategory } from '../../types';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('program')) return Code;
    if (cat.includes('robot')) return Cpu;
    if (cat.includes('vision') || cat.includes('ai')) return Eye;
    if (cat.includes('database') || cat.includes('sql')) return Database;
    return Wrench;
  };

  return (
    <section id="skills" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">03 / SKILLS</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Technical Competencies &amp; Toolkit
          </h2>
          <p className="text-sm text-secondary font-mono">
            Core technologies, programming languages, robotics software stacks, and engineering tools.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, idx) => {
            const Icon = getCategoryIcon(skillGroup.category);
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-5 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-surface-muted border border-surface-border text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary tracking-wide font-mono">
                    {skillGroup.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-surface-muted border border-surface-border text-xs font-mono text-secondary hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
