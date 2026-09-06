import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu } from 'lucide-react';
import type { Project } from '../../types';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const mainImage = project.images && project.images.length > 0 ? project.images[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-surface border border-surface-border rounded-xl overflow-hidden flex flex-col hover:border-accent/40 transition-all duration-300 shadow-warm hover:shadow-warm-hover cursor-pointer"
      onClick={() => onSelect(project)}
    >
      {/* Top Image Preview Banner */}
      <div className="relative w-full h-52 bg-surface-muted overflow-hidden border-b border-surface-border">
        {mainImage ? (
          <img
            src={mainImage}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface-muted text-muted gap-2">
            <Cpu className="w-10 h-10 stroke-1 text-accent" />
            <span className="text-xs font-mono">SYSTEM SPECIFICATION</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

        {/* Category & Year Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="accent">{project.category}</Badge>
          <span className="text-xs font-mono text-primary bg-surface/90 px-2 py-0.5 rounded backdrop-blur-sm border border-surface-border shadow-xs">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
              {project.title}
            </h3>
            <div className="p-1 rounded bg-surface-muted text-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
            {project.short_description}
          </p>
        </div>

        {/* Dynamic Optional Metrics Preview (If present) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-surface-border/60 bg-surface-muted/60 p-2.5 rounded-lg">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-mono text-muted uppercase truncate">{m.label}</span>
                <span className="text-xs font-mono font-bold text-accent">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-secondary bg-surface-muted px-2 py-0.5 rounded border border-surface-border"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-mono text-muted bg-surface-muted px-1.5 py-0.5 rounded border border-surface-border">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
