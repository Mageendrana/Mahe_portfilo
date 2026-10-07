import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadResumeFile } from '../utils/downloadResume';
import { Download, CheckCircle2, ArrowDown, FileText } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    downloadResumeFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#12161c] text-white overflow-hidden text-center">
      
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 cad-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#35C2F8]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Title matching mrmahe.com */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white mb-2">
          I'M MAGENDRAN
        </h1>

        {/* The Signature Cyan Line from original repo */}
        <span className="cyan-divider" />

        {/* The Signature Subtitle from original repo updated with skills */}
        <p className="text-lg sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-6 tracking-wide">
          Web Developer || AI/ML Engineer || CAD Automation Specialist
        </p>

        {/* Short Bio summary */}
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
          Software Engineer with 2 years of experience at <strong>Coherent Automation & Technology</strong>, 
          specializing in C#, .NET, VectorDraw CAD data processing, computer vision, and modern web applications.
        </p>

        {/* Buttons: Prominent User Requested DOWNLOAD RESUME Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          <button
            onClick={handleDownload}
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-md transition-all shadow-xl ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#35C2F8] hover:bg-[#20a9df] text-white shadow-[#35C2F8]/20 active:scale-95'
            }`}
          >
            {downloadSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-white" />
            ) : (
              <Download className="w-4 h-4 text-white" />
            )}
            <span>{downloadSuccess ? 'Resume Downloaded!' : 'Download Resume'}</span>
          </button>

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-md bg-transparent hover:bg-white/10 text-white border-2 border-white/80 transition-colors"
          >
            <span>View Projects</span>
          </a>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-md bg-gray-800/80 hover:bg-gray-800 text-gray-200 border border-gray-700 transition-colors"
          >
            <FileText className="w-4 h-4 text-[#35C2F8]" />
            <span>Preview Resume</span>
          </button>

        </div>

        {/* Quick Highlights Row */}
        <div className="mt-16 pt-8 border-t border-gray-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-[#35C2F8]">2+ Yrs</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">C# & .NET Exp</div>
          </div>
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white">82.1%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">B.E. Comp Science</div>
          </div>
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white">87.0%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Diploma Honors</div>
          </div>
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-[#35C2F8]">CDAC</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Chennai Intern</div>
          </div>
        </div>

      </div>

      {/* Down Arrow link */}
      <a 
        href="#skills" 
        className="inline-block mt-10 text-gray-400 hover:text-[#35C2F8] animate-bounce transition-colors"
        aria-label="Scroll to Skills"
      >
        <ArrowDown className="w-6 h-6 mx-auto" />
      </a>

    </section>
  );
};
