import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide shadow-sm';
  
  const variants = {
    primary: 'bg-zinc-900 text-stone-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white hover:shadow-warm active:scale-[0.98]',
    secondary: 'bg-surface-muted text-primary hover:bg-surface-hover border border-surface-border active:scale-[0.98]',
    outline: 'border border-surface-border text-secondary hover:border-accent hover:text-accent bg-surface/50 active:scale-[0.98]',
    ghost: 'text-muted hover:text-primary hover:bg-surface-hover/80',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
