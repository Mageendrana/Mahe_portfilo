/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { TimelineSection } from './components/TimelineSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CadSimulator } from './components/CadSimulator';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { InteractiveResumeModal } from './components/InteractiveResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col font-sans selection:bg-[#35C2F8] selection:text-white">
      {/* Original mrmahe.com Top Navigation */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Sections following the exact mrmahe.com flow with updated content */}
      <main className="flex-1">
        {/* 1. Banner / Hero (#home) with Download Resume Button */}
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* 2. Skills (#services / #skills) */}
        <SkillsSection />

        {/* 3. About & Journey Timeline (#about) */}
        <TimelineSection />

        {/* 4. Projects (#team / #projects) */}
        <ProjectsSection />

        {/* Interactive CAD Automation Simulator */}
        <CadSimulator />

        {/* 5. Professional Experience (#experience) */}
        <ExperienceSection />

        {/* 6. Contact & Footer (#contact) */}
        <ContactSection />
      </main>

      {/* Full Resume Document Modal */}
      <InteractiveResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </div>
  );
}
