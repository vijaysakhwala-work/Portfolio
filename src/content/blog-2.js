export const posts = [
  {
    slug: 'where-ai-automation-saves-time',
    title: 'AI automation for business: 7 workflows worth automating first',
    seoTitle: 'AI Automation for Business: 7 Workflows to Start',
    metaDescription: 'AI automation for business works best on repeatable, checkable tasks. See seven workflows to automate first, how to rank them and what to leave alone.',
    keyword: 'AI automation for business',
    keywords: ['business process automation', 'AI workflow automation', 'automate repetitive tasks', 'AI for small business', 'what to automate first', 'human in the loop'],
    category: 'AI & AUTOMATION',
    published: '2026-10-13',
    updated: '2026-10-13',
    summary: 'Seven repeatable workflows where AI automation for business usually pays off first, how to rank them, and which tasks to leave to people for now.',
    takeaways: [
      'AI automation for business works best on tasks that repeat often, have a clear owner and can be checked quickly by a person.',
      'Start with workflows where a mistake is cheap to catch, such as drafting replies for approval, before touching anything that moves money or sends messages on its own.',
      'Every workflow needs a number you can measure before and after, such as minutes per task, first response time or share of drafts accepted without edits.',
      'Rank candidates by frequency, cost of error, data availability and ease, then pilot one workflow on real examples before building more.',
      'Some work should not be automated yet: unclear processes, high-stakes decisions and anything with no sample data to test against.'
    ],
    cover: {
      alt: 'Seven workflow cards arranged in a grid, each with a small icon and a person approving the output',
      brief: 'Clean flat editorial illustration of seven simple workflow cards on a light background, each with a tiny icon (inbox, document, calendar, search, chart) and a human approval tick. Cobalt #0965ff and cyan #35c6f2 with orange #ff7435 accents on dark navy #060f33 text. No logos, no faces.'
    },
    body: [
      { t: 'p', x: 'AI automation for business means using AI models inside a defined workflow so that software handles the routine reading, sorting and drafting, while people handle the decisions. It is most useful on tasks that repeat often, follow a recognisable pattern and can be checked quickly.' },
      { t: 'p', x: 'It is least useful when sold as a replacement for judgement. This guide gives seven workflows that usually make good first projects, a table to rank them for your own business, and a list of work that should wait. Each workflow is described the same way: what goes in, what the AI does, what a person still checks, and how to measure it.' },
      { t: 'h2', x: 'What makes a task worth automating with AI?' },
      { t: 'p', x: 'A task is worth automating when it repeats often, has a clear owner, produces an output someone can check in seconds, and has examples you can test against. If you cannot describe the input, the expected output and what counts as a mistake, the task is not ready for AI yet.' },
      { t: 'p', x: 'Four questions help. How often does it happen? What does a wrong result cost? Do you have past examples to test with? How many other systems must it connect to? A weekly task with expensive errors and no examples is a poor first project. A daily task with cheap errors and a shared inbox full of examples is a good one. Write down the current time per task before you start, because that is your baseline for every claim later.' },
      { t: 'h2', x: 'Which seven workflows should you automate first?' },
      { t: 'p', x: 'These seven appear in most small and mid-sized businesses in some form. They are listed roughly from lowest risk to highest. In every case the AI prepares and a person approves, at least until you have evidence that the output is reliable enough to relax that rule.' },
      { t: 'h3', x: '1. Enquiry triage and routing' },
      { t: 'ul', items: [
        '**Goes in:** emails, web form messages or chat enquiries.',
        '**AI does:** labels the type (sales, support, billing, spam), extracts key details such as company, product and urgency, and routes it to the right queue.',
        '**Person checks:** low-confidence items and a regular sample of routed ones.',
        '**Measure:** time from arrival to the right person seeing it, and the share of enquiries rerouted by hand.'
      ] },
      { t: 'p', x: 'This is often the best first project because mistakes are visible and cheap to fix. A misrouted enquiry is slower, not catastrophic. Our [business automation service](/services/ai/business-automation) typically starts here.' },
      { t: 'h3', x: '2. Drafting replies for human approval' },
      { t: 'ul', items: [
        '**Goes in:** a customer message plus your policies, past replies and product information.',
        '**AI does:** writes a draft reply in your tone and cites which policy or past answer it used.',
        '**Person checks:** every draft before it is sent, editing as needed.',
        '**Measure:** drafts accepted with no or light edits, minutes saved per reply, and complaints about tone or accuracy.'
      ] },
      { t: 'p', x: 'Nothing is sent without approval, so the risk stays low while you learn how often the drafts are good. Edits are also useful data: patterns in what people change show you where the instructions or source documents need work.' },
      { t: 'h3', x: '3. Document and invoice data extraction' },
      { t: 'ul', items: [
        '**Goes in:** invoices, purchase orders, forms, contracts or delivery notes, often as PDFs or photos.',
        '**AI does:** pulls out named fields such as supplier, date, line items and totals into a structured record.',
        '**Person checks:** fields that fail validation, such as totals that do not add up, and a sample of the rest.',
        '**Measure:** field-level accuracy against a hand-checked set, and time per document.'
      ] },
      { t: 'p', x: 'Accuracy here can be measured field by field, which makes it one of the more honest workflows to evaluate. Add simple rules around the AI, for example rejecting a record where line items do not sum to the total.' },
      { t: 'h3', x: '4. Meeting and call note summaries into the CRM' },
      { t: 'ul', items: [
        '**Goes in:** a call recording transcript or meeting notes, with permission from participants.',
        '**AI does:** summarises decisions, lists action items with owners, and proposes updates to CRM fields.',
        '**Person checks:** the summary and any CRM change before it is saved.',
        '**Measure:** minutes spent on admin after calls, and how many CRM records are complete a day later.'
      ] },
      { t: 'p', x: 'The value is mostly consistency: notes get written and records get updated. Make sure you have consent to record and transcribe, and decide where transcripts are stored and for how long. A [custom CRM](/services/software/custom-crm) can make the proposed updates easier to review.' },
      { t: 'h3', x: '5. Internal knowledge search' },
      { t: 'ul', items: [
        '**Goes in:** handbooks, policies, product sheets, past proposals and help articles.',
        '**AI does:** answers staff questions in plain language and shows the source passages it used.',
        '**Person checks:** the cited source when the answer matters, and owners review gaps the assistant reports.',
        '**Measure:** questions answered without asking a colleague, share of answers with a correct source, and searches that end in no result.'
      ] },
      { t: 'p', x: 'This is the workflow behind most [AI assistants](/services/ai/ai-assistants). It only works as well as your documents, so budget time to clean them. The technique is explained in our guide to [RAG for business documents](/blog/rag-ai-assistant-for-business-documents).' },
      { t: 'figure', ratio: 'wide', alt: 'Diagram of an enquiry moving through classification, a draft reply and a human approval step', brief: 'Flat horizontal flow diagram: an inbox icon, an AI classify step, a draft step and a person approving before send. Cobalt and cyan on a light background, orange for the approval step. No logos, no real faces.', caption: 'The common pattern: the AI prepares, a person approves, and the result is measured.' },
      { t: 'h3', x: '6. Lead qualification and follow-up prep' },
      { t: 'ul', items: [
        '**Goes in:** new leads from forms, ads or events, plus your definition of a good fit.',
        '**AI does:** summarises the company from public information, scores fit against your criteria, and drafts a first follow-up for the salesperson.',
        '**Person checks:** the score and the draft before anyone is contacted.',
        '**Measure:** time from lead to first contact, and whether high-scored leads convert better than low-scored ones.'
      ] },
      { t: 'p', x: 'Track the last measure honestly. If scores do not predict outcomes, change the criteria rather than trust the number. See our [sales and marketing automation](/services/ai/sales-marketing-automation) work for how routing and follow-up preparation fit together.' },
      { t: 'h3', x: '7. Report and dashboard commentary' },
      { t: 'ul', items: [
        '**Goes in:** figures from your reports or [business dashboards](/services/software/business-dashboards), plus last period for comparison.',
        '**AI does:** drafts a short written commentary on what changed and which numbers look unusual.',
        '**Person checks:** every figure quoted and every explanation offered, since the AI sees the numbers but not the reasons.',
        '**Measure:** time to produce the weekly report, and corrections made before it is shared.'
      ] },
      { t: 'p', x: 'Keep the calculations in code or your reporting tool, not in the model. Let the AI describe numbers that are already computed, then have an analyst confirm the explanations.' },
      { t: 'h2', x: 'How do you rank the seven for your business?' },
      { t: 'p', x: 'Score each candidate on four things: how often it happens, how costly a mistake is, whether you have example data, and how easy it is to connect. The table below shows a typical starting view. Treat the ratings as a prompt for discussion, because your business will differ.' },
      { t: 'table', caption: 'Typical starting ratings. Adjust to your own volumes and risks.', head: ['Workflow', 'Frequency', 'Cost of error', 'Data availability', 'Ease'], rows: [
        ['Enquiry triage and routing', 'High', 'Low', 'High (inbox history)', 'Medium'],
        ['Draft replies for approval', 'High', 'Low (approved first)', 'High (sent mail)', 'Medium'],
        ['Document and invoice extraction', 'Medium to high', 'Medium', 'Medium', 'Medium'],
        ['Meeting and call notes to CRM', 'Medium', 'Low to medium', 'Medium', 'Medium'],
        ['Internal knowledge search', 'Medium', 'Low to medium', 'Depends on document quality', 'Medium'],
        ['Lead qualification and follow-up prep', 'Medium', 'Medium', 'Medium', 'Medium to hard'],
        ['Report and dashboard commentary', 'Low to medium (weekly)', 'Medium', 'High (the numbers exist)', 'Easy to medium']
      ] },
      { t: 'p', x: 'Pick the row where frequency is high, error cost is low and data exists. For many teams that is enquiry triage or drafted replies. If your biggest pain is somewhere else, such as invoices, start there, but add stricter validation because the cost of an error is higher.' },
      { t: 'callout', title: 'Rule of thumb', x: 'If you would be uncomfortable with a new hire doing the task on day one without review, the AI should not do it without review either. Begin with review, then relax it where your measurements justify it.' },
      { t: 'h2', x: 'What should you not automate yet?' },
      { t: 'p', x: 'Leave a task alone when the process is unclear, a wrong answer is costly or irreversible, or you have no examples to test against. Automating a messy process produces a faster mess. These tasks are better left with people, or automated only up to a drafting step.' },
      { t: 'ul', items: [
        '**Processes nobody can describe.** Write the steps down first. If two people do it differently, agree one way before adding AI.',
        '**Final decisions on money, contracts, hiring, health or legal matters.** AI can prepare material, but a named person decides.',
        '**Anything that sends messages or changes records with no review**, until you have measured error rates on real examples.',
        '**Tasks with no sample data.** Without 30 to 50 real, representative cases you cannot tell whether the workflow works.',
        '**Sensitive personal or confidential data you have not classified.** Decide what may leave your systems before choosing tools.',
        '**Rare, high-variety work** such as one-off negotiations, where each case is different and the saving is small.'
      ] },
      { t: 'h2', x: 'How do you run a first pilot?' },
      { t: 'p', x: 'Run one workflow, on real examples, with a person approving the output, and compare it with your baseline. A small pilot answers whether the workflow works for your data far more cheaply than a large build, and it shows where the real work is: usually in documents, permissions and integrations, not the model.' },
      { t: 'ol', items: [
        'Choose one workflow and write down its current time per task and error rate.',
        'Collect 30 to 50 real examples, including awkward ones, and agree what a good output looks like.',
        'Build the smallest version that connects to the real inbox, CRM or document store, with approval before anything is sent or saved.',
        'Run it alongside the current process for a set period and log accepted, edited and rejected outputs.',
        'Review the numbers, fix the biggest failure pattern, then decide whether to widen, change or stop.'
      ] },
      { t: 'figure', ratio: 'desktop', alt: 'Dashboard mock-up showing accepted, edited and rejected AI drafts with time saved per task', brief: 'Flat product-UI mock-up of a simple pilot dashboard with three bars (accepted, edited, rejected) and a time-per-task line. Cobalt, cyan and orange on white and dark navy. Use placeholder labels only, nothing that looks like a real client result.', caption: 'A pilot dashboard needs only a few measures: accepted, edited, rejected, and time per task.' },
      { t: 'p', x: 'Plan for the unglamorous parts too: logging, access rights, a clear handoff when the AI is unsure, and someone who owns the workflow after launch. Demos show the idea; production needs these. If you are unsure whether you need a simple assistant, a workflow or something more autonomous, read [AI chatbot vs AI agent vs workflow automation](/blog/ai-chatbot-vs-ai-agent-vs-workflow-automation) first.' },
      { t: 'h2', x: 'What to do next' },
      { t: 'p', x: 'Pick the workflow with the highest frequency, lowest cost of error and best example data, and measure how long it takes today. That one number is the start of a useful conversation about scope. You do not need a model chosen or a vendor shortlisted to do this.' },
      { t: 'p', x: 'If you would like help ranking your own candidates or scoping a pilot, tell us which task is eating the most time through our [contact page](/contact). We work in milestones with regular demos and agree what success looks like before building. Cost and timing depend on scope, so we talk them through with you rather than quote a number here.' }
    ],
    faq: [
      { q: 'What is the best business process to automate with AI first?', a: 'Usually the one that happens most often, has cheap mistakes and has plenty of examples. For many teams that means sorting enquiries or drafting replies for approval. Pick the task where you can measure time per item today, and keep a person approving the output until your own numbers show it is reliable.' },
      { q: 'Will AI automation replace my team?', a: 'It should take over routine reading, sorting and drafting so people spend more time on judgement, customers and exceptions. It makes mistakes, so people still need to review output and handle unusual cases. Plan for a person to own each workflow, and measure results instead of assuming a headcount change.' },
      { q: 'How do I measure whether AI automation is working?', a: 'Record a baseline before you start, then track a few numbers: time per task, share of AI outputs accepted without edits, error or escalation rate, and running cost. Compare them with the baseline on real work for a fixed period, and review a random sample by hand each week.' },
      { q: 'Can small businesses use AI automation without a big budget?', a: 'Yes, because a good first project is small: one workflow, real examples and a person approving results. Existing tools often cover part of it. The cost depends on how many systems must be connected and how clean your data is, so scope it first, then decide how far to go.' },
      { q: 'What data do I need before automating a workflow with AI?', a: 'You need real examples of inputs and the outputs you would accept, typically 30 to 50 to begin with, including awkward cases. You also need to know where the data lives, who may access it and whether any of it is sensitive. Without examples you cannot test, so start by collecting them.' }
    ],
    services: ['/services/ai/business-automation', '/services/ai/ai-assistants', '/services/ai/sales-marketing-automation']
  },
  {
    slug: 'ai-chatbot-vs-ai-agent-vs-workflow-automation',
    title: 'AI agent vs chatbot vs workflow automation: how to choose',
    seoTitle: 'AI Agent vs Chatbot: How to Choose for Your Task',
    metaDescription: 'AI agent vs chatbot vs workflow automation, explained plainly. Use our decision table and tree to pick the least autonomy that solves your problem.',
    keyword: 'AI agent vs chatbot',
    keywords: ['AI agent', 'AI chatbot', 'workflow automation', 'human in the loop', 'agentic AI for business', 'approval gates'],
    category: 'AI & AUTOMATION',
    published: '2026-10-13',
    updated: '2026-10-13',
    summary: 'A plain comparison of chatbots, AI agents and workflow automation, with a decision table, a simple decision tree and honest limits of agents.',
    takeaways: [
      'A chatbot answers questions, a workflow automation follows fixed steps, and an AI agent decides its own steps using tools. They suit different task shapes.',
      'Use the least autonomy that solves the problem: the more freedom a system has, the harder it is to test, secure and predict.',
      'Agents can chain small errors into big ones, inherit every permission you give their tools, and can be steered by malicious text in the content they read.',
      'Human-in-the-loop approval gates belong before any action that is costly, irreversible, external or sensitive.',
      'Most small and mid-sized businesses get more value from a well-scoped assistant or workflow with AI steps than from a fully autonomous agent.'
    ],
    cover: {
      alt: 'Three paths labelled chatbot, workflow and agent leading to the same goal with increasing branching',
      brief: 'Flat editorial illustration of three side by side routes to one destination: a single straight line, a fixed flowchart, and a branching path with a checkpoint gate. Cobalt #0965ff, cyan #35c6f2, orange #ff7435 accent for the gate, on dark navy #060f33. No logos, no faces.'
    },
    body: [
      { t: 'p', x: 'The AI agent vs chatbot question comes down to who decides the steps. A chatbot answers a question in a conversation. A workflow automation runs steps you fixed in advance. An AI agent is given a goal and tools, and decides for itself which steps to take and in what order.' },
      { t: 'p', x: 'The right choice is usually the one with the least autonomy that still solves the problem. This guide defines each option, compares them in a table, gives a simple decision tree and explains the real limits of agents, so you can choose before you build.' },
      { t: 'h2', x: 'What is the difference between a chatbot, a workflow automation and an AI agent?' },
      { t: 'p', x: 'A chatbot is a conversational interface that answers questions or collects information. A workflow automation is a fixed sequence of steps triggered by an event. An AI agent is a system where a language model chooses actions and calls tools in a loop until it judges the goal is met. The three differ in autonomy, not in intelligence.' },
      { t: 'ul', items: [
        '**Chatbot or assistant.** You ask, it answers, usually from a defined set of documents or an FAQ. It does not change anything in your systems. Our [AI assistants](/services/ai/ai-assistants) work is mostly this kind.',
        '**Workflow automation.** When an enquiry arrives, classify it, route it, notify someone. The path is fixed by you, and AI may handle one step such as classification or drafting.',
        '**AI agent.** Given a goal such as "resolve this refund request", it decides whether to look up the order, read the policy, email the customer or issue a refund, and loops until done.'
      ] },
      { t: 'p', x: 'These categories blur. A workflow can contain an AI step, and a chatbot can be given one or two tools. What matters is how much the model decides, because each decision it makes is something you must test and monitor.' },
      { t: 'h2', x: 'How do the three compare side by side?' },
      { t: 'p', x: 'Compare them on six things: the shape of the task, how much autonomy the system has, how risky a mistake is, how the cost behaves, how hard it is to evaluate, and a typical example. The table is a general guide. Your own cases may land between rows.' },
      { t: 'table', caption: 'Chatbot, workflow automation and AI agent compared', head: ['Option', 'Task shape', 'Autonomy', 'Risk', 'Cost behaviour', 'Evaluation difficulty', 'Example'], rows: [
        ['Chatbot or assistant', 'Open questions over known information', 'Low: answers only', 'Low to medium: wrong or invented answers', 'Predictable per question', 'Medium: check answers against sources', 'Staff ask about leave policy'],
        ['Workflow automation (fixed steps)', 'Repeatable steps in a known order', 'None to low: you set the path', 'Low: behaviour is easy to inspect', 'Predictable per run', 'Easy: test each step', 'Route enquiries by type to the right queue'],
        ['Workflow with AI steps', 'Fixed path with one judgement step', 'Low: AI decides inside a step', 'Low to medium', 'Predictable, plus model usage', 'Medium: test the AI step on examples', 'Extract invoice fields, then post for approval'],
        ['AI agent', 'Open-ended goals where steps vary', 'High: chooses its own actions', 'Medium to high: actions can compound', 'Variable: more model calls and retries', 'Hard: many possible paths', 'Research a supplier, compare quotes, draft an order']
      ] },
      { t: 'p', x: 'Notice that cost and evaluation difficulty rise with autonomy. An agent that takes eight steps has eight chances to go wrong, and the number of paths you must test grows with every tool you add.' },
      { t: 'figure', ratio: 'wide', alt: 'A spectrum bar running from fixed workflow to chatbot to agent with autonomy rising left to right', brief: 'Flat horizontal spectrum graphic with three labelled stops (fixed workflow, assistant, agent) and a rising arrow for autonomy and effort to test. Cobalt and cyan with an orange marker. No logos, no faces.', caption: 'More autonomy means more to test, secure and monitor.' },
      { t: 'h2', x: 'What does the same task look like with each option?' },
      { t: 'p', x: 'Take a customer asking about a late order. Each option handles it differently, and seeing the three side by side makes the trade-offs concrete. The point is not that one is best, but that each adds capability and each adds something you must test.' },
      { t: 'ul', items: [
        '**Chatbot or assistant:** explains your delivery policy from your documents and says when to expect an update. It cannot look up the order.',
        '**Workflow automation:** when the message arrives, it looks up the order by number, fills a template with the status and queues the reply for a person to approve. Every step is fixed.',
        '**AI agent:** reads the message, decides whether to check the order system, the courier or the policy, drafts a reply and might propose a refund. It chooses the route, so you must test many routes.'
      ] },
      { t: 'p', x: 'For this task the workflow is usually enough. An agent starts to earn its place only when the routes genuinely differ from case to case and you are prepared to log, review and limit its actions.' },
      { t: 'h2', x: 'How do you decide? A simple decision tree' },
      { t: 'p', x: 'Work down these questions in order and stop at the first one you answer yes to. The order is deliberate, because it starts with the most predictable option and only moves to more autonomy when the simpler ones cannot do the job.' },
      { t: 'ol', items: [
        'Can you write the steps down in order, with no judgement needed? Use a plain workflow automation. No AI is required.',
        'Is the main need an answer from your own documents or FAQ, with no actions in other systems? Use an assistant that retrieves and cites sources. See [RAG for business documents](/blog/rag-ai-assistant-for-business-documents).',
        'Are the steps fixed, but one step needs reading or writing language, such as classifying an email or drafting a reply? Use a workflow with an AI step, and keep the rest as ordinary rules.',
        'Do the steps genuinely vary by case, so you cannot list them in advance, and a mistake is cheap to undo? Consider an agent, with narrow tools and logging.',
        'Would a mistake be costly, external or hard to reverse? Do not let an agent act alone. Add a human approval gate before every consequential action, or use options 1 to 3.'
      ] },
      { t: 'p', x: 'Most real projects end at step 3. Many teams discover they wanted an assistant or a workflow with one AI step, and that the "agent" was a label for flexibility they did not need.' },
      { t: 'h2', x: 'What are the honest limits of AI agents?' },
      { t: 'p', x: 'AI agents are less reliable than fixed workflows because each step depends on the model choosing well, errors compound across steps, and every tool you connect widens what can go wrong. They also cost more per task and are harder to test. These limits are real and should shape the design.' },
      { t: 'ul', items: [
        '**Reliability.** Models can pick the wrong tool, misread a result or stop early. Output varies between runs, so a demo that worked once is not evidence.',
        '**Compounding errors.** If each step is right most of the time, a long chain is right less often. A wrong early assumption can carry through every later step.',
        '**Tool permissions.** An agent can do whatever its credentials allow. Give it read access by default, scope each tool narrowly and never reuse an administrator login.',
        '**Prompt injection.** Text in an email, web page or document can contain instructions that try to redirect the model. The OWASP Top 10 for LLM Applications lists prompt injection as a leading risk. Treat anything the agent reads as untrusted, and limit what it can do after reading it.',
        '**Cost and latency.** More steps mean more model calls, retries and waiting time, and the total varies by task.',
        '**Evaluation.** With many possible paths you need a set of test cases, step-by-step logs and regular review, not a quick check.'
      ] },
      { t: 'callout', title: 'Principle', x: 'Use the least autonomy that solves the problem. Start with a fixed workflow or assistant, add an AI step where language is involved, and give a system freedom to choose its own steps only where the task truly requires it and the cost of error is low or gated.' },
      { t: 'h2', x: 'What is human-in-the-loop, and where do approval gates go?' },
      { t: 'p', x: 'Human-in-the-loop means a person reviews or approves what an AI system produces before it takes effect. An approval gate is the specific point in a workflow where it pauses for that decision. Place gates before actions that are costly, irreversible, visible to customers or involve sensitive data.' },
      { t: 'p', x: 'A good gate shows the person what the system intends to do, why, and the sources it used, with clear approve, edit and reject options. Log every decision. Then use the log: if people approve 98 of 100 drafts without edits, you have evidence to relax a gate on low-risk cases. If they edit half, you have found where the system needs work.' },
      { t: 'ul', items: [
        '**Always gate:** payments, refunds, contract terms, deletions, messages to customers on sensitive topics, and changes to permissions.',
        '**Gate at first, relax with evidence:** outbound drafts, CRM updates, ticket closure.',
        '**Often safe without a gate:** read-only lookups, internal labels and summaries that a person will read anyway.',
        '**Always provide:** a clear handoff to a person when the system is unsure, with the context so far.'
      ] },
      { t: 'p', x: 'The same idea applies to voice. A phone assistant should transfer to a person when confidence is low or the caller asks, as described in our [voice and customer support](/services/ai/voice-customer-support) approach.' },
      { t: 'figure', ratio: 'desktop', alt: 'Flow with an AI proposed action, a human approval gate and a logged outcome', brief: 'Flat product-UI style flow: a card showing a proposed action with sources, three buttons (approve, edit, reject) in cobalt, cyan and orange, and a log list below. Placeholder text only, no readable client data, no faces.', caption: 'An approval gate shows the proposed action and its sources, then logs the decision.' },
      { t: 'h2', x: 'Which should a small or mid-sized business choose?' },
      { t: 'p', x: 'Most small and mid-sized businesses should start with an assistant or a workflow containing AI steps, and add autonomy later if measurements justify it. They are easier to test, cheaper to run and simpler to explain to staff and customers. Agents earn their place on variable, low-risk tasks.' },
      { t: 'p', x: 'Ask three practical questions. Can we list the steps? What is the worst thing that happens if it is wrong? How will we know it is working? If you can list the steps, use a workflow. If the worst case is serious, gate it. If you cannot say how you would measure success, you are not ready to build anything. For a wider view of where to begin, read our guide to [AI automation for business](/blog/where-ai-automation-saves-time), or see the overview of [AI and automation services](/services/ai).' },
      { t: 'h2', x: 'What to do next' },
      { t: 'p', x: 'Write down the task you have in mind in one sentence, list the steps if you can, and note the worst outcome of a mistake. That is enough to place it on the decision tree above. If the answer is still unclear, a short scoping conversation is cheaper than a wrong build.' },
      { t: 'p', x: 'You can describe the task to us through the [contact page](/contact). We will help you choose the simplest option that fits, agree what success looks like, and build in milestones with regular demos. Cost and timeline depend on scope, so we discuss them with you directly.' }
    ],
    faq: [
      { q: 'What is the difference between an AI agent and a chatbot?', a: 'A chatbot answers questions in conversation and usually does not act in other systems. An AI agent is given a goal and tools, then decides its own steps, such as looking up an order or sending an email. The agent has more autonomy, so it is harder to test, secure and predict.' },
      { q: 'Is an AI agent better than workflow automation?', a: 'Not by default. Fixed workflow automation is more predictable, cheaper to run and easier to test. An agent is better only when the steps genuinely vary by case and a mistake is cheap to undo. If you can write the steps down in order, a workflow is usually the safer choice.' },
      { q: 'Are AI agents safe to use in a business?', a: 'They can be, with limits. Give them narrow tool permissions, treat the content they read as untrusted because of prompt injection, log every action, and require human approval before anything costly, external or irreversible. Without those controls, an agent can make mistakes at speed and across many steps.' },
      { q: 'What is human-in-the-loop in AI?', a: 'Human-in-the-loop means a person reviews, approves or corrects an AI output before it takes effect. In practice you add approval gates at risky points, such as sending a message or issuing a refund. You then use the approval log to decide, with evidence, which gates can be relaxed later.' },
      { q: 'Do I need an AI agent for customer support?', a: 'Often not. Many support teams get most of the value from an assistant that answers from approved documents and hands off to a person, plus a workflow that routes and drafts. Add tool-using autonomy only for low-risk actions, and keep approval on refunds, account changes and sensitive cases.' }
    ],
    services: ['/services/ai', '/services/ai/ai-assistants', '/services/ai/voice-customer-support']
  },
  {
    slug: 'rag-ai-assistant-for-business-documents',
    title: 'RAG for business: build an AI assistant for your documents',
    seoTitle: 'RAG for Business: AI Assistant for Your Documents',
    metaDescription: 'RAG for business lets an AI assistant answer from your own documents with citations. Learn how it works, how it fails, how to test it and when not to use it.',
    keyword: 'RAG for business',
    keywords: ['retrieval augmented generation', 'AI knowledge base', 'chat with your documents', 'AI assistant for documents', 'RAG evaluation', 'document permissions'],
    category: 'AI & AUTOMATION',
    published: '2026-10-13',
    updated: '2026-10-13',
    summary: 'How RAG for business works, what goes wrong, how to evaluate it, how to handle permissions and privacy, and when a simpler tool is the better answer.',
    takeaways: [
      'RAG for business means the assistant first retrieves relevant passages from your documents, then writes an answer from those passages and shows its sources.',
      'Most RAG failures are retrieval failures: stale documents, poor chunking or missing permissions, not a weak language model.',
      'An answer without a visible source should not be trusted, so citations and a clear "I could not find this" response are core features.',
      'Evaluate with a golden question set, a retrieval hit rate, a faithfulness check and a human review loop before and after launch.',
      'RAG is not always the answer: a database query, a search box or a fixed FAQ is often simpler, cheaper and more reliable.'
    ],
    cover: {
      alt: 'A question flowing through document search to an answer that shows highlighted source passages',
      brief: 'Flat editorial illustration of a stack of documents with a highlighted passage connected by a line to a chat answer card with a small source tag. Cobalt #0965ff and cyan #35c6f2, orange #ff7435 for the highlight, on dark navy #060f33. No logos, no faces, no readable real text.'
    },
    body: [
      { t: 'p', x: 'RAG for business is a way to let an AI assistant answer questions from your own documents. RAG stands for retrieval augmented generation: the system first searches your documents for relevant passages, then asks a language model to write an answer using only those passages, and shows where each part came from.' },
      { t: 'p', x: 'It is the technique behind most "chat with your documents" tools and the AI knowledge base features in many products. This guide explains how it works, where it breaks, how to test it, how to handle permissions and privacy, and when a simpler tool is the better answer.' },
      { t: 'h2', x: 'What is retrieval augmented generation, in plain terms?' },
      { t: 'p', x: 'Retrieval augmented generation combines search with a language model. Instead of relying on what the model memorised in training, it looks up relevant text from your documents at question time and writes the answer from that text. This keeps answers tied to your current information and lets you show sources.' },
      { t: 'p', x: 'A language model on its own does not know your refund policy, your product specifications or last month’s pricing sheet. It can still produce a confident answer, and that answer may be invented. RAG reduces this problem by supplying the relevant passages and instructing the model to answer from them. It reduces the problem. It does not remove it, which is why evaluation and citations matter.' },
      { t: 'h2', x: 'How does RAG work, step by step?' },
      { t: 'p', x: 'RAG has two phases. Before anyone asks anything, you prepare the documents: ingest, split into chunks, convert chunks into embeddings and store them in an index. When someone asks, the system retrieves the best-matching chunks, passes them to the model with the question and returns an answer with citations.' },
      { t: 'ol', items: [
        '**Ingest.** Collect documents from where they live: shared drives, a help centre, a CRM, PDFs. Keep the source, owner, date and access rights with each file.',
        '**Chunk.** Split documents into passages, often by heading or paragraph, small enough to be specific and large enough to make sense alone.',
        '**Embed and index.** Convert each chunk into an embedding, a list of numbers that captures meaning, and store it in a search index, often alongside ordinary keyword search.',
        '**Retrieve.** Convert the question the same way and find the closest chunks. Filter by what the asking person is allowed to see.',
        '**Generate with citations.** Give the model the question and the retrieved chunks, tell it to answer only from them, and return the answer with links to the sources.'
      ] },
      { t: 'p', x: 'Combining embedding search with keyword search usually helps with exact terms such as product codes and names. Teams also often add a re-ranking step that reorders the retrieved chunks before generation. Each of these choices should be tested on your own questions, not adopted because they are popular.' },
      { t: 'code', file: 'illustrative-rag-flow.txt', code: [
        '# ILLUSTRATIVE pseudo-code only. Not production code.',
        '# Real systems need error handling, logging, caching and security review.',
        '',
        'function answer(question, user):',
        '    chunks = search_index(question, top_k=5,',
        '                          allowed_for=user)   # filter by permissions first',
        '',
        '    if no chunk is relevant enough:',
        '        return "I could not find this in the documents.",',
        '               handoff_to_person()',
        '',
        '    reply = model.write(',
        '        instruction="Answer only from the passages. Cite each one.",',
        '        question=question,',
        '        passages=chunks)',
        '',
        '    log(user, question, chunks, reply)       # keep for review',
        '    return reply.text, reply.citations'
      ].join('\n') },
      { t: 'figure', ratio: 'wide', alt: 'Pipeline showing documents being split, indexed, retrieved and turned into a cited answer', brief: 'Flat horizontal pipeline diagram: documents, chunks, index, retrieve, answer with citation tags. A small lock icon sits on the retrieve step for permissions. Cobalt and cyan with an orange lock. No logos, no faces.', caption: 'The RAG pipeline: prepare the documents once, retrieve and generate on every question.' },
      { t: 'h2', x: 'Which documents are good candidates for RAG?' },
      { t: 'p', x: 'The best candidates are documents that are written in clear prose, have a named owner, change on a known schedule and are asked about often. Policies, product sheets, help articles, onboarding guides and past proposals usually qualify. Scanned images, unlabelled spreadsheets and folders of near-duplicate drafts usually need cleaning first.' },
      { t: 'p', x: 'Before ingesting anything, list each source, who owns it, how often it changes and who may see it. Remove duplicates and superseded versions, because the assistant cannot tell which draft you meant. Add dates and titles that make sense out of context, since a chunk is read without the rest of its file. This preparation often takes more effort than connecting the model, and it is the work that most improves answers.' },
      { t: 'h2', x: 'What goes wrong with RAG, and why?' },
      { t: 'p', x: 'Most RAG failures are retrieval failures. If the right passage is not retrieved, the model has nothing correct to work from and may produce a plausible but wrong answer. Stale documents, poor chunking and missing access controls cause more real problems than the choice of model.' },
      { t: 'ul', items: [
        '**Stale documents.** The index still holds last year’s policy. Fix with owners, review dates, automatic re-indexing and showing the document date beside each citation.',
        '**Bad chunking.** A chunk that cuts a table in half or drops a heading loses its meaning. Chunk by document structure and test with real questions.',
        '**Conflicting sources.** Two documents say different things. The assistant should show both or flag the conflict, not choose silently.',
        '**Permission leaks.** Retrieval returns a salary document to someone who should not see it. Filter by access rights before retrieval, not after generation.',
        '**Hallucination when retrieval fails.** If nothing relevant is found, the model may still answer from general knowledge. Set a relevance threshold and return "not found" with a handoff.',
        '**No source, no trust.** An answer with no visible citation cannot be checked. Always show where it came from.'
      ] },
      { t: 'callout', title: 'Rule of thumb', x: 'If staff cannot click through from an answer to the exact passage it came from, they will either distrust it or trust it too much. Both are failures.' },
      { t: 'h2', x: 'How do you evaluate a document assistant?' },
      { t: 'p', x: 'Evaluate retrieval and answers separately, using a golden question set: real questions with known correct answers and the document that contains them. Measure whether the right passage was retrieved and whether the answer stays faithful to it. Keep people reviewing real usage after launch.' },
      { t: 'ul', items: [
        '**Golden question set.** Start with 50 to 100 real questions from staff or customers, including awkward and unanswerable ones. Record the correct answer and the source document for each. Re-run it after every change.',
        '**Retrieval hit rate.** For each question, did the right passage appear in the top results? If not, fix chunking, indexing or search before touching the prompt.',
        '**Answer faithfulness.** Does every claim in the answer appear in the retrieved passages? Review by hand at first. Automated checks, including a second model as judge, can help at scale but need spot-checking by people.',
        '**"Not found" behaviour.** For questions with no answer in the documents, did the assistant say so rather than guess?',
        '**Human review loop.** Give users a thumbs up or down and a way to flag a wrong answer. Review flagged answers weekly and add them to the golden set.'
      ] },
      { t: 'p', x: 'Treat the golden set as a regression test. When you change the chunk size, the model or the prompt, run it again and compare. Without it, every change is a guess.' },
      { t: 'p', x: 'Plan for upkeep as well as the first build. Documents change, staff ask new kinds of questions and models are updated by their providers, so quality drifts if nobody watches it. Assign an owner for the assistant, review flagged answers on a schedule, and re-run the golden set whenever the documents, the model or the settings change.' },
      { t: 'h2', x: 'How should you handle permissions and data privacy?' },
      { t: 'p', x: 'Apply the same access rules to the assistant that already apply to the documents. Store each document’s permissions in the index and filter results by the signed-in user before anything reaches the model. Decide up front what data may leave your systems, and log queries for review.' },
      { t: 'ul', items: [
        '**Access control.** Mirror existing groups and roles. A person should never get an answer built from a document they could not open themselves.',
        '**Sensitive data.** Classify documents first. Personal data, health records, contracts and financial information may need to be excluded, redacted or kept in a private environment.',
        '**Where processing happens.** Check where your provider processes and stores data, what they retain and whether they use it for training. Read the terms for your plan rather than assuming.',
        '**Retention and deletion.** When a document is deleted or a person leaves, the index and logs must reflect it.',
        '**Auditability.** Keep a log of who asked what and which sources were used, with access limited to those who need it.'
      ] },
      { t: 'p', x: 'Legal and regulatory duties depend on your country and sector, so involve whoever handles compliance early. Connecting to existing systems securely is a large part of the work, and our [integration solutions](/services/ai/integration-solutions) cover exactly that.' },
      { t: 'figure', ratio: 'desktop', alt: 'Assistant answer card with source citations and a permission badge showing allowed documents only', brief: 'Flat product-UI mock-up of a chat answer with two source citation chips, a small shield badge reading allowed sources only, and approve or flag buttons. Placeholder text, no real data or faces. Cobalt, cyan and orange on light and navy.', caption: 'Answers show their sources and respect the asker’s document permissions.' },
      { t: 'h2', x: 'When is RAG not the right answer?' },
      { t: 'p', x: 'RAG is not the right answer when the question has a precise, structured answer, when a person already knows where to look, or when the content is small and stable. In those cases a database query, a good search box or a fixed FAQ is simpler, cheaper and more predictable.' },
      { t: 'ul', items: [
        '**Structured questions** such as "how many orders shipped last week?" belong in a database query or [business dashboard](/services/software/business-dashboards). A language model reading documents is the wrong tool for counting.',
        '**Navigation questions** such as "where is the leave form?" are solved by a good search box and clear page structure.',
        '**Small, stable content** such as ten common customer questions is better as a reviewed FAQ with fixed answers.',
        '**High-stakes answers** such as legal or clinical advice need a qualified person, with the assistant at most finding the relevant passage.',
        '**Messy, outdated documents.** If nobody owns the content, fix that first. RAG will faithfully repeat what is wrong.'
      ] },
      { t: 'p', x: 'RAG also pairs well with other automation. A support workflow can use it to draft replies from your policies, as described in [AI automation for business](/blog/where-ai-automation-saves-time). The assistant finds the passage, a person approves the reply.' },
      { t: 'h2', x: 'What to do next' },
      { t: 'p', x: 'Pick one narrow set of documents with a clear owner, such as your support policies or product sheets. Collect 50 real questions, mark the right answers, and note who should see which documents. That gives you the start of a golden set and a permission model before any tool is chosen.' },
      { t: 'p', x: 'To discuss a document assistant for your business, see our [AI assistants service](/services/ai/ai-assistants) or reach out through the [contact page](/contact). We start from the goal, build in milestones with demos and measure what changes. Scope decides cost and timing, so we discuss both with you.' }
    ],
    faq: [
      { q: 'What is RAG in AI?', a: 'RAG stands for retrieval augmented generation. The system searches your documents for passages relevant to a question, gives them to a language model, and the model writes an answer from those passages with citations. This ties answers to your own current information instead of the model’s general training.' },
      { q: 'Can I chat with my own business documents using AI?', a: 'Yes, that is what RAG does. You ingest documents, split and index them, and the assistant retrieves relevant passages for each question and cites them. Quality depends on your document quality, chunking, permissions and testing. Plan to evaluate it with real questions before staff rely on it.' },
      { q: 'Does RAG stop AI from making things up?', a: 'It reduces it but does not stop it. If retrieval finds the right passages, answers are far better grounded. If retrieval fails, the model may still guess. Use a relevance threshold, a clear "not found" response, visible citations and regular review of flagged answers.' },
      { q: 'How do I keep confidential documents safe in a RAG system?', a: 'Filter retrieval by the asking user’s existing access rights before anything reaches the model, classify sensitive documents, and check your provider’s data processing, retention and training terms. Log queries and sources for audit, and make sure deleted documents are removed from the index.' },
      { q: 'How do I test whether a RAG assistant is accurate?', a: 'Build a golden set of 50 to 100 real questions with known answers and source documents. Measure how often the right passage is retrieved, check each answer is faithful to the sources, test questions that have no answer, and review flagged answers every week. Re-run the set after each change.' }
    ],
    services: ['/services/ai/ai-assistants', '/services/ai/integration-solutions', '/services/ai']
  }
];
