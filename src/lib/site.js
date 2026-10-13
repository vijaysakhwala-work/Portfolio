import { services, industries, articles, slugify } from '../catalog';
import { workProjects } from '../work-projects';
import { serviceDetails, fullService, subDetail } from '../service-details';
import { posts, postBySlug, postBody, readMinutes, fmtDate, headingId } from '../blog-posts';
export { services, industries, articles, workProjects, slugify, serviceDetails, fullService, subDetail, posts, postBySlug, postBody, readMinutes, fmtDate, headingId };

import { imageFor } from './images';
export const EMAIL = 'hello@cubusify.com';
export const svc = Object.fromEntries(services.map(s => [s.slug, s]));
export const ind = Object.fromEntries(industries.map(i => [i.slug, i]));
export const tech = t => `/images/tech/${t}.svg`;
export const shot = k => imageFor(k); // null until a picture is added (see src/lib/images.js)
export const industryImg = s => imageFor('industry-' + s);
/* the Industries index tiles and each industry's own page use a separate key, so they stay holders until page-<industry> pictures are added */
export const industryPageImg = s => imageFor('industry-page-' + s);
export const founderImg = () => imageFor('founder');

export const GLYPH = { software: '{ }', web: '</>', mobile: '[ ]', product: 'MVP', design: 'Aa', ecommerce: '$', marketing: 'SEO', games: '>>', ai: 'AI', qa: '✓', cloud: 'CI', blockchain: '0x' };
export const GROUPS = [['Build', ['software', 'web', 'mobile', 'product']], ['Experience and growth', ['design', 'ecommerce', 'marketing', 'games']], ['Operate and improve', ['ai', 'qa', 'cloud', 'blockchain']]];
export const STACK = { software: ['react', 'nodejs', 'postgresql'], web: ['nextjs', 'react', 'cloudflare'], mobile: ['flutter', 'react'], product: ['react', 'nodejs', 'docker'], ecommerce: ['nextjs', 'nodejs'], ai: ['n8n', 'zapier', 'nodejs'], qa: ['github', 'docker'], cloud: ['docker', 'cloudflare', 'github'], blockchain: ['nodejs'], design: [], marketing: [], games: [] };
export const TECHN = { react: 'React', nextjs: 'Next.js', nodejs: 'Node.js', postgresql: 'PostgreSQL', docker: 'Docker', flutter: 'Flutter', cloudflare: 'Cloudflare', github: 'GitHub', n8n: 'n8n', zapier: 'Zapier', angular: 'Angular', java: 'Java', mongodb: 'MongoDB', mysql: 'MySQL', spring: 'Spring' };
export const IND_ORDER = ['ecommerce', 'healthcare', 'education', 'finance', 'logistics', 'manufacturing', 'real-estate', 'media'];
export const IND_POS = { media: '58% 28%', ecommerce: '28% 30%', healthcare: '62% 28%', education: '52% 28%', finance: '62% 28%', logistics: '22% 30%', manufacturing: '40% 28%', 'real-estate': '76% 28%' };
export const IND_CAP = { ecommerce: 'Smoother shopping and order workflows.', healthcare: 'Clearer appointments and patient coordination.', education: 'Easier learning and course administration.', finance: 'Structured information and approval journeys.', logistics: 'Shipment visibility and connected operations.', manufacturing: 'Production planning and operational insight.', 'real-estate': 'Property discovery and lead management.', media: 'Content delivery and audience engagement.' };

export const AI_ITEMS = [
  { key: 'overview', title: 'AI and automation overview', glyph: 'AI', path: '/services/ai', shot: 'ai-ai-overview', file: 'cubusify.config.js', text: 'Start with the work you want to make simpler. Useful assistants and connected workflows, with people in control.', code: '// define the goal, then measure it\nexport default {\n  goal: "answer customers faster",\n  humanInTheLoop: true,\n  measure: ["response time", "resolution rate"],\n};' },
  { key: 'assistants', title: 'AI assistants', glyph: 'Q&A', path: '/services/ai/ai-assistants', shot: 'ai-ai-assistants', file: 'assistant.js', text: 'Help people find answers in your own business information.', code: 'const answer = await assistant.ask({\n  question: "What is our refund policy?",\n  sources: ["handbook.pdf", "help-centre"],\n  handoff: "human", // escalate when unsure\n});\nconsole.log(answer.text, answer.sources);' },
  { key: 'automation', title: 'Business automation', glyph: '=>', path: '/services/ai/business-automation', shot: 'ai-business-automation', file: 'workflow.yml', text: 'Connect enquiries, decisions and actions in one workflow.', code: '# runs when an enquiry arrives\non: enquiry.received\nsteps:\n  - classify: [sales, support, billing]\n  - route: { sales: crm, support: helpdesk }\n  - notify: team@yourcompany.com' },
  { key: 'sales', title: 'Sales and marketing automation', glyph: '%', path: '/services/ai/sales-marketing-automation', shot: 'ai-sales-marketing-automation', file: 'leads.js', text: 'Route new leads and prepare relevant next steps.', code: 'lead.onCreate(async (lead) => {\n  const score = await qualify(lead);\n  if (score > 70) await crm.assign(lead, "sales");\n  await email.send(lead, nextStepFor(score));\n});' },
  { key: 'voice', title: 'Voice and customer support', glyph: '((·))', path: '/services/ai/voice-customer-support', shot: 'ai-voice-customer-support', file: 'support.js', text: 'Plan helpful support journeys with clear human handoffs.', code: 'call.on("transcript", async (text) => {\n  const reply = await assistant.reply(text);\n  if (reply.confidence < 0.6) return call.transfer("human");\n  call.say(reply.text);\n});' },
  { key: 'integrations', title: 'Integration solutions', glyph: 'API', path: '/services/ai/integration-solutions', shot: 'ai-integration-solutions', file: 'webhook.js', text: 'Make existing tools work together through reliable APIs.', code: 'app.post("/webhooks/orders", verify, async (req, res) => {\n  await erp.createOrder(req.body);\n  await sheets.appendRow("Orders", req.body);\n  res.sendStatus(200);\n});' }
];
/* AI sub-service pages get the matching code example */
export const aiForSub = sub => AI_ITEMS.find(a => a.path.endsWith('/' + sub.slug)) || null;

