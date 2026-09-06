import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Loader2
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker src safely from Cloudflare CDN matching installed pdfjs version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface CertificateViewerProps {
  fileUrl: string | null;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  fileUrl,
  title,
  isOpen,
  onClose,
}) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Esc key shortcut & scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Load PDF Document when fileUrl changes
  useEffect(() => {
    if (!isOpen || !fileUrl) return;

    setLoading(true);
    setPageNumber(1);
    setScale(1.2);
    setUseIframeFallback(false);

    const loadingTask = pdfjsLib.getDocument(fileUrl);
    loadingTask.promise
      .then((pdf) => {
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('PDF.js canvas rendering fallback enabled:', err);
        setUseIframeFallback(true);
        setLoading(false);
      });
  }, [fileUrl, isOpen]);

  // Render current page onto canvas
  useEffect(() => {
    if (!pdfDoc || useIframeFallback || !canvasRef.current) return;

    let isCancelled = false;

    pdfDoc.getPage(pageNumber).then((page) => {
      if (isCancelled) return;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      page.render(renderContext).promise.catch(() => {});
    });

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, pageNumber, scale, useIframeFallback]);

  if (!isOpen || !fileUrl) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-900/70 dark:bg-black/90 backdrop-blur-md">
        
        {/* Main Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl h-[92vh] bg-surface border border-surface-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="px-4 py-3 bg-surface-muted border-b border-surface-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-primary truncate max-w-xs sm:max-w-md">
                {title}
              </h3>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Pagination */}
              {numPages > 1 && !useIframeFallback && (
                <div className="flex items-center gap-1.5 bg-surface px-2 py-1 rounded border border-surface-border text-xs font-mono text-secondary">
                  <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    className="p-0.5 hover:text-primary disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span>{pageNumber} / {numPages}</span>
                  <button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                    className="p-0.5 hover:text-primary disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Zoom Controls */}
              {!useIframeFallback && (
                <div className="flex items-center gap-1 bg-surface px-2 py-1 rounded border border-surface-border text-xs font-mono text-secondary">
                  <button
                    onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
                    className="p-1 hover:text-primary"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setScale(1.2)}
                    className="p-1 hover:text-primary"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
                    className="p-1 hover:text-primary"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Direct Download Button */}
              <a
                href={fileUrl}
                download
                className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-stone-950 transition-colors text-xs font-mono flex items-center gap-1.5"
                title="Download Certificate PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">DOWNLOAD</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted hover:text-primary hover:bg-surface-hover transition-colors"
                aria-label="Close PDF Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Content Area */}
          <div className="flex-1 overflow-auto bg-background p-4 flex items-center justify-center relative">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 gap-3 z-20">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
                <span className="text-xs font-mono text-secondary">Loading Certificate PDF...</span>
              </div>
            )}

            {useIframeFallback ? (
              <iframe
                src={fileUrl}
                className="w-full h-full rounded border-0"
                title={title}
              />
            ) : (
              <div className="my-auto shadow-2xl rounded overflow-hidden border border-surface-border">
                <canvas ref={canvasRef} />
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
