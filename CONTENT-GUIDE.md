# কনটেন্ট এডিট গাইড — Rahat | Portfolio

> এই ফাইলটা দেখে আপনি নিজে কোড থেকে যেকোনো টেক্সট বদলাতে পারবেন। AI লাগবে না।

---

## ১. প্রজেক্ট সম্পর্কে সংক্ষেপে

| বিষয় | তথ্য |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Smooth scroll | Lenis |
| ডিজাইন সোর্স | Figma |

**লোকাল সার্ভার চালু করতে:**

```bash
npm run dev
```

ব্রাউজারে `http://localhost:5173` খুলবে। ফাইল সেভ করলেই সাথে সাথে পরিবর্তন দেখাবে (hot reload)।

---

## ২. সাইটে কয়টা পেজ আছে

সাইটটা **hash routing** ব্যবহার করে — মানে URL-এ `#` দিয়ে পেজ আলাদা হয়।

| পেজ | URL | ফাইল |
|---|---|---|
| হোমপেজ | `/` | `Hero` + `About` + `Logos` + `CaseStudy` + `AngleMarque` + `Footer` |
| My Story | `/#about` | `src/components/AboutPage.jsx` |
| Case Studies | `/#case-studies` | `src/components/CaseStudies.jsx` |
| Case Study Detail | `/#case-study/nutriguide` | `src/components/CaseStudyDetail.jsx` |

সব ফাইল আছে `src/components/` ফোল্ডারে।

---

## ৩. ⚠️ সবচেয়ে জরুরি নিয়ম

**লাইন নম্বর বদলে যায়।** আপনি একটা লাইন যোগ বা বাদ দিলেই নিচের সব লাইন নম্বর সরে যাবে।

তাই নিচের টেবিলে লাইন নম্বরের পাশাপাশি **খোঁজার নাম** দেওয়া আছে। এডিটরে `Ctrl+F` (Mac-এ `Cmd+F`) চেপে ওই নামটা খুঁজুন — এটাই সবচেয়ে নিরাপদ পদ্ধতি।

---

## ৪. হোমপেজের টেক্সট

### Hero (`src/components/Hero.jsx`)

| কী | লাইন | খুঁজুন |
|---|---|---|
| বড় হেডলাইন (১ম লাইন) | ~248 | `Designing Solutions` |
| হেডলাইন (২য় লাইন) | ~256 | `to Complex Problems` |
| হেডলাইন (৩য় লাইন, লাল) | ~266 | `User Experiences` |
| ঠিকানা | ~284 | `Based on Dhaka` |
| ডান পাশের ছোট লেখা | ~293 | `Great design connects` |
| সোশ্যাল কার্ড | ~108 | `const SOCIAL_CARDS` |

### About সেকশন (`src/components/About.jsx`)

| কী | লাইন | খুঁজুন |
|---|---|---|
| বড় স্ক্রল টেক্সট | ~16 | `const ABOUT_TEXT` |

### Logos (`src/components/Logos.jsx`)

| কী | লাইন | খুঁজুন |
|---|---|---|
| উপরের লাইন | ~146 | `worked with several brands` |

### Case Study সেকশন (`src/components/CaseStudy.jsx`)

| কী | লাইন | খুঁজুন |
|---|---|---|
| হেডলাইন `A Portfolio` | ~297 | `<span>{"A "}</span>` |
| `Build For` | ~302 | `Build For` |
| `Every Steps` | ~303 | `Every Steps` |
| **কার্ডের সব তথ্য** | ~16 | `const CARDS` |

`CARDS`-এর ভেতরে প্রতিটা কার্ডে থাকে:

```js
{
  slug: "riqs-praxis-monitor",              // URL-এ যায় (ইংরেজি, ছোট হাতের, স্পেস নেই)
  img: imgRectangle8,                        // ছবি
  title: "RiQS Praxis Monitor/ Web Application",
  tags: ["UX Audit", "Improve UX", "User Journey"],
}
```

### Angle Marque কোট (`src/components/AngleMarque.jsx`)

| কী | লাইন | খুঁজুন |
|---|---|---|
| কোট | ~185 | `Be an amateur` |
| লেখকের নাম | ~188 | `Spencer Chaplin` |

---

## ৫. ফুটার (সব পেজে একই) — `src/components/Footer.jsx`

| কী | লাইন | খুঁজুন |
|---|---|---|
| সোশ্যাল লিংক | ~43 | `const SOCIAL_LINKS` |
| **রেজিউমি লিংক** | ~50 | `const RESUME_URL` |
| স্কিল পিল (১ম সারি) | ~55 | `const ROW_A1` |
| স্কিল পিল (২য় সারি) | ~56 | `const ROW_A2` |
| স্কিল পিল (৩য় সারি) | ~57 | `const ROW_B` |
| স্কিল পিল (৪র্থ সারি) | ~58 | `const ROW_C` |
| `Let's Work Together` | ~365 | `Work Together` |
| ফোন নাম্বার | ~387 | `+880` |
| ইমেইল | ~388 | `gmail` |
| `Building Better Experiences` | — | `Building Better` |
| নিচের বড় প্যারা | ~505 | `I believe UX` |

