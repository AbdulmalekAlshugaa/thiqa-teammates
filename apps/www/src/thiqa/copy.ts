import type { ThiqaLocale } from "./site";

type Item = { title: string; body: string };

export type ThiqaCopy = {
  lang: string;
  dir: "rtl" | "ltr";
  title: string;
  description: string;
  skipToContent: string;
  brand: string;
  brandBy: string;
  nav: { abilities: string; agencies: string; how: string; pricing: string; faq: string; label: string };
  switchLabel: string;
  switchTo: string;
  signIn: string;
  cta: string;
  hero: { badge: string; heading: string; lead: string; secondary: string; note: string };
  demo: {
    label: string;
    sidebar: string[];
    team: string;
    feed: Array<{ who: string; time: string; text: string; state: "done" | "ask" | "working" }>;
    approve: string;
    decline: string;
  };
  abilities: { eyebrow: string; heading: string; items: Item[] };
  agencies: { eyebrow: string; heading: string; copy: string; points: Item[]; clients: Array<{ name: string; agents: string }> };
  how: { eyebrow: string; heading: string; steps: Item[] };
  pricing: {
    eyebrow: string;
    heading: string;
    copy: string;
    names: Record<"starter" | "growth" | "business", string>;
    perMonth: string;
    currency: string;
    employees: (count: number) => string;
    trial: string;
    seePlans: string;
  };
  faq: { heading: string; items: Array<{ question: string; answer: string }> };
  final: { heading: string; copy: string };
  footer: { tagline: string; basedOn: string; basedOnLink: string; license: string; source: string; rights: string };
};

