export interface ProfileSocial {
  github?: string;
  linkedin?: string;
  email?: string;
  location?: string;
}

export interface Profile {
  name: string;
  title: string;
  university: string;
  location?: string;
  field?: string;
  status?: string;
  tagline: string;
  description: string;
  robotics_interests?: string[];
  ai_interests?: string[];
  technical_interests?: string[];
  career_interests?: string[];
  current_focus?: string;
  social?: ProfileSocial;
}

export interface SiteConfig {
  title: string;
  description: string;
  resume: string;
  contact_endpoint?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: number | string;
  featured?: boolean;
  short_description: string;
  description?: string;
  problem?: string;
  solution?: string;
  contribution?: string;
  technologies?: string[];
  hardware?: string[];
  software?: string[];
  features?: string[];
  achievements?: string[];
  results?: string[];
  metrics?: ProjectMetric[];
  images?: string[];
  videos?: string[];
  github?: string;
  demo?: string;
  documentation?: string;
  patent?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category?: string;
  credential_id?: string;
  file?: string;
  verification?: string;
  skills?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  achievements?: string[];
  logo?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  issuer?: string;
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  status: string;
  start_year: string;
  expected_graduation: string;
  cgpa?: string;
  coursework?: string[];
  achievements?: string[];
}

export interface PortfolioData {
  profile: Profile;
  site: SiteConfig;
  projects: Project[];
  certificates: Certificate[];
  skills: SkillCategory[];
  experience: Experience[];
  achievements: Achievement[];
  education: Education[];
}
