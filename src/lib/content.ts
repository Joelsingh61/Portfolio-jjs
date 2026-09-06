import { parse } from 'smol-toml';
import type {
  PortfolioData,
  Profile,
  SiteConfig,
  Project,
  Certificate,
  SkillCategory,
  Experience,
  Achievement,
  Education
} from '../types';

// Import TOML files as raw strings
import profileRaw from '../data/profile.toml?raw';
import siteRaw from '../data/site.toml?raw';
import projectsRaw from '../data/projects.toml?raw';
import certificatesRaw from '../data/certificates.toml?raw';
import skillsRaw from '../data/skills.toml?raw';
import experienceRaw from '../data/experience.toml?raw';
import achievementsRaw from '../data/achievements.toml?raw';
import educationRaw from '../data/education.toml?raw';

function safeParse<T>(rawText: string, fallback: T): T {
  try {
    if (!rawText || !rawText.trim()) return fallback;
    const parsed = parse(rawText);
    return (parsed as unknown as T) || fallback;
  } catch (error) {
    console.error('Failed to parse TOML content:', error);
    return fallback;
  }
}

export function loadPortfolioData(): PortfolioData {
  const profileObj = safeParse<{ profile?: Profile }>(profileRaw, {});
  const profile: Profile = {
    name: profileObj.profile?.name || 'Joel Jaba Singh J',
    title: profileObj.profile?.title || 'Final Year Student – Robotics and Automation',
    university: profileObj.profile?.university || 'Lovely Professional University',
    location: profileObj.profile?.location || '',
    field: profileObj.profile?.field || '',
    status: profileObj.profile?.status || '',
    tagline: profileObj.profile?.tagline || 'Building intelligent systems for the physical world.',
    description: profileObj.profile?.description || '',
    robotics_interests: profileObj.profile?.robotics_interests || [],
    ai_interests: profileObj.profile?.ai_interests || [],
    technical_interests: profileObj.profile?.technical_interests || [],
    career_interests: profileObj.profile?.career_interests || [],
    current_focus: profileObj.profile?.current_focus || '',
    social: {
      github: profileObj.profile?.social?.github || '',
      linkedin: profileObj.profile?.social?.linkedin || '',
      email: profileObj.profile?.social?.email || '',
      location: profileObj.profile?.social?.location || ''
    }
  };

  const siteObj = safeParse<{ site?: SiteConfig }>(siteRaw, {});
  const site: SiteConfig = {
    title: siteObj.site?.title || 'Joel Jaba Singh J — Robotics & Automation',
    description: siteObj.site?.description || 'Portfolio of Joel Jaba Singh J',
    resume: siteObj.site?.resume || '/resume/Joel-Jaba-Singh-Resume.pdf',
    contact_endpoint: siteObj.site?.contact_endpoint || ''
  };

  const projectsObj = safeParse<{ projects?: Project[] }>(projectsRaw, { projects: [] });
  const projects: Project[] = (projectsObj.projects || []).map((p) => ({
    id: p.id || '',
    title: p.title || 'Untitled Project',
    category: p.category || 'Engineering',
    year: p.year || new Date().getFullYear(),
    featured: Boolean(p.featured),
    short_description: p.short_description || '',
    description: p.description || '',
    problem: p.problem || '',
    solution: p.solution || '',
    contribution: p.contribution || '',
    technologies: Array.isArray(p.technologies) ? p.technologies : [],
    hardware: Array.isArray(p.hardware) ? p.hardware : [],
    software: Array.isArray(p.software) ? p.software : [],
    features: Array.isArray(p.features) ? p.features : [],
    achievements: Array.isArray(p.achievements) ? p.achievements : [],
    results: Array.isArray(p.results) ? p.results : [],
    metrics: Array.isArray(p.metrics) ? p.metrics : [],
    images: Array.isArray(p.images) ? p.images : [],
    videos: Array.isArray(p.videos) ? p.videos : [],
    github: p.github || '',
    demo: p.demo || '',
    documentation: p.documentation || '',
    patent: p.patent || ''
  }));

  const certificatesObj = safeParse<{ certificates?: Certificate[] }>(certificatesRaw, { certificates: [] });
  const certificates: Certificate[] = (certificatesObj.certificates || []).map((c) => ({
    id: c.id || '',
    name: c.name || '',
    issuer: c.issuer || '',
    date: c.date || '',
    category: c.category || '',
    credential_id: c.credential_id || '',
    file: c.file || '',
    verification: c.verification || '',
    skills: Array.isArray(c.skills) ? c.skills : []
  }));

  const skillsObj = safeParse<{ skills?: SkillCategory[] }>(skillsRaw, { skills: [] });
  const skills: SkillCategory[] = (skillsObj.skills || []).map((s) => ({
    category: s.category || 'General',
    items: Array.isArray(s.items) ? s.items : []
  }));

  const expObj = safeParse<{ experience?: Experience[] }>(experienceRaw, { experience: [] });
  const experience: Experience[] = (expObj.experience || []).map((e) => ({
    id: e.id || e.company,
    company: e.company || '',
    role: e.role || '',
    start_date: e.start_date || '',
    end_date: e.end_date || '',
    description: e.description || '',
    responsibilities: Array.isArray(e.responsibilities) ? e.responsibilities : [],
    technologies: Array.isArray(e.technologies) ? e.technologies : [],
    achievements: Array.isArray(e.achievements) ? e.achievements : [],
    logo: e.logo || ''
  }));

  const achObj = safeParse<{ achievements?: Achievement[] }>(achievementsRaw, { achievements: [] });
  const achievements: Achievement[] = (achObj.achievements || []).map((a) => ({
    id: a.id || a.title,
    title: a.title || '',
    category: a.category || 'Achievement',
    date: a.date || '',
    description: a.description || '',
    issuer: a.issuer || '',
    link: a.link || ''
  }));

  const eduObj = safeParse<{ education?: Education[] }>(educationRaw, { education: [] });
  const education: Education[] = (eduObj.education || []).map((ed) => ({
    institution: ed.institution || '',
    degree: ed.degree || '',
    status: ed.status || '',
    start_year: ed.start_year || '',
    expected_graduation: ed.expected_graduation || '',
    cgpa: ed.cgpa || '',
    coursework: Array.isArray(ed.coursework) ? ed.coursework : [],
    achievements: Array.isArray(ed.achievements) ? ed.achievements : []
  }));

  return {
    profile,
    site,
    projects,
    certificates,
    skills,
    experience,
    achievements,
    education
  };
}
