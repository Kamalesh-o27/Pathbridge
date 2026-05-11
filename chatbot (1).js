const CHATBOT_PERSONA = `You are an expert Career Advisor, Mentor, and Industry Strategist. Your goal is to help users navigate their career paths, prepare for interviews, build strong resumes, and identify skill gaps.

Core Guidelines:
- Be Pragmatic & Actionable: No vague platitudes. Provide concrete, step-by-step advice.
- Ask Clarifying Questions: If a request is too broad, ask users to narrow down their interests and current skill level.
- Industry-Standard Formats: Use "Action Verb + Task + Impact/Metric" format (STAR method) for resume bullets.
- Maintain Boundaries: You are a career advisor, not a therapist, lawyer, or financial planner. Redirect out-of-scope questions to qualified professionals.
- Tone: Empathetic, encouraging, highly professional, and grounded in the current job market reality.`;

const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');

const chatHistory = [];

// Career domain expertise
const CAREER_DOMAINS = {
  tech: {
    name: 'Technology & Software',
    roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'DevOps Engineer', 'QA Engineer', 'Solutions Architect'],
    skills: ['Programming (Python, Java, JS, Go)', 'System Design', 'Cloud (AWS, GCP, Azure)', 'Database Design', 'Problem Solving'],
    courses: ['B.Tech Computer Science', 'B.Tech Information Technology', 'Bootcamps (full-stack, data science)', 'Online certifications (AWS, Azure)'],
  },
  finance: {
    name: 'Finance & Business',
    roles: ['Financial Analyst', 'Investment Banker', 'Management Consultant', 'Business Analyst', 'Risk Manager'],
    skills: ['Excel & Financial Modeling', 'Data Analysis', 'Communication', 'Business Acumen', 'Attention to Detail'],
    courses: ['B.Com', 'B.B.A', 'MBA', 'CFA', 'Chartered Accountancy'],
  },
  design: {
    name: 'Design & UX',
    roles: ['UX/UI Designer', 'Product Designer', 'Visual Designer', 'Interaction Designer', 'Design Strategist'],
    skills: ['Figma/Adobe XD', 'UI/UX Principles', 'Prototyping', 'User Research', 'Communication'],
    courses: ['B.Des', 'Graphic Design', 'UX Bootcamp', 'Product Design Certificate'],
  },
  business: {
    name: 'Business & Operations',
    roles: ['Project Manager', 'Operations Manager', 'Business Development', 'Supply Chain Manager', 'Strategy Consultant'],
    skills: ['Project Management', 'Process Optimization', 'Leadership', 'Data Analysis', 'Communication'],
    courses: ['B.B.A', 'MBA', 'PMP Certification', 'Six Sigma'],
  },
  marketing: {
    name: 'Marketing & Growth',
    roles: ['Marketing Manager', 'Growth Hacker', 'Brand Manager', 'Digital Marketer', 'Product Marketing Manager'],
    skills: ['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO/SEM', 'Consumer Psychology'],
    courses: ['B.Com', 'Marketing Specialization', 'Digital Marketing Certificate'],
  },
};

