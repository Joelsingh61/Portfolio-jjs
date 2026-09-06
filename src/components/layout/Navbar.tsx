import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Cpu, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Theme } from '../../lib/useTheme';

interface NavbarProps {
  onOpenResume: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CERTIFICATES', href: '#certificates' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-surface-border py-3 shadow-warm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Branding */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-accent group-hover:border-accent transition-colors shadow-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-primary group-hover:text-accent transition-colors">
            JOEL SINGH
          </span>
        </a>

        {/* Right: Desktop Links & Theme Toggle */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono tracking-widest text-secondary hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-secondary hover:text-primary bg-surface/80 hover:bg-surface-hover border border-surface-border transition-all flex items-center gap-2"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Warm Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenResume}
            icon={<FileText className="w-3.5 h-3.5" />}
          >
            VIEW RESUME
          </Button>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center md:hidden gap-2">
          {/* Theme Switcher Button Mobile */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-secondary hover:text-primary bg-surface/80 border border-surface-border transition-all"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenResume}
            className="text-xs py-1 px-2.5"
          >
            RESUME
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-hover transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 border-b border-surface-border backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono tracking-wider text-secondary hover:text-accent transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-surface-border flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  icon={<FileText className="w-4 h-4" />}
                  className="w-full"
                >
                  VIEW RESUME
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
