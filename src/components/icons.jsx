import React from 'react';

/* A small line-icon set (24px grid, 1.75 stroke, round caps). Icons are decorative: always aria-hidden. */
const P = d => <path d={d} />;
const ICONS = {
  code: <>{P('m8 8-4 4 4 4')}{P('m16 8 4 4-4 4')}{P('m13.5 5-3 14')}</>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2.5" />{P('M3 9h18')}{P('M7 6.5h.01M10 6.5h.01')}</>,
  smartphone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" />{P('M11 18.5h2')}</>,
  layers: <>{P('m12 3 9 4.5-9 4.5-9-4.5z')}{P('m3 12 9 4.5 9-4.5')}{P('m3 16.5 9 4.5 9-4.5')}</>,
  'pen-tool': <>{P('m4 20 3.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11z')}{P('m14 7 3 3')}</>,
  'shopping-bag': <>{P('M5 8h14l-1 12H6z')}{P('M9 8V6.5a3 3 0 0 1 6 0V8')}</>,
  sparkles: <>{P('M12 3l1.9 5.6 5.6 1.9-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9z')}{P('M19 16v4M17 18h4')}</>,
  'shield-check': <>{P('M12 3 4.5 6v5.5c0 4.4 3.1 8 7.5 9.5 4.4-1.5 7.5-5.1 7.5-9.5V6z')}{P('m8.8 12 2.4 2.4 4-4.4')}</>,
  cloud: P('M7 18.5a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8.8a4.9 4.9 0 0 1-.5 9.7z'),
  blocks: <>{P('m12 3 8 4.5v9L12 21l-8-4.5v-9z')}{P('m4 7.5 8 4.5 8-4.5M12 12v9')}</>,
  megaphone: <>{P('M4 10v4a1 1 0 0 0 1 1h2.5l8 4V5l-8 4H5a1 1 0 0 0-1 1z')}{P('M19 9.5a3.5 3.5 0 0 1 0 5')}</>,
  gamepad: <><rect x="2.5" y="7" width="19" height="11" rx="5" />{P('M7.5 10.5v4M5.5 12.5h4')}{P('M15.5 11.5h.01M18 13.5h.01')}</>,
  users: <><circle cx="9" cy="8" r="3.2" />{P('M3.5 19.5c.4-3.2 2.7-5 5.5-5s5.1 1.8 5.5 5')}{P('M16 5.2a3 3 0 0 1 0 5.6M18.5 14.8c1.6.6 2.7 2.1 3 4.7')}</>,
  'user-check': <><circle cx="9" cy="8" r="3.3" />{P('M3.5 20c.3-3.3 2.6-5.2 5.5-5.2 1.1 0 2.1.3 3 .9')}{P('m15 17.5 2 2 4-4.5')}</>,
  'chart-bar': <>{P('M3 20.5h18')}<rect x="5" y="11" width="3" height="9" rx=".8" /><rect x="10.5" y="5" width="3" height="15" rx=".8" /><rect x="16" y="13" width="3" height="7" rx=".8" /></>,
  database: <><ellipse cx="12" cy="6" rx="7.5" ry="3" />{P('M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6')}{P('M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3')}</>,
  plug: <>{P('M9 3v5M15 3v5')}{P('M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0z')}{P('M12 17v4')}</>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" />{P('m20 20-4.9-4.9')}</>,
  'file-text': <>{P('M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z')}{P('M14 3v5h5M9 13h6M9 17h6')}</>,
  message: P('M20 15a2.5 2.5 0 0 1-2.5 2.5H9l-5 3.5V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z'),
  check: P('m5 12.5 4.5 4.5L19 7.5'),
  'check-circle': <><circle cx="12" cy="12" r="9" />{P('m8 12.3 2.8 2.8L16 9.5')}</>,
  zap: P('M13 3 5 13.5h6L10 21l8-10.5h-6z'),
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" />{P('M8 10.5V8a4 4 0 0 1 8 0v2.5')}</>,
  eye: <>{P('M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z')}<circle cx="12" cy="12" r="2.8" /></>,
  rocket: <>{P('M5 15c-1 1-1.5 3.5-1.5 5 1.5 0 4-.5 5-1.5')}{P('M14.5 4.5c3 0 5 2 5 5-1.8 3.8-5 6.5-8 7.5l-4-4c1-3 3.7-6.2 7-8.5z')}<circle cx="14.8" cy="9.2" r="1.3" /></>,
  refresh: <>{P('M20 6v5h-5')}{P('M4 18v-5h5')}{P('M5.6 9A7.5 7.5 0 0 1 19 7.5L20 11M18.4 15A7.5 7.5 0 0 1 5 16.5L4 13')}</>,
  sliders: <>{P('M4 7h9M17 7h3M4 17h3M11 17h9')}<circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
  bell: <>{P('M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z')}{P('M10 21h4')}</>,
  clock: <><circle cx="12" cy="12" r="9" />{P('M12 7v5l3.2 2')}</>,
  globe: <><circle cx="12" cy="12" r="9" />{P('M3 12h18')}{P('M12 3c2.6 2.7 3.8 5.7 3.8 9S14.6 18.3 12 21c-2.6-2.7-3.8-5.7-3.8-9S9.4 5.7 12 3z')}</>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="1.7" />{P('m21 16-5-5-8 9')}</>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" />{P('m3.5 7 8.5 6 8.5-6')}</>,
  link: <>{P('M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1')}{P('M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1')}</>,
  coins: <><circle cx="12" cy="12" r="9" />{P('M14.5 9a3 3 0 0 0-5 1.5c0 3 5 1.5 5 4.5a3 3 0 0 1-5 1.5M12 6.5V8M12 16v1.5')}</>,
  compass: <><circle cx="12" cy="12" r="9" />{P('m15.5 8.5-2 5-5 2 2-5z')}</>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  'git-branch': <><circle cx="6" cy="5.5" r="2.2" /><circle cx="6" cy="18.5" r="2.2" /><circle cx="18" cy="8.5" r="2.2" />{P('M6 7.7v8.6M18 10.7c0 4-6 3.3-11 6')}</>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2.5" />{P('m7 9.5 3 2.5-3 2.5M12.5 15h4.5')}</>,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" />{P('M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3')}</>,
  bot: <><rect x="4" y="8" width="16" height="12" rx="3.5" />{P('M12 4v4')}<circle cx="12" cy="3.4" r=".8" />{P('M9 13.5h.01M15 13.5h.01M9.5 17h5')}</>,
  workflow: <><rect x="3" y="3.5" width="6.5" height="6.5" rx="1.6" /><rect x="14.5" y="14" width="6.5" height="6.5" rx="1.6" />{P('M9.5 6.7H14a3 3 0 0 1 3 3V14')}</>,
  clipboard: <><rect x="5" y="4.5" width="14" height="16.5" rx="2.5" /><rect x="9" y="2.5" width="6" height="4" rx="1.2" />{P('m9 13 2 2 4-4.5')}</>,
  flag: <>{P('M5 21V4')}{P('M5 4.5h11l-2 4 2 4H5')}</>,
  'trending-up': <>{P('m3 17 6-6 4 4 8-8')}{P('M15 7h6v6')}</>,
  heart: P('M12 20.5S3.5 15.5 3.5 9.2A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.5 2.4c0 6.3-8.5 11.3-8.5 11.3z'),
  key: <><circle cx="8" cy="15.5" r="4" />{P('m11 12.5 8-8M16 7.5l2.5 2.5')}</>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" />{P('M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3')}</>,
  star: P('m12 3.5 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.8l6-.8z'),
  book: <>{P('M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z')}{P('M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3')}</>,
  filter: P('M3.5 5h17l-6.5 8v6l-4-2v-4z'),
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" /></>,
  palette: <>{P('M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.2-1-1.4-1-2.4 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.7 17 3 12 3z')}<circle cx="7.8" cy="11" r="1" /><circle cx="10.5" cy="7.2" r="1" /><circle cx="15" cy="7.8" r="1" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2.5" />{P('m16 10.5 5-3v9l-5-3z')}</>,
  bug: <><rect x="8" y="8" width="8" height="12" rx="4" />{P('M9.5 5.5 11 8M14.5 5.5 13 8M4 13h4M16 13h4M5.5 19l3-2M18.5 19l-3-2M5.5 7l3 2M18.5 7l-3 2')}</>,
  activity: P('M3 12h4l2.5-6 4 12 2.5-6H21'),
  gauge: <>{P('M4 17a8 8 0 1 1 16 0')}{P('m12 17 4-5')}<circle cx="12" cy="17" r="1.2" /></>,
  'list-check': <>{P('m4 6.5 1.5 1.5L8 5M4 12.5 5.5 14 8 11M4 18.5 5.5 20 8 17')}{P('M12 7h8M12 13h8M12 19h8')}</>,
  package: <>{P('m12 3 8 4.5v9L12 21l-8-4.5v-9z')}{P('m4 7.5 8 4.5 8-4.5M12 12v9M8 5.3l8 4.5')}</>,
  'arrow-right': P('M5 12h14M13 6l6 6-6 6'),
  'arrow-up-right': P('M7 17 17 7M8 7h9v9'),
  'chevron-down': P('m6 9 6 6 6-6'),
  plus: P('M12 5v14M5 12h14'),
  info: <><circle cx="12" cy="12" r="9" />{P('M12 11v5M12 8h.01')}</>,
};