function appendMessage(text, type) {
  const messageEl = document.createElement('div');
  messageEl.className = `chatbot-message ${type}`;
  messageEl.innerHTML = text.replace(/\n/g, '<br/>');
  chatbotMessages.appendChild(messageEl);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function normalize(text) {
  return text.toLowerCase().trim();
}

function isBroadQuery(message) {
  const broadTerms = ['job', 'career', 'help', 'tell me', 'guide', 'what should i', 'how do i get'];
  return broadTerms.some(term => message.includes(term)) && message.length < 30;
}

function contains(message, keywords) {
  return keywords.some(keyword => message.includes(keyword.toLowerCase()));
}

function buildResumeGuidance(userContext = '') {
  let response = `<strong>📄 Building a Strong Resume (STAR Format)</strong><br/><br/>`;
  
  response += `The magic formula is: <strong>Action Verb + Task + Quantifiable Result</strong><br/><br/>`;
  
  response += `<strong>❌ Weak:</strong> "Responsible for developing features and improving code quality."<br/>`;
  response += `<strong>✅ Strong:</strong> "Architected microservices reducing API latency by 35%, enabling 10K+ concurrent users vs. 2K previously."<br/><br/>`;
  
  response += `<strong>Key Resume Elements:</strong><br/>`;
  response += `• <strong>Experience:</strong> 3-5 bullets per role, all in STAR format<br/>`;
  response += `• <strong>Quantify:</strong> Use %, $, #, time (e.g., "shipped 5 features in 3 months")<br/>`;
  response += `• <strong>Keywords:</strong> Match job description exactly (Python, AWS, SQL, etc.)<br/>`;
  response += `• <strong>Format:</strong> 1 page, ATS-friendly (no graphics/tables), 10-12pt font<br/><br/>`;
  
  response += `<strong>Top Action Verbs:</strong> Achieved, Built, Led, Designed, Drove, Engineered, Implemented, Optimized, Increased, Reduced, Spearheaded<br/><br/>`;
  
  response += `To give you tailored feedback, tell me:<br/>`;
  response += `1. What role are you targeting?<br/>`;
  response += `2. What industry or company?<br/>`;
  response += `3. Can you share one accomplishment you'd like me to rewrite?`;
  
  return response;
}

function buildInterviewPrep(domain = 'general') {
  let response = `<strong>🎯 Interview Preparation Strategy</strong><br/><br/>`;
  
  response += `Most interviews have 3-4 rounds:<br/>`;
  response += `<strong>1. Screening/Phone (20-30 min):</strong> Behavioral questions, motivation check<br/>`;
  response += `<strong>2. Technical/Functional (45-60 min):</strong> Problem-solving, domain expertise<br/>`;
  response += `<strong>3. Case Study/System Design:</strong> Real-world problem solving<br/>`;
  response += `<strong>4. Executive/Culture Fit:</strong> Leadership, values alignment<br/><br/>`;
  
  response += `<strong>Your Immediate Action Plan:</strong><br/>`;
  response += `✓ Prepare 5-7 STAR stories (teamwork, conflict, failure, impact, leadership)<br/>`;
  response += `✓ Practice answering: "Tell me about yourself" (keep to 2 min)<br/>`;
  response += `✓ Prepare 3 questions for the interviewer (shows genuine interest)<br/>`;
  response += `✓ Research the company: mission, recent news, culture<br/>`;
  response += `✓ Do a mock interview with a friend or mentor<br/>`;
  response += `✓ Get 8+ hours sleep the night before<br/><br/>`;
  
  response += `<strong>Which type of interview are you preparing for?</strong><br/>`;
  response += `1. Behavioral (STAR questions)<br/>`;
  response += `2. Technical (coding, data structures)<br/>`;
  response += `3. Case study (strategy, problem-solving)<br/>`;
  response += `4. Group discussion`;
  
  return response;
}

function buildSkillGapAnalysis() {
  let response = `<strong>🔍 Skill Gap Analysis Framework</strong><br/><br/>`;
  
  response += `To bridge gaps effectively, we need to identify:<br/><br/>`;
  
  response += `<strong>Step 1: Define Your Target</strong><br/>`;
  response += `• What role do you want in 6-12 months?<br/>`;
  response += `• What industry or company?<br/>`;
  response += `• Entry-level, mid-level, or senior?<br/><br/>`;
  
  response += `<strong>Step 2: Current Skills Inventory</strong><br/>`;
  response += `• Technical (languages, tools, certifications)<br/>`;
  response += `• Domain (industry knowledge, business acumen)<br/>`;
  response += `• Soft (communication, leadership, problem-solving)<br/><br/>`;
  
  response += `<strong>Step 3: Gap Identification</strong><br/>`;
  response += `Compare current vs. target. Prioritize:<br/>`;
  response += `1. Critical must-haves (non-negotiable)<br/>`;
  response += `2. Nice-to-haves (differentiators)<br/>`;
  response += `3. Future skills (long-term)<br/><br/>`;
  
  response += `<strong>Step 4: Learning Strategy</strong><br/>`;
  response += `• Timeline: 3 months, 6 months, 1 year?<br/>`;
  response += `• Formats: Online courses, certifications, projects, mentorship?<br/>`;
  response += `• Accountability: Deadline, public commitment?<br/><br/>`;
  
  response += `<strong>Top Learning Platforms:</strong> Coursera, Udemy, DataCamp, Codecademy, freeCodeCamp, Pluralsight<br/><br/>`;
  
  response += `Tell me:<br/>`;
  response += `1. Your target role and timeline<br/>`;
  response += `2. Your current skills (list 5-10)<br/>`;
  response += `3. What's most important to learn first?`;
  
  return response;
}

function buildCareerPathGuidance() {
  let response = `<strong>🛣️ Career Path Planning</strong><br/><br/>`;
  
  response += `To guide you effectively, I need to understand:<br/><br/>`;
  
  response += `<strong>About You:</strong><br/>`;
  response += `• Current education level (12th, undergrad, post-grad)<br/>`;
  response += `• Work experience (none, intern, entry-level, 2+ years)<br/>`;
  response += `• Geographic preferences (India, abroad, flexible)<br/><br/>`;
  
  response += `<strong>Your Interests:</strong><br/>`;
  response += `• Technical vs. non-technical work<br/>`;
  response += `• Startup vs. MNC vs. government vs. NGO<br/>`;
  response += `• Problem domains (health, finance, education, climate, etc.)<br/><br/>`;
  
  response += `<strong>Key Career Pathways:</strong><br/>`;
  response += `🔧 <strong>Tech:</strong> Software Engineer → Tech Lead → Engineering Manager → Director<br/>`;
  response += `📊 <strong>Data:</strong> Data Analyst → Data Scientist → ML Engineer → Head of Analytics<br/>`;
  response += `🎯 <strong>Product:</strong> APM → PM → Senior PM → Director<br/>`;
  response += `💼 <strong>Business:</strong> Associate → Manager → Senior Manager → Director<br/>`;
  response += `🎨 <strong>Design:</strong> Designer → Senior Designer → Design Lead → Head of Design<br/><br/>`;
  
  response += `To recommend a path, tell me:<br/>`;
  response += `1. Your current education/experience<br/>`;
  response += `2. Top 3 interests (what excites you?)<br/>`;
  response += `3. Timeline for career entry`;
  
  return response;
}

function buildEducationGuidance() {
  let response = `<strong>🎓 Education & Course Selection</strong><br/><br/>`;
  
  response += `The path depends on your goals:<br/><br/>`;
  
  response += `<strong>For Entry into Tech/IT:</strong><br/>`;
  response += `✓ B.Tech Computer Science / IT (4 years, traditional, respected)<br/>`;
  response += `✓ Bootcamps (3-6 months, practical, job-focused)<br/>`;
  response += `✓ Online Certifications (AWS, Google Cloud, Azure, Salesforce)<br/>`;
  response += `✓ Hybrid: B.Tech + Online specializations<br/><br/>`;
  
  response += `<strong>For Specialization (Already Undergrad):</strong><br/>`;
  response += `✓ M.Tech (specialization path)<br/>`;
  response += `✓ MBA (if you want management track)<br/>`;
  response += `✓ Diploma in Specific Domain (6-12 months)<br/>`;
  response += `✓ Post-graduate certifications (CFA, CA, etc.)<br/><br/>`;
  
  response += `<strong>For Abroad Opportunities:</strong><br/>`;
  response += `✓ Bachelors in target country (if starting now)<br/>`;
  response += `✓ Masters abroad (common for Indians)<br/>`;
  response += `✓ Work-study programs (co-op in Canada, internships in US)<br/>`;
  response += `✓ Digital nomad visas + online study<br/><br/>`;
  
  response += `To recommend courses, tell me:<br/>`;
  response += `1. Current education level and stream<br/>`;
  response += `2. Target career (role, industry)<br/>`;
  response += `3. Preference: India or abroad?`;
  
  return response;
}

function isBoundaryViolation(message) {
  const legalTerms = ['contract', 'sue', 'lawsuit', 'legal', 'lawyer', 'court', 'lawsuit', 'dispute'];
  const therapyTerms = ['depression', 'anxiety', 'therapy', 'mental health', 'trauma', 'counseling', 'stressed out'];
  const financialTerms = ['investment', 'stock', 'loan', 'debt', 'crypto', 'financial planning', 'taxes'];
  
  const allBoundaryTerms = [...legalTerms, ...therapyTerms, ...financialTerms];
  return allBoundaryTerms.some(term => message.toLowerCase().includes(term));
}

function buildBoundaryResponse(message) {
  let response = `I appreciate the question, but that's outside my scope as a Career Advisor.<br/><br/>`;
  
  if (message.toLowerCase().includes('contract') || message.toLowerCase().includes('legal')) {
    response += `📋 <strong>For employment contracts or legal matters:</strong> Consult an employment lawyer or your HR department.<br/>`;
  } else if (message.toLowerCase().includes('mental') || message.toLowerCase().includes('stressed') || message.toLowerCase().includes('depression')) {
    response += `🧠 <strong>For mental health or stress management:</strong> Please reach out to a mental health professional or counselor.<br/>`;
  } else if (message.toLowerCase().includes('investment') || message.toLowerCase().includes('financial') || message.toLowerCase().includes('taxes')) {
    response += `💰 <strong>For financial planning or investments:</strong> Consult a certified financial advisor.<br/>`;
  }
  
  response += `<br/>However, I can help with career-related aspects like:<br/>`;
  response += `• Salary negotiation strategies<br/>`;
  response += `• Work-life balance tactics<br/>`;
  response += `• Career transitions and planning<br/>`;
  response += `• Interview and resume prep<br/><br/>`;
  response += `What career question can I help with?`;
  
  return response;
}

function buildResponse(input) {
  const message = normalize(input);
  
  // Check for boundary violations
  if (isBoundaryViolation(message)) {
    return buildBoundaryResponse(message);
  }
  
  // Broad query handling
  if (isBroadQuery(message)) {
    return `That's a broad question! To give you targeted advice, help me narrow it down:<br/><br/>` +
      `1. <strong>What's your current situation?</strong> Student? Fresher? Early-career? Mid-career?<br/>` +
      `2. <strong>What domain interests you?</strong> Tech, finance, design, business, marketing?<br/>` +
      `3. <strong>What's your immediate goal?</strong> Get first job? Switch roles? Advance? Upskill?<br/><br/>` +
      `Once I understand better, I can give you concrete, actionable next steps.`;
  }
  
  // Resume & CV
  if (contains(message, ['resume', 'cv', 'bullet', 'profile', 'cover letter', 'ats'])) {
    return buildResumeGuidance();
  }
  
  // Interview prep
  if (contains(message, ['interview', 'interview prep', 'behavioral', 'technical round', 'hiring', 'preparation'])) {
    return buildInterviewPrep();
  }
  
  // Skill gap
  if (contains(message, ['skill', 'skills', 'gap', 'gap analysis', 'learn', 'learning', 'upskill', 'course', 'certification'])) {
    return buildSkillGapAnalysis();
  }
  
  // Career path
  if (contains(message, ['career', 'career path', 'career guidance', 'which role', 'career options', 'which field', 'industry'])) {
    return buildCareerPathGuidance();
  }
  
  // Education
  if (contains(message, ['college', 'course', 'degree', 'masters', 'undergrad', 'pg', 'mtech', 'btech', 'education', 'specialization'])) {
    return buildEducationGuidance();
  }
  
  // STAR method
  if (contains(message, ['star', 'star method', 'format', 'bullet format', 'action verb'])) {
    let response = `<strong>📊 STAR Method (Industry Standard)</strong><br/><br/>`;
    response += `<strong>S - Situation:</strong> What was the context? What challenge did you face?<br/>`;
    response += `<strong>T - Task:</strong> What was your responsibility? What problem needed solving?<br/>`;
    response += `<strong>A - Action:</strong> What specific steps did YOU take? Use action verbs (Led, Built, Designed, etc.).<br/>`;
    response += `<strong>R - Result:</strong> What was the measurable outcome? Numbers matter!<br/><br/>`;
    response += `<strong>Example:</strong><br/>`;
    response += `"Led redesign of checkout flow → coordinated with 3 backend engineers → reduced cart abandonment from 35% to 7% → saved $2.3M quarterly revenue"<br/><br/>`;
    response += `<strong>Why it works:</strong> Employers want proof you OWNED the outcome, not just participated. Numbers prove impact.`;
    return response;
  }
  
  // Negotiation
  if (contains(message, ['salary', 'negotiate', 'offer', 'promotion', 'raise', 'compensation', 'benefits'])) {
    let response = `<strong>💼 Salary & Offer Negotiation</strong><br/><br/>`;
    response += `<strong>Before Negotiating:</strong><br/>`;
    response += `1. Research: Check Glassdoor, PayScale, levels.fyi for your role/company<br/>`;
    response += `2. Know your worth: Experience, certifications, unique skills?<br/>`;
    response += `3. Document impact: How much value have you added? Use STAR stories.<br/><br/>`;
    response += `<strong>Negotiation Strategy:</strong><br/>`;
    response += `✓ Never say your number first — let them offer<br/>`;
    response += `✓ Say: "I'm excited about the role. Based on my experience and market research, I was expecting $X-Y range."<br/>`;
    response += `✓ Anchor high: Your number is often your floor<br/>`;
    response += `✓ Focus on value: "I've driven 3 product launches, growing user base 200%."<br/>`;
    response += `✓ Be data-driven: Bring facts, not emotions<br/>`;
    response += `✓ Negotiate holistically: Salary, bonus, stock options, flexibility, learning budget<br/><br/>`;
    response += `<strong>If they won't budge on salary:</strong> Ask for remote work, flexible hours, professional development budget, earlier review date, stock options, or extra PTO.`;
    return response;
  }
  
  // Job search strategies
  if (contains(message, ['job search', 'find job', 'apply', 'where to apply', 'how to find', 'linkedin', 'applications', 'referral'])) {
    let response = `<strong>🔍 Job Search Strategy</strong><br/><br/>`;
    response += `<strong>Where to Apply:</strong><br/>`;
    response += `1. <strong>Job boards:</strong> LinkedIn, Indeed, Angel List, Naukri, Internshala, Dice<br/>`;
    response += `2. <strong>Company career pages:</strong> Direct applications (often less competition)<br/>`;
    response += `3. <strong>Recruiters:</strong> Tell your network you're open; email recruiters directly<br/>`;
    response += `4. <strong>Referrals:</strong> Ask alumni/contacts for internal referrals (50% higher success)<br/><br/>`;
    response += `<strong>Application Best Practices:</strong><br/>`;
    response += `✓ Customize resume & cover letter for EACH role<br/>`;
    response += `✓ Match keywords from job description exactly<br/>`;
    response += `✓ Tailor your LinkedIn headline to target role<br/>`;
    response += `✓ Follow up after 1 week: "I wanted to check on my application status..."<br/>`;
    response += `✓ Apply to 10-15 roles weekly<br/><br/>`;
    response += `<strong>Parallel Strategy:</strong> 80% of jobs are filled via referrals. Network simultaneously while applying online.`;
    return response;
  }
  
  // LinkedIn
  if (contains(message, ['linkedin', 'profile', 'headline', 'optimization', 'networking'])) {
    let response = `<strong>🌐 LinkedIn Profile Optimization</strong><br/><br/>`;
    response += `<strong>Critical Elements:</strong><br/>`;
    response += `1. <strong>Headline:</strong> Not just "Software Engineer." Use: "Software Engineer @ Google | Python, System Design, Cloud"<br/>`;
    response += `2. <strong>Photo:</strong> Professional headshot (good lighting, smile, plain background)<br/>`;
    response += `3. <strong>About:</strong> 3-4 lines summarizing who you are + what you do + what you're looking for<br/>`;
    response += `4. <strong>Experience:</strong> STAR-format bullets (same as resume)<br/>`;
    response += `5. <strong>Skills:</strong> Endorse relevant 5-7 skills at the top<br/>`;
    response += `6. <strong>URL:</strong> Customize: linkedin.com/in/yourname<br/><br/>`;
    response += `<strong>Networking Tips:</strong><br/>`;
    response += `✓ Personalize connection requests (mention mutual interest)<br/>`;
    response += `✓ Comment thoughtfully on posts (adds visibility)<br/>`;
    response += `✓ Share insights or articles in your domain<br/>`;
    response += `✓ Reach out to people at target companies directly`;
    return response;
  }
  
  // Portfolio
  if (contains(message, ['portfolio', 'project', 'github', 'showcase', 'build project'])) {
    let response = `<strong>🎯 Building a Strong Portfolio</strong><br/><br/>`;
    response += `<strong>Why Portfolio Matters:</strong> It's proof of your skills. Employers love seeing real work over just a resume.<br/><br/>`;
    response += `<strong>Portfolio Strategy:</strong><br/>`;
    response += `1. <strong>Quality over quantity:</strong> 2-3 polished projects beat 10 half-baked ones<br/>`;
    response += `2. <strong>Relevance:</strong> Choose projects matching your target role<br/>`;
    response += `3. <strong>Technical rigor:</strong> Use industry-standard tools, best practices<br/>`;
    response += `4. <strong>Documentation:</strong> GitHub README, live demo link, deployment details<br/>`;
    response += `5. <strong>Impact:</strong> Quantify: "500 users," "improved performance by 40%," etc.<br/><br/>`;
    response += `<strong>Portfolio Ideas by Role:</strong><br/>`;
    response += `• Software Engineer: Full-stack app, CLI tool, open-source contribution<br/>`;
    response += `• Data Scientist: ML model, data analysis report, Kaggle competition<br/>`;
    response += `• Designer: Redesign of popular app, branding system, case study<br/>`;
    response += `• Product Manager: Competitive analysis, product roadmap, user research summary<br/><br/>`;
    response += `<strong>Host your portfolio:</strong> GitHub Pages (free), Vercel, Netlify, or personal website`;
    return response;
  }
  
  // Default
  return `Hi! I'm your <strong>Career Advisor</strong>. I provide pragmatic, actionable guidance on:<br/><br/>` +
    `📄 <strong>Resume & Cover Letter:</strong> STAR-format bullets, ATS optimization, keyword matching<br/>` +
    `🎯 <strong>Interview Prep:</strong> Behavioral, technical, case studies, group discussions<br/>` +
    `🔍 <strong>Skill Gap Analysis:</strong> Identify what to learn, resources, timelines<br/>` +
    `🛣️ <strong>Career Planning:</strong> Path forward, role options, industry roadmaps<br/>` +
    `🎓 <strong>Education Guidance:</strong> Courses, certifications, college selection<br/>` +
    `💼 <strong>Job Search:</strong> Where to apply, LinkedIn strategy, referrals<br/>` +
    `💰 <strong>Salary Negotiation:</strong> Research, tactics, holistic offers<br/>` +
    `🌐 <strong>LinkedIn Profile:</strong> Optimization, networking, visibility<br/>` +
    `🎨 <strong>Portfolio Building:</strong> Project ideas, documentation, hosting<br/><br/>` +
    `<strong>Be specific!</strong> Instead of "Help with career," try: "I'm a fresher wanting to move into product management—what skills should I focus on and in what order?"<br/><br/>What can I help with?`;
}

async function sendBotReply(userText) {
  chatHistory.push({ role: 'user', content: userText });
  const reply = buildResponse(userText);
  setTimeout(() => appendMessage(reply, 'bot'), 300);
  chatHistory.push({ role: 'assistant', content: reply });
}

function openChatbot() {
  chatbotPanel.classList.remove('hidden');
  chatbotInput.focus();
}

function closeChatbot() {
  chatbotPanel.classList.add('hidden');
}

// Event Listeners
chatbotForm.addEventListener('submit', async event => {
  event.preventDefault();
  const userText = chatbotInput.value.trim();
  if (!userText) return;
  appendMessage(userText, 'user');
  chatbotInput.value = '';
  await sendBotReply(userText);
});

chatbotInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatbotForm.requestSubmit();
  }
});

chatbotToggle.addEventListener('click', () => {
  openChatbot();
  if (chatbotMessages.children.length === 0) {
    const welcomeMsg = `<strong>👋 Welcome to PathBridge Career Advisor!</strong><br/><br/>` +
      `I'm your expert Career Advisor, built to give you <strong>pragmatic, actionable guidance</strong>—no vague platitudes.<br/><br/>` +
      `I help with:<br/>` +
      `✓ Resume writing (STAR method) & ATS optimization<br/>` +
      `✓ Interview prep (behavioral, technical, case studies)<br/>` +
      `✓ Skill gap analysis & learning paths<br/>` +
      `✓ Career planning & role exploration<br/>` +
      `✓ Job search strategies & networking<br/>` +
      `✓ Salary negotiation & offer evaluation<br/>` +
      `✓ LinkedIn optimization & portfolio building<br/><br/>` +
      `<strong>💡 Pro Tip:</strong> Be specific! Ask: "I'm a fresher wanting to move into product management—what skills should I learn first?" instead of "Help with career."<br/><br/>` +
      `What career challenge are you facing today?`;
    appendMessage(welcomeMsg, 'bot');
  }
});

chatbotClose.addEventListener('click', closeChatbot);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeChatbot();
});
