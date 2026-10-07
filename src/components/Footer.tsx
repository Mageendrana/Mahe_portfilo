import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Github, Globe, Mail, Phone, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="text-white font-bold text-sm tracking-tight mb-1">
              MAGENDRAN P
            </div>
            <p className="text-slate-400 text-xs max-w-md">
              Software Engineer specializing in C#, .NET Framework, Windows Forms, VectorDraw CAD automation, and Geometric Algorithms.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} Magendran P · Built with React & Tailwind CSS
          </div>

          <div className="flex items-center gap-4">
            <a href="#cad-simulator" className="hover:text-slate-200 transition-colors">CAD Simulator</a>
            <span>·</span>
            <a href="#experience" className="hover:text-slate-200 transition-colors">Experience</a>
            <span>·</span>
            <a href="#projects" className="hover:text-slate-200 transition-colors">Projects</a>
            <span>·</span>
            <a href="#skills" className="hover:text-slate-200 transition-colors">Skills</a>
            <span>·</span>
            <a href="#contact" className="hover:text-slate-200 transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