export const Icon = ({ name, className = '' }) => (
  <svg className={'ic' + (className ? ' ' + className : '')} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONS[name] || ICONS.sparkles}</svg>
);

/* An icon on a tinted tile. The tile takes its colour from the nearest data-acc (blue, orange, cyan). */
export const Tile = ({ name, size = '', solid = false }) => (
  <span className={'tile' + (size ? ' ' + size : '') + (solid ? ' solid' : '')} aria-hidden="true"><Icon name={name} /></span>
);

/* Each service has one icon and one accent colour, shared by the menu groups: Build = blue, Experience = orange, Operate = cyan */
export const SERVICE_ICON = { software: 'code', web: 'layout', mobile: 'smartphone', product: 'layers', design: 'pen-tool', ecommerce: 'shopping-bag', ai: 'sparkles', qa: 'shield-check', cloud: 'cloud', blockchain: 'blocks', marketing: 'megaphone', games: 'gamepad' };
export const SERVICE_ACC = { software: 'blue', web: 'blue', mobile: 'blue', product: 'blue', design: 'orange', ecommerce: 'orange', marketing: 'orange', games: 'orange', ai: 'cyan', qa: 'cyan', cloud: 'cyan', blockchain: 'cyan' };

/* Pick an icon from a title: the first matching rule wins, otherwise a rotating fallback keeps neighbours different */
const RULES = [
  [/accessib|a11y|wcag|screen reader/, 'eye'],
  [/secur|auth|permission|privacy|complian|audit|risk|safe|guardrail/, 'shield-check'],
  [/encrypt|secret|credential/, 'lock'],
  [/api|webhook|integrat|connect|backend|endpoint|sync/, 'plug'],
  [/flaky|bug|defect|regress|fault/, 'bug'],
  [/perform|speed|latency|fast|load time|core web|benchmark/, 'gauge'],
  [/test|qa\b|quality|review|validat|verif|accept|criteria|evaluat/, 'clipboard'],
  [/monitor|observab|alert|log\b|logging|incident|uptime|health|anomal/, 'activity'],
  [/deploy|release|launch|ship|pipeline|ci\/cd/, 'rocket'],
  [/backup|recover|restor|disaster|maintain|upgrade|update|modernis|moderniz|legacy|refresh|iterat|improv|continuous|ongoing/, 'refresh'],
  [/cloud|hosting|infrastructure|environment|server/, 'cloud'],
  [/search|find|discover|seo|keyword|retriev|query|research|answer|question/, 'search'],
  [/data|database|record|storage|warehouse|migrat|extract/, 'database'],
  [/dashboard|report|analytic|metric|insight|kpi|measure|track|forecast/, 'chart-bar'],
  [/flag|suggest/, 'flag'],
  [/voice|speech|call\b|calls/, 'mic'],
  [/crm|customer|client|contact|user|team|people|role|staff|editor|account|portal|handoff|human|training|train/, 'users'],
  [/lead|funnel|convers|sales|revenue|growth|score|scoring|upsell/, 'trending-up'],
  [/\bai\b|model|prompt|machine|intellig|agent|\bbot\b|llm|assistant/, 'bot'],
  [/workflow|flows?\b|automat|process|routing|route|rule|approval|orchestr|queue/, 'workflow'],
  [/document|content|copy|draft|writ|blog|knowledge|summar|handover|brief|spec|guide|policy|policies|template/, 'file-text'],
  [/chat|message|conversation|support|reply|email|notif|whatsapp|sms|communicat/, 'message'],
  [/design|\bui\b|\bux\b|interface|wireframe|prototype|layout|screen|visual|brand|style|typograph|component library/, 'pen-tool'],
  [/image|photo|video|media|creative|asset|camera/, 'image'],
  [/mobile|\bapp\b|apps\b|ios|android|device|phone|store submission/, 'smartphone'],
  [/website|web app|\bsite\b|page|browser|landing|cms/, 'layout'],
  [/shop|store|cart|checkout|catalogue|catalog|inventory|payment|merchant|product/, 'shopping-bag'],
  [/price|cost|budget|billing|subscription|plan\b|pricing/, 'coins'],
  [/code|develop|build|engineer|refactor|architect|framework|software|platform|saas|module|feature/, 'code'],
  [/git|version|branch|merge|repository/, 'git-branch'],
  [/roadmap|scope|milestone|strategy|discovery|prioriti|backlog|plan|discuss/, 'compass'],
  [/goal|target|outcome|success|objective|result/, 'target'],
  [/game|play|level|interactive|animat|motion/, 'gamepad'],
  [/blockchain|ledger|contract|token|chain|web3|wallet|traceab|provenance/, 'blocks'],
  [/campaign|market|promot|social|advert|outreach|newsletter|audience/, 'megaphone'],
  [/global|locale|language|translat|i18n|region|international/, 'globe'],
  [/time|schedule|booking|appointment|deadline|calendar|duration|schedul/, 'clock'],
];
const FALLBACK = ['sparkles', 'layers', 'zap', 'target', 'compass', 'star'];
export function iconFor(title, i = 0) {
  const t = String(title || '').toLowerCase();
  for (const [re, icon] of RULES) if (re.test(t)) return icon;
  return FALLBACK[i % FALLBACK.length];
}
