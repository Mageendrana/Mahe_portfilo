import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Code2, 
  Server, 
  BrainCircuit, 
  Layers, 
  Palette,
  CheckCircle2
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const skillIcons = [
    <Code2 className="w-8 h-8 text-[#35C2F8]" />,
    <Server className="w-8 h-8 text-[#35C2F8]" />,
    <BrainCircuit className="w-8 h-8 text-[#35C2F8]" />,
    <Layers className="w-8 h-8 text-[#35C2F8]" />,
    <Palette className="w-8 h-8 text-[#35C2F8]" />,
  ];

  return (
    <section id="skills" className="py-24 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Service / Skills Head matching original mrmahe.com */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#222222] tracking-wider">
            SKILLS
          </h2>
          <span className="cyan-divider" />
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base font-sans mt-3">
            Core technical competencies across frontend interfaces, backend systems, AI/ML algorithms, CAD automation engines, and creative software.
          </p>
        </div>

        {/* 5 Distinct Skill Cards in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {PORTFOLIO_DATA.skills.map((category, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#FAFAFA] hover:bg-white rounded-xl border border-gray-200 hover:border-[#35C2F8] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Circular Icon Holder */}
                <div className="w-16 h-16 rounded-full bg-white shadow-md border border-gray-200 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:border-[#35C2F8] transition-all">
                  {skillIcons[idx] || <Code2 className="w-8 h-8 text-[#35C2F8]" />}
                </div>

                {/* Uppercase Category Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-[#222222] mb-3 group-hover:text-[#35C2F8] transition-colors">
                  {category.title}
                </h3>

                <p className="text-xs text-gray-500 mb-6 font-sans">
                  {category.description}
                </p>

                {/* Skills Bullet List */}
                <div className="space-y-2.5 text-left border-t border-gray-200/80 pt-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-start justify-between text-xs">
                      <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#35C2F8]"></span>
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-[11px]">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 text-center">
                <span className="text-[11px] font-mono text-gray-400">
                  {category.skills.length} skills mastered
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
