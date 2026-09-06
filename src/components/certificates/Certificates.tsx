import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText } from 'lucide-react';
import type { Certificate } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CertificateViewer } from './CertificateViewer';

interface CertificatesProps {
  certificates: Certificate[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">05 / CERTIFICATIONS</span>
          <div className="h-px bg-surface-border flex-1" />
        </div>

        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Verified Certifications &amp; Credentials
          </h2>
          <p className="text-sm text-secondary font-mono">
            Professional engineering and artificial intelligence certifications.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-xl bg-surface border border-surface-border shadow-warm flex flex-col justify-between gap-6 hover:border-accent/40 transition-all hover:shadow-warm-hover"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-muted block">{cert.issuer}</span>
                      <h3 className="text-lg font-bold text-primary leading-snug">{cert.name}</h3>
                    </div>
                  </div>

                  {cert.date && (
                    <span className="text-xs font-mono text-secondary bg-surface-muted px-2.5 py-1 rounded border border-surface-border shrink-0">
                      {cert.date}
                    </span>
                  )}
                </div>

                {/* Optional Credential ID */}
                {cert.credential_id && (
                  <div className="text-xs font-mono text-secondary bg-surface-muted p-2.5 rounded border border-surface-border">
                    Credential ID: <span className="text-primary font-semibold">{cert.credential_id}</span>
                  </div>
                )}

                {/* Skills Associated */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="tech">{skill}</Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* View Certificate Action */}
              {cert.file && (
                <div className="pt-4 border-t border-surface-border/60">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveCert(cert)}
                    icon={<FileText className="w-4 h-4 text-accent" />}
                    className="w-full"
                  >
                    VIEW CERTIFICATE
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Certificate Viewer */}
      <CertificateViewer
        fileUrl={activeCert?.file || null}
        title={activeCert?.name || 'Certificate'}
        isOpen={Boolean(activeCert)}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
};
