# The 8 toughest sections — real prompts, references, and cost

Pulled straight from your own session transcripts
(`~/.claude/projects/-Users-rahat-Documents-Rahat---Portfolio/`). Every quote
below is verbatim from what you actually typed. Cost/edit numbers are from
[AI-USAGE-REPORT.md](AI-USAGE-REPORT.md), the measured token audit for the
whole project (9 Jul – 3 Aug, 11 sessions, 9,857 calls).

Use this as the source doc for the "best/hardest sections" slide — pick 3–4 of
these to feature with a screenshot + one quote each, rather than cramming all
8 onto one slide.

---

## 1 · Menu — nav + slide-out panel

**Cost:** 23.6% of the whole project · 1,432 calls · 126 edits to `Menu.jsx`

**References shared:**
- Figma: `node-id=290-5293` (menu design), `node-id=0-1` (social links)
- Animation benchmark: [quantumflux.framer.ai](https://quantumflux.framer.ai/) — "follow the open/close animation from this site"
- Animation benchmark: [neko.engineering](https://neko.engineering/) — "top menu, open/close animation onk smooth"

**Real prompts:**
> "https://figma.com/...node-id=290-5293... you will found the menu design for my portfolio. I need to add this. The position of the menu section will be at the top middle. 24px in Y scale. and after user click on the menu, a open section of that menu will appear as a replacement of the menu (2nd image)... as user scrolls the hero section, this menu section should be fixed at it's position."

> "there is a little shaky glitch when closing the menu. and add a blurry bg when the menu is open. the open and closing animation should be smooth. You can follow the animation from this site (quantumflux.framer.ai)"

> "menu open hobar por about, case study and resume section ekta bari khay, eta kano hoy? eta howa thik na, fix koro" *(social links jittering on open — took 3 more rounds to actually fix)*

> "ekhono ekta glitch ase, menu open hobar somoy social link gulor ekhane eshe ekta bari kheye niche name.. eta fix koro jeno menu ta khuboi smooth vabe open hoy. framer motion typer jinish use korte paro."

**Why it was tough:** not the layout — the *open/close motion*. Four separate rounds just on the same glitch (jittering social links), each round needing a fresh screenshot + re-explanation.

---

## 2 · Footer — two-section structure + Cal.com booking widget

**Cost:** 15.3% of the whole project · 2,006 calls · 91 edits, `Footer.jsx` **read 51 times**

**References shared:**
- Figma: `node-id=270-2457` (footer layout)
- Loom walkthrough: [loom.com/share/2ee05008...](https://www.loom.com/share/2ee050088b1d495789920b7f4f699a1e)

**Real prompts:**
> "Analyze the footer layout carefully and fix the implementation to match the design structure. The footer is composed of TWO distinct sections: 1. Top section ('Building Better Experiences') — Black background... 2. Bottom section (Main Footer) — Dark red/black gradient... The Cal.com booking widget does NOT belong entirely to either section. Instead, the Cal.[com widget straddles both]"

> "mobile responsive er jonno ei flow ta use koro cal dot com e. So 1st e just etotukui dekhabe (1st image), then user jodi button e click kore taile ekta modal e date and time selection kore meeting booking er option gulo diba, taile cal.com er design er jonno homepage ta overload lagbe na."

> "Good, but you have missed these middle dashed lines. and also the vertical line in footer."

> "remove phone number and email from footer" *(final, one-line cleanup — 5 Aug)*

**Why it was tough:** the Cal.com widget sits structurally between two visually distinct sections with different backgrounds — every layout fix risked breaking the seam between them. That ambiguity is why the file got re-read 51 times.

---

## 3 · Hero — portrait treatment + scroll text animation

**Cost:** 14.8% of the whole project · 950 calls · 61 edits

**References shared:**
- Figma: `node-id=501-532`, `node-id=580-6530` (hero + case-study-page hero)
- Animation benchmark: [zarcerog.com](https://zarcerog.com/) — text-lag scroll effect
- Animation benchmark: [dragonfly.xyz](https://www.dragonfly.xyz/) — image mouse-hover effect
- Animation benchmark: [trionn.com/work](https://trionn.com/work) — "images circulating here and there"

**Real prompts:**
> "https://zarcerog.com/ in this site, you can see. in hero section text, after scroll down. there is a animation with the text. can you explain the animation to me" *(asked for an explanation first, before requesting it)*

> "okay, great. Now add this animation to my hero section text. 'User Experiences' will lags behind and 'Designing Solutions to Complex Problems Through Seamless' flies up and slightly left (it travels about 86% of its own height quickly)"

> "using the MCP and following the provided image. make the Hero section with zero error and pixel perfect."

> "red line ta image er nicher layer e thakbe... https://dragonfly.xyz ei site e dekho kind of same style er image use korse and mouse mover shate shate image e ekta animation dise. amar image ta teo same type of animation add koro."

**Why it was tough:** motion-matching a reference site by description alone ("lags behind," "flies up," "86% of its own height") takes several rounds to convert into exact easing/timing values.

---

## 4 · About page — full rebuild (highest edit count on the project)

**Cost:** 9.1% of the whole project · 1,328 calls · **134 edits to `AboutPage.jsx`** (the most of any file)

**References shared:**
- Figma: `node-id=402-2588`, `node-id=364-301` (bottom-drawer About page)
- Style reference: "used Apple's Top navigation style"

**Real prompts:**
> "this is the about page. It will act like a bottom drawer comes from bottom. you can see i have used the Apple's Top navigation style. so you need to make it same functional. Add the number animation on the project and years of experience. Make all the company names clickable and add the website links... add a carousal on the image section"

> "ok, so amar design journey ta emon chilo. jodio ami CSE graduate but ami jotobari coding korte giyechi, kokhonoi passion ta pai nai, but designer belay eta hoy nai. Onk choto belar golpo, ami tokhon football kheltam..." *(dictated the entire "Designing @Selise" life-story copy directly as chat text — this became a big share of the edit count, since it was written and rewritten in conversation rather than handed over as one finished draft)*

> "i cannot see the changes in web version. So you need to change the content in all three version with this texts..." *(desktop / tablet / mobile each needed the same text update pushed separately)*

**Why it was tough:** two different problems stacked — a structurally complex layout (drawer + sticky nav + carousel + number-count animation) **and** the personal-story copy being composed live in chat rather than pasted in finished. That's the real reason for 134 edits — a large share is legitimate design/writing iteration, not mechanical waste.

---

## 5 · Case-study rail — pinned horizontal scroll (GSAP ScrollTrigger)

**Cost:** 8.7% of the whole project · 857 calls · 60 edits to `CaseStudy.jsx`

**References shared:**
- Figma: `node-id=309-1147` (case study card)
- Animation benchmark: [meech213.com](https://www.meech213.com/) — horizontal-scroll showcase
- Animation benchmark: [trionn.com](https://trionn.com/) — number-count-up style

**Real prompts:**
> "In this website they showcase there works in a nice horizontal scrolling. [Figma link] this is my case study card with title and description... use the case study card, add them in the placement on image, add the horizontal scrolling. the animation should be same as the reference site with speed, angle, skew, physics, motion"

> "make changes 'A Portfolio Build For Every Steps' section, using GSAP + ScrollTrigger. Behaviour spec: The section is pinned. Vertical scroll input is converted into horizontal movement inside the pinned viewport. It runs once — no loop. After the last card, the pin releases..." *(this one — a full written spec with phases — is the closest thing in the whole project to "plan before code," and it landed close to right on the first pass)*

> "Text jokhon left e move kortese and case study card ashtese, tokhon ekta porjay text and card ovarlap kortese, ja thik na... Duita elements er movement emon speed e hobe jeno overlap na kore."

**Why it was tough:** converting "scroll input → horizontal movement, pinned, releases after the last card" into working ScrollTrigger math, without the headline and the incoming cards visually colliding mid-scroll.

---

## 6 · Mobile responsiveness overhaul — a separate, deliberate 3-phase effort

**Cost:** threaded through Menu/Footer/Hero rather than its own line item, but was explicitly run as its own project phase (sessions `c373b3d9`, `dd0c9365`, late July–early Aug)

**Starting point:** fixed 1440px desktop-only layout — **26% of content rendered on a 375px phone, 53% on tablet.**

**References shared:**
- Figma: `node-id=624-924` (homepage mobile), `node-id=642-3594` / `642-3598` (About + case study mobile)

**Real prompts (the three phases, in order):**
> "I need the mobile and Tab responsiveness for my portfolio. At first give me a report related to responsiveness." *(Phase 1 — audit first)*

> "So, as you have the report, now suggest me what to do make the responsiveness workable." *(Phase 2 — plan)*

> "I the mobile responsive site, you may consider the verticle line, maybe it will takes extra space. before start, can you give me a wireframe for mobile version, then i can make better decision" *(Phase 2b — wireframe before committing pixels)*

> "here is the Mobile responsive design of the homepage. I have designed it according to web version, so use all the animation related flows and add them on mobile design... analysis the web version and implement all the animation without any mistake. do not make any changes in design." *(Phase 3 — implement from finished mobile Figma)*

**Why it was tough:** three genuinely different pages (homepage, About, case studies), each carrying its own desktop animation set (ticker, parallax, scroll-triggers) that all had to be re-derived for a completely different viewport — not resized, rebuilt.

**This is the one process worth stealing directly for the presentation** — audit → plan/wireframe → implement is the only place in the whole project where a big feature went through a deliberate plan step before code, and it's also the one section (docs/audit) that cost almost nothing (docs/guides = 3.2% of total project cost for 16 separate turns).

---

## 7 · Loader — timing/feel tuning + case-study-details template

**Cost:** 4.8% of the whole project · 287 calls · 43 edits to `Loader.jsx`

**References shared:**
- Figma: `node-id=593-591` (case study details template)
- Animation benchmark: [trionn.com](https://trionn.com/) — % counter, bottom-to-top reveal
- Animation benchmark: [himon.framer.website](https://himon.framer.website/) — vertical rectangle wipe after load completes

**Real prompts:**
> "no no. keep the text animation that you have previously. word by word appear. and the % animation should be bottom to top like the image. [trionn.com] this is the reference for the number animation. And after all the loading done, use the animation from [himon.framer.website] here. some vertical rectangle comes from the top to bottom. **before doing anything, please confirm those animation from me with the explanation.**" *(asked for a confirm-before-build step — rare in the whole project, and it worked)*

> "for the about and case study page, make the loader more faster. it should be maxium 1.5 sec." → later: "increase the font sizt of the number to 120px, and increase the loading time to 3 sec." *(the loader duration flip-flopped 1.5s → 3s → 1.5s across three separate messages — pure "give the exact number" waste)*

> "the homepage loader animation, eta just first time load neyar shomoy dekhabe with numbers, er por user jodi abar homepage e ashe, taile just qoute ta dekhabe and duration hobe 1.5 sec, number ta r ashbe na." *(first-visit vs. repeat-visit logic — genuinely tricky, not a token-waste item)*

**Why it was tough:** half genuinely hard (first-visit-only number animation, syncing text-color-reveal to a percentage), half pure back-and-forth on a duration number that changed three times because it was never stated as final.

---

## 8 · CMS + Access gate — Decap CMS, GitHub auth, per-study PIN codes

**Cost:** Access gate 3.2% + CMS 1.0% = 4.2% of the whole project, but almost entirely backend/infra work, not visual iteration

**References:** no Figma or visual reference for this one — it's the one section built from a plain-language spec, not a design file.

**Real prompts:**
> "So I need a suggestion, I want to add a basic CMS from where I can add new case study, the basic case study setting like pin and others."

> "how can I access the CMS?"

**Why it was tough:** the low prompt count is the point — this is the one section in the whole project that was **spec'd once, implemented, and left alone.** It's also the cheapest per-feature section in the report (4.2% combined, vs. 23.6% for the Menu alone) despite being the most technically distinct (auth, routing, access codes) from everything else on the site. Worth calling out on the slide as the counter-example: fewer, clearer turns = the site's best cost-per-feature.

---

## Quick reference table (for the slide itself)

| Section | Share of cost | Real friction | Reference given |
|---|---:|---|---|
| Menu | 23.6% | Open/close motion glitch, 4 rounds | quantumflux.framer.ai |
| Footer | 15.3% | Cal.com widget straddling 2 sections | Loom walkthrough |
| Hero | 14.8% | Describing motion in words → exact easing | zarcerog.com, dragonfly.xyz |
| About page | 9.1% | Layout + life-story copy composed live in chat | Figma 402-2588 |
| Case-study rail | 8.7% | Pin/release scroll math, card overlap timing | meech213.com |
| Mobile overhaul | *(threaded)* | Re-deriving desktop animations per viewport | Figma 624-924 |
| Loader | 4.8% | First-visit logic (hard) + duration flip-flop (waste) | trionn.com, himon.framer.website |
| CMS + Access gate | 4.2% | Backend/auth — cheapest per feature in the project | none — spec only |

**The pattern across all 8:** the expensive rounds are almost never the request itself — they're the *follow-up* rounds spent converting a described feeling ("smooth," "a bit more," "lags behind") into an exact number, after the first attempt missed. Mobile overhaul and CMS are the two sections that skipped that loop — one by planning first, one by being unambiguous from the start.
