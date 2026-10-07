import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadResumeFile } from '../utils/downloadResume';
import { 
  Menu, 
  X, 
  Download, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    downloadResumeFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACTS', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#161b22]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Classic Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-heading text-2xl font-black tracking-wider text-white group-hover:text-[#35C2F8] transition-colors">
            MAGENDRAN
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#35C2F8]/20 text-[#35C2F8] font-bold border border-[#35C2F8]/40">
            MAHE
          </span>
        </a>

        {/* Desktop Nav Items matching original top-nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-xs font-heading font-bold uppercase tracking-wider text-gray-300 hover:text-[#35C2F8] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Download Resume & View */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleDownload}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded transition-all shadow-md ${
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#35C2F8] hover:bg-[#20a9df] text-white active:scale-95'
            }`}
            title="Download Official Resume Document"
          >
            {downloadSuccess ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{downloadSuccess ? 'Downloaded!' : 'Download Resume'}</span>
          </button>

          <button
            onClick={onOpenResume}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            title="View Resume in Modal"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-2.5 py-1.5 text-xs font-heading font-bold bg-[#35C2F8] text-white rounded"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#161b22] border-b border-gray-800 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-heading font-bold uppercase text-gray-200 hover:text-[#35C2F8]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownload();
              }}
              className="w-full py-2.5 bg-[#35C2F8] text-white font-heading font-bold uppercase text-xs rounded text-center flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
