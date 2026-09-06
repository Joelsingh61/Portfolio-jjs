import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'emerald' | 'outline' | 'tech';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
  icon,
}) => {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono tracking-wider transition-colors';
  
  const variants = {
    default: 'bg-surface-muted text-secondary border border-surface-border',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    outline: 'border border-surface-border text-muted',
    tech: 'bg-surface text-secondary border border-surface-border hover:border-accent/40 font-sans shadow-xs',
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {icon && <span className="mr-1.5 inline-flex items-center">{icon}</span>}
      {children}
    </span>
  );
};
