import React, { useState, useMemo } from 'react';
import type { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Badge } from '../ui/Badge';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Extract unique categories dynamically from TOML data
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">02 / SELECTED WORK</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Engineering Case Studies &amp; Projects
            </h2>
            <p className="text-sm text-secondary mt-2 max-w-2xl font-sans leading-relaxed">
              Systems engineered across autonomous robotics, computer vision pipelines, and wearable human-machine interaction.
            </p>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? 'bg-zinc-900 text-stone-50 dark:bg-stone-100 dark:text-zinc-900 font-bold shadow-sm'
                      : 'bg-surface text-secondary hover:text-primary border border-surface-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id || project.title}
                project={project}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface border border-surface-border rounded-xl shadow-warm">
            <p className="text-muted font-mono text-sm">No projects matching selected filter category.</p>
          </div>
        )}

      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
