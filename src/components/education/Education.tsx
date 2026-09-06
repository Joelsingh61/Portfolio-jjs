import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';
import type { Education as EducationType } from '../../types';
import { Badge } from '../ui/Badge';

interface EducationProps {
  education: EducationType[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">ACADEMIC FOUNDATION</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Education &amp; Academic Training
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-accent uppercase tracking-wider block">
                      {edu.status}
                    </span>
                    <h3 className="text-2xl font-bold text-primary">{edu.degree}</h3>
                    <p className="text-base text-secondary font-mono mt-0.5">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-secondary bg-surface-muted px-3 py-1.5 rounded-lg border border-surface-border">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{edu.start_year} — {edu.expected_graduation}</span>
                  </div>

                  {edu.cgpa && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>CGPA: {edu.cgpa}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coursework Pills */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="flex flex-col gap-3 pt-4 border-t border-surface-border/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>KEY RELEVANT COURSEWORK</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <Badge key={course} variant="tech">{course}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