**স্কিল পিল সম্পর্কে:** `null` মানে ওই ঘরটা খালি থাকবে (ডিজাইনের ফাঁকা বক্স)। `\n` মানে ওখানে লাইন ব্রেক হবে — যেমন `"Product\nStrategy"` দুই লাইনে দেখাবে।

---

## ৬. My Story পেজ — `src/components/AboutPage.jsx`

| কী | লাইন | খুঁজুন |
|---|---|---|
| **হিরোর গল্প** ⭐ | ~56 | `const STORY_INTRO` |
| পুল-কোট | ~49 | `const QUOTE` |
| বড় প্যারা (শেয়ার্ড) | ~45 | `const ABOUT_FULL` |
| ছোট প্যারা (শেয়ার্ড) | ~47 | `const ABOUT_SHORT` |
| টুল লেবেল | ~41 | `const TOOL_LABELS` |
| প্রসেস ধাপ | ~62 | `const STEPS` |
| **চাকরির তালিকা** | ~98 | `const EXPERIENCE` |
| সেকশন লেবেল | ~401, ~716 | `Designing @Selise` |
| সেকশন লেবেল | ~428, ~738 | `Work stacks` |
| সেকশন লেবেল | ~472 | `Work Experience` |

### ⭐ হিরোর গল্প কীভাবে বদলাবেন

`STORY_INTRO` একটা লিস্ট। **প্রতিটা লাইন = একটা প্যারাগ্রাফ।**

```js
const STORY_INTRO = [
  "প্রথম প্যারাগ্রাফ এখানে।",
  "দ্বিতীয় প্যারাগ্রাফ এখানে।",
  "তৃতীয় প্যারাগ্রাফ এখানে।",
];
```

নতুন প্যারা যোগ করতে চাইলে শুধু আরেকটা লাইন লিখুন, শেষে **কমা** দিন। বাদ দিতে চাইলে পুরো লাইনটা মুছে দিন। পেজ নিজে থেকেই মানিয়ে নেবে।

### চাকরির তালিকা (`EXPERIENCE`)

```js
{
  role: "UX Engineer",
  meta: ["Full time", "Hybrid", "Zurich, Switzerland"],
  company: "Selise Digital Platform",
  url: "https://selisegroup.com",
  period: "Aug'25 - Present",
}
```

### ⚠️ সাবধানতা

`ABOUT_FULL` আর `ABOUT_SHORT` পেজের **অনেক জায়গায়** ব্যবহার হয়েছে। একটা বদলালে সব জায়গায় বদলে যাবে। আলাদা আলাদা লেখা চাইলে `STORY_INTRO`-র মতো নতুন নাম বানিয়ে নিন।

---

## ৭. Case Studies পেজ — `src/components/CaseStudies.jsx`

| কী | লাইন | খুঁজুন |
|---|---|---|
| **সব কেস স্টাডি** | ~68 | `const CASES` |

প্রতিটা কেস স্টাডির গঠন:

```js
{
  slug: "riqs-praxis-monitor",     // URL — ইংরেজি, ছোট হাতের, স্পেসের বদলে ড্যাশ
  img: "/assets/....png",           // কভার ছবি
  title: "RiQS Praxis Monitor/ Web Application",
  desc: "এখানে বর্ণনা...",
  tags: ["UX Audit", "Improve UX", "User Journey"],   // ঠিক ৩টা
  cats: ["Medical", "Human Resource"],                 // ঠিক ২টা
}
```

নতুন কেস স্টাডি যোগ করতে চাইলে পুরো `{ ... }` ব্লকটা কপি করে নিচে বসান, তারপর ভেতরের লেখা বদলান। **`slug` অবশ্যই ইউনিক হতে হবে।**

---

## ৮. Case Study Detail পেজ — `src/components/CaseStudyDetail.jsx`

সব লেখা একটা জায়গায় — `const STUDY` (লাইন ~21)।

| ফিল্ড | কী দেখায় |
|---|---|
| `title` | পেজের নাম |
| `desc` | নামের নিচের ছোট বর্ণনা |
| `year` | সাল (2025/26) |
| `tags` | ৩টা ট্যাগ পিল |
| `cats` | ২টা ক্যাটাগরি পিল |
| `hero` | উপরের বড় ছবি |
| `context` | Context সেকশনের লেখা |
| `gallery` | ছবির গ্যালারি |
| `problem` | Problem Statement বক্সের লেখা |
| `challenges` | Challenges — বুলেট লিস্ট |
| `solutions` | Solutions বক্স (`intro` + `bullets`) |
| `exploration` | Design Exploration ছবিগুলো |
| `conclusion` | Conclusion বক্স (`intro` + `bullets`) |

