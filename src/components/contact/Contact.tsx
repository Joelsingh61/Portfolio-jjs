import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin } from 'lucide-react';
import type { Profile, SiteConfig } from '../../types';
import { Button } from '../ui/Button';

interface ContactProps {
  profile: Profile;
  site: SiteConfig;
}

export const Contact: React.FC<ContactProps> = ({ profile, site }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || site.contact_endpoint;
  const targetEmail = profile.social?.email || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // If an API endpoint is configured, POST JSON
    if (endpoint && endpoint.trim() !== '') {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error(`Server returned error status: ${res.status}`);
        }
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Failed to send message. Please try again or use direct email.');
      }
    } else {
      // Fallback: Open mailto link cleanly
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">07 / CONTACT</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Headline & Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight">
              Let&apos;s build something <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-500 to-teal-500">
                intelligent.
              </span>
            </h2>

            <p className="text-secondary text-sm leading-relaxed font-mono">
              Available for full-time robotics engineering roles, autonomous mobile robot software development, computer vision applications, and high-impact engineering projects.
            </p>

            <div className="flex flex-col gap-4 pt-4">
              {profile.university && (
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <div className="p-2.5 rounded-lg bg-surface border border-surface-border text-accent shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-muted">INSTITUTION</span>
                    <span className="font-semibold text-primary">{profile.university}</span>
                  </div>
                </div>
              )}

              {targetEmail && (
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <div className="p-2.5 rounded-lg bg-surface border border-surface-border text-accent shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-muted">EMAIL</span>
                    <a href={`mailto:${targetEmail}`} className="font-semibold text-accent hover:underline">
                      {targetEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-muted uppercase">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-muted uppercase">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-muted uppercase">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Robotics Software / Engineering Role"
                  className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-muted uppercase">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, project scope, or opportunity..."
                  className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Status Alert Messages */}
              {status === 'success' && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message prepared successfully. Thank you for connecting!</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage || 'Failed to submit message.'}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === 'loading'}
                icon={
                  status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )
                }
                className="w-full"
              >
                {status === 'loading' ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