const ar: ThiqaCopy = {
  lang: "ar",
  dir: "rtl",
  title: "ثقة Teammates — زملاء عمل بالذكاء الاصطناعي يعملون في أدواتك",
  description:
    "ابنِ زميل عمل بالذكاء الاصطناعي يدخل إلى أدواتك، ويتعلّم مهامك، ويعمل في موعدها، ويستأذنك قبل أي خطوة لم توافق عليها. من ثقة AI.",
  skipToContent: "تخطَّ إلى المحتوى",
  brand: "ثقة Teammates",
  brandBy: "من ثقة AI",
  nav: { abilities: "ماذا يفعل", agencies: "للوكالات", how: "كيف يعمل", pricing: "الأسعار", faq: "الأسئلة", label: "التنقل الرئيسي" },
  switchLabel: "English",
  switchTo: "View this page in English",
  signIn: "تسجيل الدخول",
  cta: "ابدأ مجانًا",
  hero: {
    badge: "الباب الثاني إلى ثقة AI",
    heading: "زملاء عمل بالذكاء الاصطناعي يُنجزون العمل في أدواتك",
    lead: "اشرح المهمة مرة واحدة. يدخل زميلك إلى أدواتك، ويؤديها كما تؤديها أنت، ويعود إليك حين يحتاج قرارك.",
    secondary: "كيف يعمل",
    note: "حساب ثقة AI نفسه، واشتراك واحد.",
  },
  demo: {
    label: "مثال توضيحي لفريق من زملاء العمل",
    sidebar: ["الفريق", "المهام", "الموافقات", "المهارات"],
    team: "الفريق",
    feed: [
      { who: "مساعد المبيعات", time: "٧:٠٢ ص", text: "راجعتُ ٢٤ عميلًا محتملًا من الليلة الماضية، وجهّزتُ مسودات لأفضل ٦.", state: "done" },
      { who: "مدير البريد", time: "٧:٣٠ ص", text: "أرشفتُ ٤١ رسالة، وأبقيتُ ٣ تحتاج ردّك.", state: "done" },
      { who: "المحاسب", time: "٨:١٥ ص", text: "فاتورة المورّد جاهزة للإرسال بقيمة ٤٬٢٠٠ ر.س. هل أرسلها؟", state: "ask" },
      { who: "مسؤول التقارير", time: "الآن", text: "يجهّز تقرير الأسبوع من لوحة المبيعات…", state: "working" },
    ],
    approve: "وافق",
    decline: "ليس الآن",
  },
  abilities: {
    eyebrow: "ماذا يستطيع زميلك",
    heading: "يعمل كما يعمل الموظف، لا كما يعمل روبوت المحادثة",
    items: [
      { title: "يدخل إلى أدواتك", body: "يسجّل الدخول إلى الأنظمة التي تستخدمها ويعمل فيها من متصفحه الخاص، حتى إن لم يكن لها واجهة برمجية." },
      { title: "يتعلّم المهمة مرة واحدة", body: "أرِه الطريقة مرة، فيحفظها روتينًا مكتوبًا يمكنك قراءته وتعديله." },
      { title: "يعمل في موعده", body: "تقرير صباح الأحد، ومتابعة العملاء كل ليلة. يبدأ وحده في الوقت الذي تحدده." },
      { title: "يستأذنك قبل أن يتصرف", body: "أنت تحدد ما يفعله وحده وما يعود إليك فيه. وكل خطوة تُسجَّل في سجل تراجعه متى شئت." },
      { title: "يتذكّر ما يهمّك", body: "أسلوبك في الكتابة، وعملاؤك، وقواعد عملك. لا تعيد الشرح كل مرة." },
      { title: "يحدّثك بلغتك", body: "يكتب ويقرأ بالعربية والإنجليزية، ويرسل لك ما أنجزه في المحادثة." },
    ],
  },
  agencies: {
    eyebrow: "للوكالات",
    heading: "عملاء كثيرون، ولكلٍّ منهم فريقه",
    copy: "أدِر عملاءك من حساب واحد. لكل عميل مساحة مستقلة بزملائه وأدواته وصلاحياته، فلا تختلط بياناته ببيانات غيره.",
    points: [
      { title: "مساحة لكل عميل", body: "أدوات العميل وجلساته وسجلاته تبقى في مساحته وحده." },
      { title: "فريق لكل عميل", body: "ابنِ زميلًا مرة، وانسخه إلى عميل آخر بأدواته هو." },
      { title: "موافقات لكل عميل", body: "يعود كل زميل إلى الشخص المسؤول عن ذلك العميل." },
    ],
    clients: [
      { name: "عيادة النخبة", agents: "٣ زملاء" },
      { name: "متجر ورد", agents: "زميلان" },
      { name: "مكتب الأفق العقاري", agents: "٤ زملاء" },
    ],
  },
  how: {
    eyebrow: "كيف يعمل",
    heading: "من الفكرة إلى زميل يعمل في ثلاث خطوات",
    steps: [
      { title: "صِف المهمة", body: "يسألك زميلك بضعة أسئلة عن العمل وأسلوبك والأدوات التي يحتاجها." },
      { title: "اربط أدواتك", body: "سجّل دخولك بنفسك. نحفظ الجلسة مشفّرة، ولا نطّلع على كلمة المرور." },
      { title: "وافق ودعه يعمل", body: "حدّد ما يحتاج إذنك، ثم تابع ما ينجزه من المحادثة." },
    ],
  },
  pricing: {
    eyebrow: "الأسعار",
    heading: "اشتراك واحد مع ثقة AI",
    copy: "الخطط نفسها التي تشغّل موظفي ثقة AI على واتساب وتيليجرام.",
    names: { starter: "الأساسية", growth: "النمو", business: "الأعمال" },
    perMonth: "شهريًا",
    currency: "رنجت",
    employees: (count) => (count === 1 ? "موظف واحد" : count === 3 ? "٣ موظفين" : "١٠ موظفين"),
    trial: "تجربة مجانية لمدة ١٤ يومًا في كل خطة.",
    seePlans: "قارن الخطط",
  },
  faq: {
    heading: "أسئلة شائعة",
    items: [
      {
        question: "ما الفرق بين ثقة AI وثقة Teammates؟",
        answer:
          "ثقة AI يردّ على عملائك في واتساب وتيليجرام. ثقة Teammates يبني زملاء يعملون داخل أدواتك وأنظمتك. المحرّك واحد، والحساب واحد، والاشتراك واحد.",
      },
      {
        question: "هل يتصرف زميلي دون علمي؟",
        answer: "لا يفعل وحده إلا ما سمحت به. أي خطوة أخرى ينتظر فيها موافقتك، وكل ما يفعله يُسجَّل.",
      },
      {
        question: "هل تحتفظون بكلمات مرور أنظمتي؟",
        answer: "لا. تسجّل الدخول بنفسك، ونحفظ الجلسة الناتجة فقط، مشفّرة.",
      },
      {
        question: "هل أحتاج مفتاح نموذج ذكاء اصطناعي؟",
        answer: "لا. النماذج مشمولة في اشتراكك، ويمكنك استخدام مفتاحك الخاص إن أردت.",
      },
      {
        question: "هل يناسب الوكالات؟",
        answer: "نعم. لكل عميل مساحة مستقلة بزملائه وأدواته وصلاحياته، وتديرها كلها من حساب واحد.",
      },
      {
        question: "هل هو مفتوح المصدر؟",
        answer: "ثقة Teammates مبني على مشروع Rakazo مفتوح المصدر بترخيص Apache-2.0، وتعديلاتنا متاحة في مستودع عام.",
      },
    ],
  },
  final: {
    heading: "ابدأ بأول زميل اليوم",
    copy: "اختر مهمة تؤجّلها منذ مدة، ودع زميلك يتولّاها.",
  },
  footer: {
    tagline: "زملاء عمل بالذكاء الاصطناعي، من ثقة AI.",
    basedOn: "مبني على مشروع",
    basedOnLink: "Rakazo مفتوح المصدر",
    license: "(Apache-2.0)",
    source: "الشيفرة المصدرية",
    rights: "ثقة AI",
  },
};

