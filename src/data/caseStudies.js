/* =========================================================================
   Case study content — one entry per study, consumed by both the Case
   Studies list (CaseStudies.jsx), the homepage rail (CaseStudy.jsx) and the
   details page (CaseStudyDetail.jsx). Copy and imagery come from the
   published shots on dribbble.com/R1453; images live in /assets/cs/<slug>/.
   ========================================================================= */

export const CASE_STUDIES = [
  {
    slug: "lets-meet",
    title: "Let’s Meet / Meeting Management Platform",
    desc: "A meeting platform that took 32 clicks to schedule a call. Reworking the flow and the interface cut that to 11 — a 66% drop in interaction cost.",
    year: "2025/26",
    tags: ["Workflow Audit", "Reduce Interaction Cost", "Usability Testing"],
    cats: ["SaaS", "Productivity"],
    /* every shot from the published Dribbble post, in order: the first is
       the hero, the next three sit above the Problem Statement, the rest run
       under Design Exploration. w/h are the real pixel sizes — the page lays
       each frame out at its own ratio so nothing is cropped. */
    shots: [
      { src: "/assets/cs/lets-meet/01.jpg", w: 1600, h: 1324 },
      { src: "/assets/cs/lets-meet/02.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/lets-meet/03.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/lets-meet/04.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/lets-meet/05.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/lets-meet/06.jpg", w: 1600, h: 1200 },
    ],

    context:
      "Let’s Meet is a comprehensive meeting management software designed to streamline scheduling, organizing, and conducting meetings. The previous version, however, required a tedious 32 clicks to create a single meeting, and its interface was not intuitive — users routinely struggled to find the Join Button, which dragged down the whole experience.",


    problem:
      "The original meeting creation process in Let’s Meet was inefficient, requiring approximately 32 clicks, which frustrated users and slowed productivity. The interface also lacked clarity, making it difficult for users to locate essential features like the Join Button, leading to confusion and reduced engagement.",

    challenges: [
      "Creating one meeting took roughly 32 clicks — enough friction that users deferred or abandoned scheduling altogether.",
      "The Join Button had no visual priority, so the single most-used action on the platform was the hardest one to find.",
      "Redundant steps were spread across the flow, and no one had mapped where the real cost sat before the redesign started.",
      "Any new flow had to hold up identically across web, iOS, and Android without a separate design for each.",
    ],

    solutions: {
      intro:
        "The meeting creation process and the interface were redesigned together, with a single target: cut the number of clicks by roughly 66% — from 32 to 11 — and deliver a flow people could complete without thinking about it.",
      bullets: [
        "Ran a workflow analysis over the existing journey to identify and remove redundant steps, bringing creation down from 32 clicks to 11 — a 65.6% reduction in interaction effort.",
        "Rebuilt the flow around clear prompts and minimal required inputs, so the default path to a scheduled meeting is the shortest one.",
        "Gave the Join Button high-contrast colour, a larger target, and prominent placement, making the primary action unmissable.",
        "Refreshed the interface toward a clean, modern aesthetic focused on intuitive navigation and accessibility, folding in user feedback at each pass.",
      ],
    },


    conclusion: {
      intro:
        "The redesigned flow ships at 11 clicks, and the gains showed up across efficiency, satisfaction, and retention rather than in one isolated metric.",
      bullets: [
        "Meeting creation now takes 11 clicks instead of 32 — a 65.6% reduction in user effort.",
        "Post-redesign surveys reported an 80% increase in user satisfaction, attributed to the clearer interface and the accessible Join Button.",
        "Analytics showed a 45% increase in meeting creation and participation rates.",
        "Usability testing revealed a 60% decrease in user errors during meeting creation.",
        "The interface holds up across web, iOS, and Android, with 95% positive feedback on cross-device usability.",
        "Early business data indicates a 30% increase in user retention and 25% growth in new sign-ups.",
      ],
    },
  },

  {
    slug: "d-pass",
    title: "D-Pass / Digital Visitor Management",
    desc: "Office check-in used to run on phone calls and a paper logbook. D-Pass replaces the whole chain with scheduled slots, SMS codes, and OTP authentication — 75% faster, and contactless.",
    year: "2025/26",
    tags: ["Process Redesign", "Contactless Flow", "Security UX"],
    cats: ["Enterprise", "Workplace"],
    /* every shot from the published Dribbble post, in order: the first is
       the hero, the next three sit above the Problem Statement, the rest run
       under Design Exploration. w/h are the real pixel sizes — the page lays
       each frame out at its own ratio so nothing is cropped. */
    shots: [
      { src: "/assets/cs/d-pass/01.jpg", w: 1600, h: 1209 },
      { src: "/assets/cs/d-pass/02.jpg", w: 1600, h: 603 },
      { src: "/assets/cs/d-pass/03.jpg", w: 1600, h: 1727 },
      { src: "/assets/cs/d-pass/04.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/d-pass/05.jpg", w: 1600, h: 1409 },
      { src: "/assets/cs/d-pass/06.jpg", w: 1600, h: 1242 },
      { src: "/assets/cs/d-pass/07.jpg", w: 1600, h: 2000 },
      { src: "/assets/cs/d-pass/08.jpg", w: 1600, h: 1292 },
    ],

    context:
      "D-Pass is a smart digital visitor management solution designed to modernize and secure how organizations handle guest visits. By automating meeting scheduling, visitor authentication, and real-time notifications, it replaces outdated manual processes with a seamless, paperless system — better coordination, stronger security, and a better visitor experience through one integrated platform on both mobile and web.",


    problem:
      "The traditional visitor management process in offices is inefficient and prone to errors. Visitors call the officer to book a meeting, call again on arrival, wait while the officer notifies the guard, then fill in a paper attendance sheet by hand. The result is a disjointed experience, long wait times, and real security risk from the lack of proper authentication.",

    challenges: [
      "Manual meeting scheduling: visitors had to call the respective officer to book a slot, which regularly produced miscommunication and delays.",
      "A cumbersome arrival process: on arrival the visitor calls the officer again, who then notifies the guard — a chain of manual hand-offs with no single source of truth.",
      "Paper-based documentation: name, company, mobile number, and time were written into an attendance sheet by hand, slow to complete and easy to get wrong.",
      "No real authentication step, so nothing verified that the person at the desk was the person who was expected.",
    ],

    solutions: {
      intro:
        "D-Pass was designed as a paired mobile and web application that collapses the entire chain into one flow — contactless throughout, authenticated at the door, and with no paper anywhere in it.",
      bullets: [
        "Automated scheduling: officers book meeting slots directly in D-Pass, eliminating the repeated phone calls, and a unique meeting code is sent to the visitor by SMS on confirmation.",
        "Secure, contactless authentication: the visitor gives the meeting code to the guard, who verifies them with a one-time password sent to the visitor’s phone — no physical contact and no shared surfaces.",
        "A paperless record: visitor details are pre-filled by the officer at scheduling time, so the attendance sheet disappears entirely.",
        "Real-time notifications tell the officer the moment their visitor is authenticated, closing the coordination gap that the phone chain used to fill.",
      ],
    },


    conclusion: {
      intro:
        "Replacing the call-and-logbook chain with scheduled slots, SMS codes, and OTP verification made check-in roughly 75% faster while raising the security floor rather than trading it away.",
      bullets: [
        "Check-in is contactless end to end — code on arrival, OTP to verify, no shared pen and no shared sheet.",
        "Every visit carries an authenticated, searchable record, replacing a paper log nobody could audit.",
        "Officers, guards, and visitors work from one coordinated platform across mobile and web instead of three disconnected manual steps.",
      ],
    },
  },

  {
    slug: "ai-agent",
    title: "AI Agent / iOS AI Assistant",
    desc: "An all-in-one AI companion on the App Store — answers, content, image generation, and task organisation in one app, so people stop paying for and switching between five.",
    year: "2025/26",
    tags: ["Product Design", "Feature Architecture", "iOS App"],
    cats: ["AI", "Mobile"],
    /* every shot from the published Dribbble post, in order: the first is
       the hero, the next three sit above the Problem Statement, the rest run
       under Design Exploration. w/h are the real pixel sizes — the page lays
       each frame out at its own ratio so nothing is cropped. */
    shots: [
      { src: "/assets/cs/ai-agent/01.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/ai-agent/02.jpg", w: 1600, h: 1199 },
      { src: "/assets/cs/ai-agent/03.jpg", w: 912, h: 1125 },
      { src: "/assets/cs/ai-agent/04.jpg", w: 1600, h: 1993 },
      { src: "/assets/cs/ai-agent/05.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/ai-agent/06.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/ai-agent/07.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/ai-agent/08.jpg", w: 1600, h: 1200 },
      { src: "/assets/cs/ai-agent/09.jpg", w: 1600, h: 1200 },
    ],

    context:
      "AI Agent is a versatile iPhone app, live on the App Store, that transforms how people learn, create, and stay productive. Powered by advanced AI, it offers an unlimited suite of tools — instant answers, content creation, image generation, task organisation, and smart conversations. With multilingual support, PDF summarisation, and roleplay adventures, it acts as a collaborator for students, professionals, and dreamers in one seamless platform.",


    problem:
      "Creative and planning tasks demand multiple specialised tools, significant time, and real expertise — a barrier for non-professionals and small businesses alike. Fragmented tooling, skill requirements, and slow manual processes all get in the way of simply executing an idea.",

    challenges: [
      "Fragmented tools: separate apps for designing logos, editing video, writing content, or planning recipes and workouts — inefficient and expensive to keep.",
      "Skill barriers: generating professional-grade images, songs, or mockups required advanced skills or costly software, limiting who could do it at all.",
      "Time-intensive processes: creating lyrics, t-shirt designs, or gym plans by hand is slow and inconsistent in quality.",
      "Packing an unlimited feature set into a phone-sized surface without the app becoming a menu of menus.",
    ],

    solutions: {
      intro:
        "AI Agent was designed as an all-in-one AI companion, consolidating an unlimited feature set into a single approachable iPhone app that simplifies learning, boosts creativity, and lifts productivity — with a PRO tier for the advanced capabilities.",
      bullets: [
        "Instant expertise: real-time answers on any topic from maths to data analysis, multilingual communication for global users, and complex concepts explained in plain terms.",
        "Creative powerhouse: stories, poems, social posts, emails, and SEO content from a prompt, plus AI art, logos, and roleplay scenarios, with a built-in image generator and photo analysis turning ideas into visuals.",
        "Productivity booster: PDF, website, and YouTube summarisation in seconds, alongside code assistance, interview prep, study notes, event planning, and AI-guided goals.",
        "Smart interactions: saved chat history for continuous learning, curated prompts for instant inspiration, and human-like dialogue with contextual understanding.",
      ],
    },


    conclusion: {
      intro:
        "Consolidating the toolset paid off in speed, reach, and cost — the app removed both the skill barrier and the subscription stack that used to sit in front of a simple idea.",
      bullets: [
        "Saves time: tasks like making a logo or a video now take 5 minutes instead of hours — 70% faster than before.",
        "Easy for everyone: 85% of beginners produced pro-level content with no prior experience.",
        "Reach: 5,000 people use the app monthly, with 60% returning daily to try new tools.",
        "Saves money: no need for multiple subscriptions, saving users around $50 per month.",
        "Satisfaction: 90% of surveyed users rated the app easy and enjoyable to use.",
        "Volume: users made over 100,000 creations — images, songs, plans — in just three months.",
      ],
    },
  },
];

/* the card image on the list pages and the homepage rail is the first shot */
CASE_STUDIES.forEach((c) => {
  c.hero = c.shots[0].src;
});

export const getCaseStudy = (slug) =>
  CASE_STUDIES.find((c) => c.slug === slug) || CASE_STUDIES[0];
