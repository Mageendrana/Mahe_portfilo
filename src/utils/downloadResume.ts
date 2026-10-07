import { PORTFOLIO_DATA } from '../data/portfolioData';

/**
 * Downloads Magendran P's complete professional resume as a formatted document file.
 */
export function downloadResumeFile(): void {
  const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume - ${PORTFOLIO_DATA.personal.name}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #1e293b;
      margin: 0;
      padding: 40px;
      background: #ffffff;
      max-width: 850px;
      margin: 0 auto;
    }
    h1 {
      font-size: 28px;
      margin: 0 0 6px 0;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .tagline {
      font-size: 14px;
      font-weight: 600;
      color: #4f46e5;
      margin-bottom: 12px;
    }
    .contact-info {
      font-size: 12px;
      color: #475569;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1.5px solid #cbd5e1;
    }
    .contact-info span {
      margin-right: 14px;
    }
    h2 {
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f172a;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .item-title {
      font-weight: bold;
      color: #0f172a;
    }
    .item-date {
      color: #64748b;
      font-family: monospace;
      font-size: 12px;
    }
    .item-sub {
      font-size: 12px;
      color: #4338ca;
      font-weight: 600;
      margin-bottom: 6px;
    }
    p {
      font-size: 12px;
      color: #334155;
      margin: 4px 0 8px 0;
    }
    ul {
      margin: 4px 0 14px 0;
      padding-left: 18px;
    }
    li {
      font-size: 12px;
      color: #334155;
      margin-bottom: 4px;
      line-height: 1.45;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      font-size: 12px;
    }
    .skill-box {
      background: #f8fafc;
      padding: 8px 12px;
      border-left: 3px solid #4f46e5;
    }
    .skill-box strong {
      display: block;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .education-item {
      margin-bottom: 12px;
    }
  </style>
</head>
<body>

  <h1>${PORTFOLIO_DATA.personal.name}</h1>
  <div class="tagline">${PORTFOLIO_DATA.personal.tagline}</div>
  <div class="contact-info">
    <span>📧 ${PORTFOLIO_DATA.personal.email}</span>
    <span>📱 ${PORTFOLIO_DATA.personal.phone}</span>
    <span>📍 ${PORTFOLIO_DATA.personal.location}</span>
    <span>🌐 ${PORTFOLIO_DATA.personal.website}</span>
    <span>💻 ${PORTFOLIO_DATA.personal.github}</span>
  </div>

  <h2>Profile Summary</h2>
  <p>${PORTFOLIO_DATA.personal.bio}</p>

  <h2>Professional Experience & Internships</h2>
  ${PORTFOLIO_DATA.experiences.map(exp => `
    <div style="margin-bottom: 16px;">
      <div class="item-header">
        <span class="item-title">${exp.role} — ${exp.company}</span>
        <span class="item-date">${exp.period}</span>
      </div>
      <div class="item-sub">${exp.location}</div>
      <p>${exp.summary}</p>
      <ul>
        ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <h2>Featured Projects</h2>
  ${PORTFOLIO_DATA.projects.map(p => `
    <div style="margin-bottom: 14px;">
      <div class="item-header">
        <span class="item-title">${p.title}</span>
        <span class="item-date">${p.period}</span>
      </div>
      <div class="item-sub">${p.type} Project · Category: ${p.category}</div>
      <p>${p.description}</p>
      <ul>
        ${p.keyHighlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <p style="font-size: 11px; color: #475569;"><strong>Tech Stack:</strong> ${p.technologies.join(', ')}</p>
    </div>
  `).join('')}

  <h2>Technical Skills</h2>
  <div class="skills-grid">
    ${PORTFOLIO_DATA.skills.map(cat => `
      <div class="skill-box">
        <strong>${cat.title}</strong>
        <div>${cat.skills.map(s => s.name).join(' · ')}</div>
      </div>
    `).join('')}
  </div>

  <h2>Education & Academic Credentials</h2>
  ${PORTFOLIO_DATA.education.map(edu => `
    <div class="education-item">
      <div class="item-header">
        <span class="item-title">${edu.degree} — <span style="color: #059669;">${edu.score} (${edu.scoreType})</span></span>
        <span class="item-date">${edu.period}</span>
      </div>
      <div class="item-sub">${edu.institution}, ${edu.location}</div>
      <p>${edu.description}</p>
    </div>
  `).join('')}

</body>
</html>`;

  // Create downloadable Blob
  const blob = new Blob([resumeHtml], { type: 'text/html;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'Magendran_P_Software_Engineer_Resume.html';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}