ফাইলের ভেতরে এই অংশটা এভাবে চিহ্নিত করা আছে:

```
/* ══════ EDIT PER CASE STUDY ══════ */
        ... এখানে সব লেখা ...
/* ══════ END EDITABLE CONTENT ══════ */
```

এই দুই দাগের **মাঝের অংশ ছাড়া আর কিছু বদলাবেন না।**

---

## ৯. লোডিং স্ক্রিনের কোট — `src/components/Loader.jsx`

`const LOADERS` (লাইন ~20)। প্রতিটা পেজের জন্য আলাদা কোট:

| কী | কোন পেজে |
|---|---|
| `home` | প্রথমবার সাইট খুললে (নাম্বার কাউন্টার সহ) |
| `homeReturn` | আবার হোমপেজে ফিরলে |
| `casestudies` | Case Studies পেজ |
| `about` | My Story পেজ |
| `casestudydetail` | Case Study Detail পেজ |

প্রতিটায় `quote` (কোট) আর `by` (লেখকের নাম) বদলাতে পারবেন।

---

## ১০. মেনু — `src/components/Menu.jsx`

| কী | খুঁজুন |
|---|---|
| রেজিউমি লিংক | `const RESUME_URL` |
| মেনু খুললে যে কোট আসে | `const QUOTES` |
| সোশ্যাল আইকন | `const SOCIALS` |
| নেভিগেশন নাম | `My Story` / `Case Studies` / `Resume` |

> ⚠️ রেজিউমি লিংক **দুই জায়গায়** আছে — `Menu.jsx` আর `Footer.jsx`। বদলালে দুটোই বদলাবেন।

---

## ১১. ব্রাউজার ট্যাবের নাম — `index.html`

লাইন ~7 — `<title>` ট্যাগের ভেতরের লেখা।

---

## ১২. লেখার সময় যে নিয়মগুলো মানতেই হবে

**১. কোটেশন মার্ক ঠিক রাখুন**

```js
✅ title: "আমার নতুন লেখা",
❌ title: "আমার নতুন লেখা,          ← শেষের " বাদ পড়েছে
```

**২. অ্যাপোস্ট্রফি সাবধানে**

লেখার ভেতরে `'` থাকলে সমস্যা হতে পারে। বাঁকানো `’` ব্যবহার করুন:

```js
✅ "I've grown"    (বাঁকানো ’)
⚠️ "I've grown"    (সোজা ' — সাবধানে ব্যবহার করুন)
```

**৩. লিস্টে কমা**

```js
const STEPS = ["এক", "দুই", "তিন"];
                              ↑ শেষেরটায় কমা লাগবে না
```

**৪. `\n` মানে লাইন ব্রেক** — `"Product\nStrategy"` দুই লাইনে দেখাবে।

**৫. `null` মানে খালি ঘর** — মুছবেন না, ডিজাইনের ফাঁকা জায়গা।

---

## ১৩. কিছু ভেঙে গেলে কী করবেন

স্ক্রিন সাদা/কালো হয়ে গেলে বা লেখা উধাও হলে:

1. ব্রাউজারে `F12` চেপে **Console** ট্যাব দেখুন — লাল লেখায় কোন ফাইল আর কত নম্বর লাইনে সমস্যা তা লেখা থাকবে
2. সাধারণত কারণ একটাই — **কোটেশন মার্ক বা কমা বাদ পড়া**
3. ঠিক করতে না পারলে `Ctrl+Z` চেপে আগের অবস্থায় ফিরে যান

**সবকিছু ঠিক আছে কিনা দেখতে:**

```bash
npm run build
```

কোনো লাল এরর না এলে বুঝবেন ঠিক আছে।

---

## ১৪. যেগুলো বদলাবেন না

- `className="..."` — এগুলো ডিজাইন/স্টাইল
- `import` দিয়ে শুরু হওয়া লাইন
- `const` দিয়ে শুরু কিন্তু নাম্বার ধরা জিনিস — যেমন `HERO_H`, `CARD_W`, `GAP` (এগুলো লেআউটের মাপ)
- `useGSAP`, `gsap.`, `motion.` — এগুলো অ্যানিমেশন
- `ref={...}`, `style={{...}}`

**সহজ নিয়ম:** `"` বা `'` চিহ্নের ভেতরে যে লেখাটা মানুষ পড়তে পারে — সেটাই আপনি বদলাতে পারবেন।

---

## ১৫. ছবি বদলাতে চাইলে

সব ছবি আছে `public/assets/` ফোল্ডারে।

1. নতুন ছবি ওই ফোল্ডারে রাখুন
2. কোডে পাথ লিখুন — যেমন `"/assets/আপনার-ছবি.png"`
3. নামে **স্পেস বা বাংলা অক্ষর দেবেন না** — ইংরেজি আর ড্যাশ ব্যবহার করুন (`my-project-cover.png`)