export const TECH_CATS = [
  { id: 'frontend', name: 'Front end', items: ['react', 'nextjs', 'angular'] },
  { id: 'backend', name: 'Back end', items: ['nodejs', 'java', 'spring'] },
  { id: 'database', name: 'Database', items: ['postgresql', 'mysql', 'mongodb'] },
  { id: 'mobile', name: 'Mobile', items: ['flutter', 'txt:React Native'] },
  { id: 'devops', name: 'DevOps and cloud', items: ['docker', 'github', 'cloudflare'] },
  { id: 'automation', name: 'Automation', items: ['n8n', 'zapier'] },
  { id: 'commerce', name: 'CMS and commerce', items: ['txt:Shopify', 'txt:WooCommerce'] },
  { id: 'design', name: 'Design', items: [] },
  { id: 'pm', name: 'Project management', items: [] }
];

/* From the existing Hire Team page */
export const ROLES = [
  { name: 'Software engineers', text: 'Build reliable business platforms that scale.', tags: ['react', 'nodejs', 'postgresql'] },
  { name: 'AI & automation specialists', text: 'Connect workflows and reduce repetitive work.', tags: ['n8n', 'zapier', 'nodejs'] },
  { name: 'Web developers', text: 'Craft fast, thoughtful web experiences.', tags: ['nextjs', 'react', 'cloudflare'] },
  { name: 'App developers', text: 'Bring mobile ideas to life across platforms.', tags: ['flutter', 'txt:React Native'] },
  { name: 'Product designers', text: 'Turn complex ideas into intuitive interfaces.', tags: ['txt:User experience', 'txt:Interface design', 'txt:Brand and visual design'] },
  { name: 'QA & delivery', text: 'Keep quality and progress in focus.', tags: ['github', 'docker', 'txt:Test automation'] }
];
export const MODELS = [
  { name: 'Dedicated team', text: 'A long-term team focused on ongoing product delivery.' },
  { name: 'Project team', text: 'A focused team for a defined scope.' },
  { name: 'Flexible support', text: 'On-demand expertise for evolving priorities.' }
];
export const HIRE_STEPS = [
  ['Tell us what you need', 'Share your goals, challenges and priorities.'],
  ['We recommend the team', 'We’ll recommend the right skills and structure.'],
  ['Set up the plan', 'A plan, ways of working and communication.'],
  ['Get to work', 'Make progress, side by side.']
];
/* Four steps shown on the existing service pages; wording from the Results as a Service steps */
export const PROCESS = [
  ['Understand your needs', 'Understand your bottleneck and agree what success looks like.'],
  ['Shape the approach', 'Agree the scope, the milestones and what each demo should show.'],
  ['Build and connect', 'Build, test and refine with regular demos and clear decisions.'],
  ['Review and improve', 'Review adoption and impact against the goals we agreed.']
];
export const RAAS = [
  ['Define the goal', 'Understand your bottleneck and agree what success looks like.'],
  ['Deliver in milestones', 'Build, test and refine with regular demos and clear decisions.'],
  ['Measure what changes', 'Review adoption and impact against the goals we agreed.']
];
export const FAQ = [
  { q: 'How does a project start?', a: 'Share your idea through the form. Our experts reply within 24 hours. From there we define the goal, deliver in milestones and measure what changes.' },
  { q: 'What is Results as a Service?', a: 'It is how we work. We start with the result you want, agree what success looks like, build in milestones with regular demos, then review impact against the goals we agreed.' },
  { q: 'Who owns the code after launch?', a: 'You do. Your source code, project files and the agreed handover belong to you.' },
  { q: 'Can you work with the tools we already use?', a: 'Often, yes. Our integration solutions connect existing tools through reliable APIs. Tell us which tools you use and we will confirm what is possible.' },
  { q: 'Do the demos send real messages or take real payments?', a: 'No. Demos use sample data and run in your browser. Real integrations need backend services and credentials, which we set up on a real project.' },
  { q: 'Is the work shown on this site from real clients?', a: 'The projects shown are design concepts that show how we think. Real case studies are published only with the client’s permission.' },
  { q: 'How much does a project cost?', a: '', blank: true },
  { q: 'How long does a typical project take?', a: '', blank: true }
];
/* the original catalog tags each sub-service with a demo kind; map it to the Demo Studio experience */
export const DEMO_FOR = { store: ['store', 'Ecommerce demo'], crm: ['crm', 'CRM demo'], automation: ['automation', 'WhatsApp and Sheets demo'], game: ['snake', 'Snake demo'], mobile: ['fitness', 'Fitness app demo'] };

export const workImg = slug => shot('work-' + slug);
export const svcImg = slug => shot('svc-' + slug);
