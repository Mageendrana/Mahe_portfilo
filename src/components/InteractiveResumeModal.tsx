import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadResumeFile } from '../utils/downloadResume';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText,
  CheckCircle2
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadResumeFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopyText = () => {
    const resumeText = `
MAGENDRAN P
Email: ${PORTFOLIO_DATA.personal.email} / ${PORTFOLIO_DATA.personal.secondaryEmail}
Phone: ${PORTFOLIO_DATA.personal.phone}
Location: ${PORTFOLIO_DATA.personal.location}
Website: ${PORTFOLIO_DATA.personal.website}
GitHub: ${PORTFOLIO_DATA.personal.github}

PROFILE
${PORTFOLIO_DATA.personal.bio}

PROFESSIONAL EXPERIENCE & INTERNSHIPS
${PORTFOLIO_DATA.experiences.map(exp => `
${exp.period} | ${exp.location}
${exp.role} - ${exp.company}
${exp.summary}
${exp.responsibilities.map(r => `• ${r}`).join('\n')}
`).join('\n')}

PROJECTS
${PORTFOLIO_DATA.projects.map(p => `
${p.period} ${p.title} (${p.type})
${p.description}
${p.keyHighlights.map(h => `• ${h}`).join('\n')}
Technologies: ${p.technologies.join(', ')}
`).join('\n')}

SKILLS
${PORTFOLIO_DATA.skills.map(cat => `• ${cat.title}: ${cat.skills.map(s => s.name).join(', ')}`).join('\n')}

EDUCATION
${PORTFOLIO_DATA.education.map(e => `${e.period} - ${e.degree} (${e.score})\n${e.institution}, ${e.location}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Resume Document · Magendran P
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
              }`}
              title="Download formatted file"
            >
              {downloadSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Download Resume'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors hidden sm:inline-flex"
              title="Copy plain text summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-900 text-slate-200 font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Header Block */}
          <div className="border-b border-slate-800 print:border-slate-300 pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight mb-1">
              MAGENDRAN P
            </h1>
            <div className="text-indigo-400 print:text-indigo-700 font-semibold text-sm mb-3 font-mono">
              {PORTFOLIO_DATA.personal.tagline}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 print:text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 print:text-black" />
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline">
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 print:text-black" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 print:text-black" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400 print:text-black" />
                <a href={PORTFOLIO_DATA.personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                  {PORTFOLIO_DATA.personal.website}
                </a>
              </div>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-indigo-400 print:text-black uppercase tracking-wider font-mono mb-2 pb-1 border-b border-slate-800 print:border-slate-300">
              Profile Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              {PORTFOLIO_DATA.personal.bio}
            </p>
          </div>

          {/* Professional Experience & Internships */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-indigo-400 print:text-black uppercase tracking-wider font-mono mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
              Professional Experience & Internships
            </h2>
            {PORTFOLIO_DATA.experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono mb-1">
                  <div className="font-bold text-white print:text-black text-sm">
                    {exp.role} · <span className="font-normal text-slate-300 print:text-slate-800">{exp.company}</span>
                  </div>
                  <div className="text-slate-400 print:text-slate-600">
                    {exp.period} | {exp.location}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 print:text-slate-800 mt-2">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="leading-relaxed">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-indigo-400 print:text-black uppercase tracking-wider font-mono mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
              Technical Skills & Toolchain
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 print:bg-transparent p-2.5 rounded border border-slate-800 print:border-none">
                <div className="font-bold text-white print:text-black mb-1">Frontend Skills:</div>
                <div className="text-slate-300 print:text-slate-700">HTML, CSS, JavaScript, Bootstrap Framework, React, Tailwind CSS</div>
              </div>
              <div className="bg-slate-950/60 print:bg-transparent p-2.5 rounded border border-slate-800 print:border-none">
                <div className="font-bold text-white print:text-black mb-1">Backend & Systems:</div>
                <div className="text-slate-300 print:text-slate-700">C#, .NET Framework, ASP.NET MVC, C, Java, Python, SQL (MySQL, SQL Server), WinForms</div>
              </div>
              <div className="bg-slate-950/60 print:bg-transparent p-2.5 rounded border border-slate-800 print:border-none">
                <div className="font-bold text-white print:text-black mb-1">Specialized CAD & Geometry:</div>
                <div className="text-slate-300 print:text-slate-700">CAD Data Processing, VectorDraw Engine, Data Extraction & Classification, Geometric Algorithm Development, Pattern & Symbol Detection</div>
              </div>
              <div className="bg-slate-950/60 print:bg-transparent p-2.5 rounded border border-slate-800 print:border-none">
                <div className="font-bold text-white print:text-black mb-1">AI / ML & Softwares:</div>
                <div className="text-slate-300 print:text-slate-700">OpenCV, Facial Recognition, Deep Learning (CNNs), Adobe Photoshop, Adobe Illustrator, Audacity, Git</div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-indigo-400 print:text-black uppercase tracking-wider font-mono mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
              Featured Projects
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono mb-1">
                    <div className="font-bold text-white print:text-black text-xs sm:text-sm">
                      {proj.title}
                    </div>
                    <div className="text-slate-400 print:text-slate-600">
                      {proj.period}
                    </div>
                  </div>
                  <div className="text-[11px] text-indigo-400 print:text-slate-600 mb-1 font-mono">
                    {proj.type} · Category: {proj.category}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 print:text-slate-800">
                    {proj.keyHighlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-slate-400 print:text-slate-600 font-mono mt-1">
                    Tech: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold text-indigo-400 print:text-black uppercase tracking-wider font-mono mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
              Education & Academic Track Record
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white print:text-black">
                      {edu.degree}, <span className="text-emerald-400 print:text-black">{edu.score}</span>
                    </div>
                    <div className="text-slate-400 print:text-slate-600 font-mono">
                      {edu.institution}, {edu.location}
                    </div>
                  </div>
                  <div className="text-slate-400 print:text-slate-600 font-mono mt-1 sm:mt-0">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
