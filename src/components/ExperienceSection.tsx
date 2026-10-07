import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mrmahe.com */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#222222] tracking-wider">
            EXPERIENCE
          </h2>
          <span className="cyan-divider" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base font-sans mt-3">
            Industry work history at Coherent Automation & Technology and research internship at CDAC Chennai.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experiences.map((exp) => (
            <div 
              key={exp.id}
              className="bg-[#FAFAFA] rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-md hover:shadow-lg transition-all relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#35C2F8]" />

              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#35C2F8]/15 text-[#0091c8] border border-[#35C2F8]/30">
                      {exp.status}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">·</span>
                    <span className="text-xs text-gray-500 font-mono">{exp.location}</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#222222]">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#0091c8] font-bold mt-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-700 bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-[#35C2F8]" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-5 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                {exp.summary}
              </p>

              {/* Responsibilities & Achievements */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-heading text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#35C2F8]" />
                    Core Engineering Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600 font-sans">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#35C2F8] shrink-0 mt-0.5" />
                        <span className="leading-snug">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between">
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <h4 className="font-heading text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Impact & Milestones
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((ach, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-700 leading-relaxed font-sans font-medium">
                              {ach}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="text-[11px] font-mono text-gray-400 mb-2">Technologies Used:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 bg-white text-gray-700 border border-gray-200 rounded text-xs font-mono font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
