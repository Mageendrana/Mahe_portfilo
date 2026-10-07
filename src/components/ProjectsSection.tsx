import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  Maximize2,
  HandMetal,
  Camera,
  Database,
  Music
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project>(PORTFOLIO_DATA.projects[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Mini-simulation states
  const [simSign, setSimSign] = useState<string>('Hello');
  const [faceLog, setFaceLog] = useState<string>('Face ID: Magendran P (98.7% Verified)');
  const [emotionState, setEmotionState] = useState<'Happy' | 'Calm' | 'Focused'>('Happy');

  return (
    <section id="projects" className="py-24 bg-[#F9F9F9] text-gray-800 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Project Head matching original mrmahe.com */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#222222] tracking-wider">
            PROJECTS
          </h2>
          <span className="cyan-divider" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base font-sans mt-3">
            Real-world enterprise CAD software, IBM assistive artificial intelligence, computer vision applications, and web services.
          </p>
        </div>

        {/* 5 Project Cards Grid matching mrmahe.com cards with modern polish */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PORTFOLIO_DATA.projects.map((proj) => {
            const isSelected = activeProject.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`bg-white rounded-xl overflow-hidden shadow-md border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected 
                    ? 'border-[#35C2F8] ring-2 ring-[#35C2F8]/30 shadow-xl' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                {/* Image Container with Zoom */}
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 text-white text-[11px] font-mono font-medium backdrop-blur-sm">
                    {proj.category}
                  </div>

                  {/* Project Type Badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#35C2F8] text-white uppercase font-heading">
                    {proj.type}
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(proj.image);
                    }}
                    className="absolute bottom-3 right-3 p-1.5 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Expand Image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                      <span>{proj.period}</span>
                      <span className="text-gray-500">{proj.role}</span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-[#222222] group-hover:text-[#35C2F8] transition-colors mb-2 leading-snug">
                      {proj.shortTitle}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4 font-sans">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech stack & Action */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-mono border border-gray-200">
                          {t}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-mono self-center">
                          +{proj.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-heading font-bold uppercase">
                      <span className="text-[#35C2F8] group-hover:underline flex items-center gap-1">
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      {proj.githubUrl && (
                        <span className="text-gray-400 hover:text-gray-800 flex items-center gap-1">
                          Repo <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project In-Depth Detail Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#0091c8] font-bold mb-1">
                <span>{activeProject.category}</span>
                <span>·</span>
                <span>{activeProject.type}</span>
                <span>·</span>
                <span>{activeProject.period}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#222222]">
                {activeProject.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase rounded bg-gray-900 hover:bg-black text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Metrics (if available) */}
          {activeProject.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {activeProject.metrics.map((m, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 text-center">
                  <div className="text-xs text-gray-500 font-mono mb-1">{m.label}</div>
                  <div className="text-2xl font-bold font-heading text-[#35C2F8]">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Solution & Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-gray-700 mb-2">
                  System Architecture & Objective
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {activeProject.detailedOverview}
                </p>
              </div>

              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-gray-700 mb-3">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {activeProject.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#35C2F8] shrink-0 mt-0.5" />
                      <span className="leading-snug">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider font-bold text-gray-700 mb-2">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {activeProject.technologies.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Mini Demonstration Box */}
            <div className="lg:col-span-5 bg-[#F8F9FA] p-5 rounded-xl border border-gray-200 flex flex-col justify-between">
              
              {/* IBM Dumb & Deaf Project */}
              {activeProject.id === 'real-time-deaf-mute-communication' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-heading font-bold">
                    <span className="text-[#35C2F8] flex items-center gap-1.5">
                      <HandMetal className="w-4 h-4" />
                      IBM Project 37034 Sign Translator
                    </span>
                    <span className="text-gray-400">gTTS Engine</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 font-mono">Select Hand Gesture Input:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Hello / Welcome', 'Thank You', 'Need Help', 'Medical Urgent'].map(g => (
                        <button
                          key={g}
                          onClick={() => setSimSign(g)}
                          className={`p-2 rounded font-mono text-left transition-colors ${
                            simSign === g
                              ? 'bg-[#35C2F8] text-white font-bold'
                              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-gray-200 font-mono text-xs">
                    <div className="text-[10px] text-gray-400 uppercase">Synthesized Speech Output:</div>
                    <div className="text-sm font-bold text-gray-800 mt-1">
                      "{simSign} to the center. How may I assist you today?"
                    </div>
                  </div>

                  <a
                    href="https://github.com/IBM-EPBL/IBM-Project-37034-1660299814"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-heading font-bold uppercase rounded text-center block"
                  >
                    Open IBM-Project-37034 Repository
                  </a>
                </div>
              )}

              {/* CAD Project */}
              {activeProject.id === 'cad-data-processing' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-heading font-bold text-[#35C2F8]">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4" />
                      VectorDraw DWG Pipeline
                    </span>
                    <span className="text-gray-400 font-mono">C# / WinForms</span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-gray-600">
                    <div className="p-2 bg-white rounded border border-gray-200">1. DWG Entity Tree Traversal</div>
                    <div className="p-2 bg-white rounded border border-gray-200">2. Spatial Cluster Normalization</div>
                    <div className="p-2 bg-white rounded border border-gray-200">3. GD&T Feature Recognition</div>
                    <div className="p-2 bg-white rounded border border-gray-200">4. Automated BOM & Excel Output</div>
                  </div>

                  <a
                    href="#cad-simulator"
                    className="w-full py-2 bg-[#35C2F8] hover:bg-[#20a9df] text-white text-xs font-heading font-bold uppercase rounded text-center block"
                  >
                    Launch Interactive CAD Blueprint Simulator
                  </a>
                </div>
              )}

              {/* Face Attendance Project */}
              {activeProject.id === 'automatic-attendance-system' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-heading font-bold text-[#35C2F8]">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-4 h-4" />
                      OpenCV Facial Attendance
                    </span>
                    <span className="text-gray-400 font-mono">Python / Haar</span>
                  </div>

                  <div className="p-3 bg-white rounded border border-gray-200 text-center font-mono text-xs">
                    <div className="w-16 h-16 border-2 border-emerald-500 rounded-lg mx-auto flex items-center justify-center text-emerald-600 font-bold mb-2">
                      98.7%
                    </div>
                    <div className="text-xs font-bold text-gray-800">{faceLog}</div>
                    <div className="text-[10px] text-gray-400 mt-1">Recorded: {new Date().toLocaleTimeString()}</div>
                  </div>

                  <button
                    onClick={() => setFaceLog(`Face ID: Verified Attendee (99.1% Confidence)`)}
                    className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-heading font-bold uppercase rounded"
                  >
                    Simulate Camera Frame Verification
                  </button>
                </div>
              )}

              {/* BSNL Search System */}
              {activeProject.id === 'bsnl-search-service-system' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-heading font-bold text-[#35C2F8]">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-4 h-4" />
                      BSNL Customer Directory
                    </span>
                    <span className="text-gray-400 font-mono">MySQL Index</span>
                  </div>

                  <div className="p-3 bg-white rounded border border-gray-200 font-mono text-xs text-gray-700">
                    <div>Query: <code>SELECT * FROM bsnl_customers WHERE number='0452-245...'</code></div>
                    <div className="text-emerald-600 mt-1 font-bold">✓ Record Found (Status: Active Subscriber)</div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Provides telecommunications customers with automated number lookup, billing status, and exchange records.
                  </p>
                </div>
              )}

              {/* Facial Expression Music */}
              {activeProject.id === 'facial-expression-music' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-heading font-bold text-[#35C2F8]">
                    <span className="flex items-center gap-1.5">
                      <Music className="w-4 h-4" />
                      Emotion Music AI
                    </span>
                    <span className="text-gray-400 font-mono">CNN Softmax</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                    {(['Happy', 'Calm', 'Focused'] as const).map(em => (
                      <button
                        key={em}
                        onClick={() => setEmotionState(em)}
                        className={`p-2 rounded text-center ${
                          emotionState === em
                            ? 'bg-[#35C2F8] text-white font-bold'
                            : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-white rounded border border-gray-200 font-mono text-xs">
                    <div className="text-[10px] text-gray-400 uppercase">Recommended Track:</div>
                    <div className="text-sm font-bold text-gray-800">
                      {emotionState === 'Happy' ? 'Acoustic Bright Sunlight Vibes' : emotionState === 'Calm' ? 'A.R. Rahman Ambient Instrumental' : 'Deep Focus Lo-Fi Coding Synthesizer'}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Image Preview */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden p-2">
            <img src={modalImage} alt="Project Preview" className="w-full h-auto object-contain rounded" />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded text-xs font-heading font-bold"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
