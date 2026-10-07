import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Calendar, 
  Award, 
  Building2, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';

export const TimelineSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F7F7F7] text-gray-800 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Head matching original mrmahe.com */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#222222] tracking-wider">
            ABOUT ME
          </h2>
          <span className="cyan-divider" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base font-sans mt-3">
            Academic timeline and engineering milestones from secondary education to enterprise CAD software engineering.
          </p>
        </div>

        {/* Central Alternating Timeline */}
        <div className="relative timeline-center-line space-y-12">
          {PORTFOLIO_DATA.timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card (Left or Right) */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'} pl-12 md:pl-0`}>
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 hover:border-[#35C2F8] hover:shadow-lg transition-all duration-300">
                    
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-heading text-lg sm:text-xl font-bold text-[#222222]">
                        {item.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#35C2F8]/15 text-[#0091c8] border border-[#35C2F8]/30">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-gray-800 mb-1">
                      {item.title}
                    </h3>

                    <div className="text-xs font-semibold text-[#0091c8] mb-3 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.subtitle}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Node Badge */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-[#35C2F8] shadow-md flex items-center justify-center text-[#35C2F8] z-10">
                  {item.type === 'career' ? (
                    <Briefcase className="w-4 h-4" />
                  ) : item.type === 'internship' ? (
                    <Award className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
