import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const dirs = [
  path.join(root, 'public/resume'),
  path.join(root, 'public/certificates'),
  path.join(root, 'public/projects'),
  path.join(root, 'public/images'),
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// Helper to create a valid minimal PDF
function createMinimalPdf(title, subtitle) {
  const content = `BT
/F1 24 Tf
50 750 Td
(${title}) Tj
/F1 14 Tf
0 -40 Td
(${subtitle}) Tj
/F1 10 Tf
0 -30 Td
(Joel Jaba Singh J - Robotics & Automation Engineer) Tj
0 -20 Td
(Lovely Professional University) Tj
0 -30 Td
(Document Verified & Rendered by Portfolio Engine) Tj
ET`;

  const stream = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  
  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
${stream}
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000315 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${315 + stream.length + 10}
%%EOF`;

  return Buffer.from(pdf);
}

// 1. Resume PDF
fs.writeFileSync(
  path.join(root, 'public/resume/Joel-Jaba-Singh-Resume.pdf'),
  createMinimalPdf('JOEL JABA SINGH J', 'Curriculum Vitae — Robotics & Automation')
);

// 2. Oracle AI Certificate PDF
fs.writeFileSync(
  path.join(root, 'public/certificates/oracle-ai-database.pdf'),
  createMinimalPdf('ORACLE CERTIFICATION', 'Oracle AI Database Foundations Associate')
);

// 3. SVG Placeholders for Projects
function createSvgPlaceholder(title, subtitle, accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" fill="none">
    <rect width="1200" height="800" fill="#0c0d12"/>
    <rect width="1200" height="800" fill="url(#grid)" opacity="0.15"/>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="1"/>
      </pattern>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#0c0d12" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#glow)"/>
    <circle cx="600" cy="360" r="160" stroke="${accentColor}" stroke-width="2" opacity="0.4" stroke-dasharray="8 8"/>
    <circle cx="600" cy="360" r="80" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
    <text x="600" y="370" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="4">${title.toUpperCase()}</text>
    <text x="600" y="420" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#a1a1aa" text-anchor="middle">${subtitle}</text>
    <text x="600" y="740" font-family="monospace" font-size="12" fill="#52525b" text-anchor="middle">SYSTEM ARCHITECTURE // ROBOTICS &amp; AI LAB</text>
  </svg>`;
}

fs.writeFileSync(
  path.join(root, 'public/projects/amr-01.webp'),
  createSvgPlaceholder('AUTONOMOUS MOBILE ROBOT', 'ROS2 Navigation & Path Planning Stack', '#38bdf8')
);
fs.writeFileSync(
  path.join(root, 'public/projects/amr-02.webp'),
  createSvgPlaceholder('AMR TELEMETRY HUD', 'Real-time Lidar & Obstacle Avoidance', '#6366f1')
);
fs.writeFileSync(
  path.join(root, 'public/projects/mri-01.webp'),
  createSvgPlaceholder('MRI VISION PIPELINE', 'Computer Vision Preprocessing & ROI Analysis', '#34d399')
);
fs.writeFileSync(
  path.join(root, 'public/projects/glove-01.webp'),
  createSvgPlaceholder('SMART GLOVE HMI', 'Wearable Flex Sensor & IMU Teleoperation', '#f59e0b')
);

// Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="16" fill="#09090b"/>
  <rect x="2" y="2" width="60" height="60" rx="14" stroke="#27272a" stroke-width="2"/>
  <path d="M20 18H44M32 18V46M24 46H40" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="3" fill="#38bdf8"/>
</svg>`;
fs.writeFileSync(path.join(root, 'public/favicon.svg'), faviconSvg);

console.log('Public assets generated successfully.');