const en: ThiqaCopy = {
  lang: "en",
  dir: "ltr",
  title: "Thiqa Teammates — AI teammates that work in your tools",
  description:
    "Build an AI teammate that signs in to your tools, learns your tasks, runs on schedule, and asks before any step you have not cleared. From Thiqa AI.",
  skipToContent: "Skip to content",
  brand: "Thiqa Teammates",
  brandBy: "by Thiqa AI",
  nav: { abilities: "What it does", agencies: "Agencies", how: "How it works", pricing: "Pricing", faq: "FAQ", label: "Main navigation" },
  switchLabel: "العربية",
  switchTo: "اعرض هذه الصفحة بالعربية",
  signIn: "Sign in",
  cta: "Start free",
  hero: {
    badge: "The second door into Thiqa AI",
    heading: "AI teammates that get the work done in your tools",
    lead: "Explain the job once. Your teammate signs in to your tools, does it the way you do, and comes back when it needs your call.",
    secondary: "How it works",
    note: "Same Thiqa AI account, one subscription.",
  },
  demo: {
    label: "An illustration of a team of teammates",
    sidebar: ["Team", "Tasks", "Approvals", "Skills"],
    team: "Team",
    feed: [
      { who: "Sales assistant", time: "7:02 AM", text: "Reviewed 24 leads from last night and drafted replies for the top 6.", state: "done" },
      { who: "Inbox manager", time: "7:30 AM", text: "Archived 41 emails and kept 3 that need your reply.", state: "done" },
      { who: "Bookkeeper", time: "8:15 AM", text: "The supplier invoice for SAR 4,200 is ready to send. Send it?", state: "ask" },
      { who: "Reports lead", time: "Now", text: "Building this week's report from the sales dashboard…", state: "working" },
    ],
    approve: "Approve",
    decline: "Not now",
  },
  abilities: {
    eyebrow: "What a teammate can do",
    heading: "It works like an employee, not like a chatbot",
    items: [
      { title: "Signs in to your tools", body: "Logs in to the systems you use and works in them from its own browser, even when they have no API." },
      { title: "Learns a task once", body: "Show it the way once and it saves a written routine you can read and edit." },
      { title: "Runs on schedule", body: "The Sunday-morning report, the nightly lead follow-up. It starts on its own, when you say." },
      { title: "Asks before it acts", body: "You decide what it does alone and what comes back to you. Every step lands in a log you can review." },
      { title: "Remembers what matters", body: "Your writing style, your customers, your rules. You do not explain twice." },
      { title: "Talks your language", body: "Reads and writes Arabic and English, and reports back in the chat." },
    ],
  },
  agencies: {
    eyebrow: "For agencies",
    heading: "Many clients, each with their own team",
    copy: "Run your clients from one account. Each client gets a separate space with its own teammates, tools and permissions, so no client's data mixes with another's.",
    points: [
      { title: "A space per client", body: "A client's tools, sessions and logs stay in that client's space." },
      { title: "A team per client", body: "Build a teammate once and copy it to another client, with that client's tools." },
      { title: "Approvals per client", body: "Each teammate comes back to whoever is responsible for that client." },
    ],
    clients: [
      { name: "Al Nukhba Clinic", agents: "3 teammates" },
      { name: "Ward Flowers", agents: "2 teammates" },
      { name: "Horizon Realty", agents: "4 teammates" },
    ],
  },
  how: {
    eyebrow: "How it works",
    heading: "From an idea to a working teammate in three steps",
    steps: [
      { title: "Describe the job", body: "Your teammate asks a few questions about the work, your style and the tools it needs." },
      { title: "Connect your tools", body: "Sign in yourself. We keep the session encrypted and never see the password." },
      { title: "Approve and let it run", body: "Choose what needs your OK, then follow its work from the chat." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "One subscription with Thiqa AI",
    copy: "The same plans that run Thiqa AI's employees on WhatsApp and Telegram.",
    names: { starter: "Starter", growth: "Growth", business: "Business" },
    perMonth: "/ month",
    currency: "RM",
    employees: (count) => (count === 1 ? "1 employee" : `${count} employees`),
    trial: "Every plan starts with a 14-day free trial.",
    seePlans: "Compare plans",
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        question: "How is Thiqa Teammates different from Thiqa AI?",
        answer:
          "Thiqa AI answers your customers on WhatsApp and Telegram. Thiqa Teammates builds teammates that work inside your tools and systems. One engine, one account, one subscription.",
      },
      {
        question: "Will my teammate act without me knowing?",
        answer: "It only does on its own what you have allowed. Anything else waits for your approval, and everything it does is logged.",
      },
      {
        question: "Do you keep my systems' passwords?",
        answer: "No. You sign in yourself, and we keep only the resulting session, encrypted.",
      },
      {
        question: "Do I need an AI model key?",
        answer: "No. Models are included in your subscription, and you can bring your own key if you prefer.",
      },
      {
        question: "Does it work for agencies?",
        answer: "Yes. Each client gets a separate space with its own teammates, tools and permissions, all run from one account.",
      },
      {
        question: "Is it open source?",
        answer: "Thiqa Teammates is based on the open-source Rakazo project, licensed Apache-2.0, and our changes are in a public repository.",
      },
    ],
  },
  final: {
    heading: "Start with your first teammate today",
    copy: "Pick a task you have been putting off and let your teammate take it.",
  },
  footer: {
    tagline: "AI teammates, from Thiqa AI.",
    basedOn: "Based on the",
    basedOnLink: "open-source Rakazo project",
    license: "(Apache-2.0)",
    source: "Source code",
    rights: "Thiqa AI",
  },
};

export const THIQA_COPY: Record<ThiqaLocale, ThiqaCopy> = { ar, en };
