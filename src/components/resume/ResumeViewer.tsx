import React from 'react';
import { CertificateViewer } from '../certificates/CertificateViewer';

interface ResumeViewerProps {
  resumeUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  resumeUrl,
  isOpen,
  onClose,
}) => {
  return (
    <CertificateViewer
      fileUrl={resumeUrl}
      title="Joel Jaba Singh J — Official Curriculum Vitae / Resume"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
