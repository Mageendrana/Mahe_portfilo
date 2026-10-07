import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadResumeFile } from '../utils/downloadResume';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Globe, 
  Github, 
  Send, 
  Download, 
  CheckCircle2, 
  ArrowUp,
  Copy,
  Check
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDownload = () => {
    downloadResumeFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Visitor'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?cc=${PORTFOLIO_DATA.personal.secondaryEmail}&subject=${subject}&body=${body}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#111111] text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Grids matching original mrmahe.com */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Left Column matching original contact-left */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-wider mb-2">
                CONTACT US
              </h3>
              <span className="cyan-divider-left" />
              <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mt-4">
                Don't be shy, drop us an email and say hello! We are a really nice bunch of people :)
              </p>
            </div>

            {/* Classic Contacts List */}
            <div className="space-y-4 pt-2 text-sm font-sans">
              
              {/* Primary Email */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-gray-800">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-5 h-5 text-[#35C2F8] shrink-0" />
                  <a 
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="text-gray-200 hover:text-[#35C2F8] transition-colors truncate font-mono text-xs sm:text-sm"
                  >
                    {PORTFOLIO_DATA.personal.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
                  className="p-1.5 text-gray-400 hover:text-white"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Secondary DevOps Email from mrmahe.com repo */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-gray-800">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-5 h-5 text-[#35C2F8] shrink-0" />
                  <a 
                    href={`mailto:${PORTFOLIO_DATA.personal.secondaryEmail}`}
                    className="text-gray-200 hover:text-[#35C2F8] transition-colors truncate font-mono text-xs sm:text-sm"
                  >
                    {PORTFOLIO_DATA.personal.secondaryEmail}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.secondaryEmail, 'email')}
                  className="p-1.5 text-gray-400 hover:text-white"
                  title="Copy email"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-gray-800">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#35C2F8] shrink-0" />
                  <a 
                    href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                    className="text-gray-200 hover:text-[#35C2F8] transition-colors font-mono text-xs sm:text-sm"
                  >
                    {PORTFOLIO_DATA.personal.phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
                  className="p-1.5 text-gray-400 hover:text-white"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Twitter & GitHub from original repo */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a 
                  href={`https://twitter.com/${PORTFOLIO_DATA.personal.twitter?.replace('@', '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg flex items-center justify-center gap-2 text-xs font-mono text-gray-300 hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4 text-[#35C2F8]" />
                  <span>{PORTFOLIO_DATA.personal.twitter}</span>
                </a>

                <a 
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg flex items-center justify-center gap-2 text-xs font-mono text-gray-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-[#35C2F8]" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Prominent Resume Download Button inside Contact section */}
              <div className="pt-2">
                <button
                  onClick={handleDownload}
                  className={`w-full py-3.5 px-6 rounded-md font-heading font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2.5 shadow-lg ${
                    downloadSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#35C2F8] hover:bg-[#20a9df] text-white active:scale-95'
                  }`}
                >
                  {downloadSuccess ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{downloadSuccess ? 'Resume Downloaded!' : 'Download Complete Resume File'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column matching original contact-right form */}
          <div className="bg-[#181818] p-8 rounded-xl border border-gray-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#35C2F8] mx-auto" />
                <h4 className="font-heading text-xl font-bold uppercase text-white">Message Prepared!</h4>
                <p className="text-sm text-gray-400 font-sans">
                  Opening mail client to send your message to {PORTFOLIO_DATA.personal.email}.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  className="px-6 py-2 rounded bg-gray-800 text-white font-heading font-bold uppercase text-xs"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name..."
                    className="w-full bg-[#111111] border border-gray-700 focus:border-[#35C2F8] rounded px-4 py-3 text-sm text-white placeholder-gray-500 outline-none font-sans"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    className="w-full bg-[#111111] border border-gray-700 focus:border-[#35C2F8] rounded px-4 py-3 text-sm text-white placeholder-gray-500 outline-none font-sans"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message.."
                    className="w-full bg-[#111111] border border-gray-700 focus:border-[#35C2F8] rounded px-4 py-3 text-sm text-white placeholder-gray-500 outline-none font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#35C2F8] hover:bg-[#20a9df] text-white font-heading font-bold uppercase tracking-wider text-xs rounded transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Copy-Right section matching original mrmahe.com */}
        <div className="pt-8 border-t border-gray-800 text-center relative">
          <p className="font-heading text-lg font-bold text-gray-300 mb-1">
            Thank you :)
          </p>
          <p className="text-xs text-gray-500 font-sans">
            © {new Date().getFullYear()} Magendran P (Mahe) · Built with React & Tailwind CSS
          </p>

          {/* toTop button matching original mrmahe.com */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 top-6 p-3 bg-[#1e1e1e] hover:bg-[#35C2F8] text-white rounded-full transition-colors shadow-md"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
