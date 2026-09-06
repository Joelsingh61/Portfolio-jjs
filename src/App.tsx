import React, { useState, useEffect } from 'react';
import { loadPortfolioData } from './lib/content';
import { useTheme } from './lib/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { ProjectGrid } from './components/projects/ProjectGrid';
import { Skills } from './components/skills/Skills';
import { Experience } from './components/experience/Experience';
import { Certificates } from './components/certificates/Certificates';
import { Achievements } from './components/achievements/Achievements';
import { Education } from './components/education/Education';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/layout/Footer';
import { ResumeViewer } from './components/resume/ResumeViewer';

export function App() {
  const [data, setData] = useState(loadPortfolioData());
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Set page meta title and description dynamically from TOML data
  useEffect(() => {
    if (data.site.title) {
      document.title = data.site.title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.site.description) {
      metaDesc.setAttribute('content', data.site.description);
    }
  }, [data.site]);

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col font-sans relative selection:bg-accent/20 selection:text-accent transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero profile={data.profile} onOpenResume={() => setIsResumeOpen(true)} />
        <About profile={data.profile} />
        <ProjectGrid projects={data.projects} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Certificates certificates={data.certificates} />
        <Achievements achievements={data.achievements} />
        <Education education={data.education} />
        <Contact profile={data.profile} site={data.site} />
      </main>

      {/* Footer */}
      <Footer profile={data.profile} />

      {/* Fullscreen Resume PDF Viewer */}
      <ResumeViewer
        resumeUrl={data.site.resume}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
