import React, { useState } from 'react';
import {
  Github,
  ExternalLink,
  FileText,
  Award,
  Cpu,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  UserCheck,
  Maximize2
} from 'lucide-react';
import type { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!project) return null;

  const images = project.images || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="5xl"
      title={
        <div className="flex items-center gap-3">
          <Badge variant="accent">{project.category}</Badge>
          <span className="text-xs font-mono text-muted">Year: {project.year}</span>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        
        {/* Header Title & Short Summary */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">
            {project.title}
          </h2>
          <p className="text-base text-secondary leading-relaxed font-sans">
            {project.short_description}
          </p>

          {/* External Action Links (Only rendered if URL exists) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" icon={<Github className="w-4 h-4" />}>
                  GitHub Repository
                </Button>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  Live Demo
                </Button>
              </a>
            )}
            {project.documentation && (
              <a href={project.documentation} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={<FileText className="w-4 h-4" />}>
                  Documentation
                </Button>
              </a>
            )}
            {project.patent && (
              <a href={project.patent} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" icon={<Award className="w-4 h-4" />}>
                  Patent Reference
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Engineering Metrics Grid (Statistics Layout - If metrics present) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider">
              ENGINEERING PERFORMANCE METRICS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-muted border border-surface-border flex flex-col justify-between gap-1 shadow-xs"
                >
                  <span className="text-xs font-mono text-muted uppercase">{m.label}</span>
                  <span className="text-2xl font-mono font-bold text-accent">{m.value}</span>
                  {m.description && (
                    <span className="text-xs text-muted">{m.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Image Gallery */}
        {images.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider">
              SYSTEM &amp; ARCHITECTURE GALLERY
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-surface-border bg-surface-muted h-56 cursor-pointer shadow-xs"
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`${project.title} media ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-full bg-black/70 text-white border border-stone-700">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Breakdown: Problem, Solution, Contribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.problem && (
            <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs uppercase">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase">
                <Lightbulb className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">{project.solution}</p>
            </div>
          )}

          {project.contribution && (
            <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase">
                <UserCheck className="w-4 h-4" />
                <span>My Contribution</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">{project.contribution}</p>
            </div>
          )}
        </div>

        {/* Full Detailed Overview Description */}
        {project.description && (
          <div className="flex flex-col gap-2 p-6 rounded-xl bg-surface border border-surface-border shadow-warm">
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider">
              PROJECT OVERVIEW &amp; TECHNICAL DEEP DIVE
            </h4>
            <p className="text-primary text-sm leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}

        {/* Hardware vs Software Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.hardware && project.hardware.length > 0 && (
            <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs uppercase">
                <Cpu className="w-4 h-4" />
                <span>Hardware Components</span>
              </div>
              <ul className="flex flex-col gap-2">
                {project.hardware.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.software && project.software.length > 0 && (
            <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-xs uppercase">
                <Terminal className="w-4 h-4" />
                <span>Software &amp; Stack</span>
              </div>
              <ul className="flex flex-col gap-2">
                {project.software.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider">
              KEY ARCHITECTURAL FEATURES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements & Results */}
        {((project.achievements && project.achievements.length > 0) ||
          (project.results && project.results.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.achievements && project.achievements.length > 0 && (
              <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider">
                  ACHIEVEMENTS
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-secondary list-disc list-inside">
                  {project.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div className="p-5 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-3">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider">
                  MEASURED RESULTS
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-secondary list-disc list-inside">
                  {project.results.map((res, idx) => (
                    <li key={idx}>{res}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Lightbox Overlay for Image Viewing */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-stone-900/90 dark:bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 text-stone-200 hover:text-white text-sm font-mono bg-stone-800/60 px-3 py-1 rounded"
          >
            [CLOSE]
          </button>
          <img
            src={images[selectedImageIndex]}
            alt="Full size media"
            className="max-w-full max-h-[85vh] object-contain rounded-lg border border-surface-border"
          />
        </div>
      )}
    </Modal>
  );
};
