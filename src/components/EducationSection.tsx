import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Academic Track Record
          </h2>
          <p className="mt-2 text-slate-400 text-base">
            Consistent academic excellence in computer science and engineering across undergraduate and polytechnic studies.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Score Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                <Award className="w-4 h-4" />
                <span>{edu.score}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {edu.period}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {edu.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 pr-20">
                  {edu.degree}
                </h3>

                <div className="text-sm font-medium text-indigo-300 mb-4">
                  {edu.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
                  {edu.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Distinction: {edu.scoreType}</span>
                <span className="text-emerald-400 font-bold">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
