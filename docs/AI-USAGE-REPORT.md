# AI usage report — building this portfolio

Measured from your own session logs in
`~/.claude/projects/-Users-rahat-Documents-Rahat---Portfolio/` — 11 sessions,
241MB of transcripts, **9 July → 3 August 2026**.

---

## Read this first — three honest caveats

**1 · The token numbers are exact. The section split is an estimate.**
Every API call in those logs records its real token usage, so the totals below
are measured, not guessed. But the logs don't label work by "section" — I
attributed each call to whichever project file it last touched. A call spent
discussing the Footer while `Menu.jsx` was open lands under Menu. Treat the
section table as **accurate to within roughly ±15%**, good enough to rank
sections, not precise enough to quote to the rupee.

**2 · The dollar figures are a yardstick, not a bill.**
You were on a Claude Code subscription, which bills by usage limits, not
per-token. **You did not pay $8,211.** That figure is what the same tokens would
cost at published API list prices, and I'm using it purely because it weighs
expensive tokens against cheap ones correctly. Read it as *relative effort*.

**3 · One model's rate is unknown to me.**
`claude-fable-5` accounts for 31% of the total and I don't know its published
rate, so I applied Opus rates to it. If Fable is cheaper, the real total is
lower.

---

## The headline

| | |
|---|---|
| Sessions | 11 |
| API calls | 9,857 |
| **Total tokens** | **3,231,208,083** (3.23 billion) |
| Output tokens (actual work produced) | 9,061,350 |
| Illustrative cost at list prices | ~$8,200 |
| Period | 26 days |

---

## Where it actually went — this is the finding

This is the single most important table in the report.

| Token type | Share of cost | What it is |
|---|---:|---|
| Cache read | **50.1%** | Re-sending the conversation you'd already had |
| Cache write | **42.3%** | Storing that conversation so it can be re-sent |
| **Output** | **7.5%** | **The actual code and answers** |
| Fresh input | 0.1% | Your typed messages |

**92% of the cost was carrying context around. 7.5% was producing work.**

Two numbers that make it concrete:

- Average context re-read **per API call: 306,132 tokens**
- Average output **per API call: 919 tokens**

That's a ratio of **355 : 1**. For every word of code produced, roughly 355
words of prior conversation were shipped back to the model to produce it.

This is not waste in the sense of a mistake — the model genuinely needs context.
But 306K is a *very* full context window, and it got that full because sessions
ran long. Everything in the savings section below follows from this one fact.

---

## Cost by section

Sorted by share. "Turns" = times you came back with a new instruction.

| Section | Calls | Your turns | Output tokens | Share |
|---|---:|---:|---:|---:|
| Menu / header | 1,432 | 35 | 1,388,762 | **23.6%** |
| Footer | 2,006 | 31 | 1,638,546 | **15.3%** |
| Hero (homepage) | 950 | 24 | 1,007,105 | **14.8%** |
| About page (`/about`) | 1,328 | 24 | 1,065,132 | 9.1% |
| Case-study rail (homepage) | 857 | 9 | 911,601 | 8.7% |
| Case-studies list | 457 | 8 | 417,489 | 6.3% |
| Loader | 287 | 7 | 422,293 | 4.8% |
| Docs / guides | 346 | 16 | 583,267 | 3.2% |
| Access gate | 483 | 5 | 360,991 | 3.2% |
| Logo ticker | 331 | 8 | 240,768 | 2.2% |
| App shell / routing | 233 | 2 | 180,699 | 2.1% |
| Global CSS / type scale | 121 | 1 | 122,479 | 1.5% |
| Deploy config | 148 | 6 | 126,935 | 1.2% |
| CMS | 87 | 4 | 95,166 | 1.0% |
| Exploration / conversation | 493 | 15 | 278,882 | 1.0% |
| About strip (homepage) | 133 | 0 | 71,766 | 0.9% |
| Everything else | 165 | 1 | 149,469 | 1.1% |

**The top three — Menu, Footer, Hero — are 54% of the whole project.**

That's worth sitting with. The Menu is a header and a slide-out panel. The
Footer is a booking widget and some links. Neither is the intellectually hard
part of the site, and together they cost more than the About page, both case
study pages, the access gate and the entire CMS combined.

---

## The iteration evidence

Edits per file — this is what "korte korte thik korechi" looks like in numbers:

| File | Edits | Reads |
|---|---:|---:|
| `AboutPage.jsx` | 134 | 33 |
| `Menu.jsx` | 126 | 23 |
| `Footer.jsx` | 91 | **51** |
| `Hero.jsx` | 61 | 29 |
| `CaseStudy.jsx` | 60 | 20 |
| `Loader.jsx` | 43 | — |
| `Logos.jsx` | 38 | 13 |

`Footer.jsx` was **read 51 separate times**. It's a 481-line file, so that's
roughly 25,000 lines of the same file re-read across the project — and each
read landed in a context window that then got re-sent on every following call.

The reads are the cheaper half of the problem. The expensive half is that each
read made every *subsequent* call in that session bigger.

---

## The one expensive day

| Session | Date | Calls | Avg context | Share of total |
|---|---|---:|---:|---:|
| `523904c9` | 9 Jul | 1,899 | 255,882 | 16% |
| `59431c24` | 10 Jul | 969 | 282,719 | 11% |
| `724a793f` | 10 Jul | 1,028 | 291,731 | 13% |
| `65bec2a9` | 14 Jul | 211 | 110,758 | 1% |
| `c4dace31` | 18 Jul | 66 | 37,990 | 0.1% |
| `10cdac31` | 19 Jul | 314 | 136,218 | 1% |
| **`dd0c9365`** | **19 Jul** | **2,691** | **390,838** | **41%** |
| `42628f59` | 29 Jul | 972 | 412,811 | 14% |
| `a1bcdeb7` | 2 Aug | 452 | 135,608 | 2% |
| `c373b3d9` | 2 Aug | 212 | 80,216 | 1% |
| `9a6b8120` | 3 Aug | 1,049 | 342,042 | 10% |

**One session on 19 July was 41% of the entire project.** 2,691 calls in a
single unbroken conversation, with an average context of 391K tokens.

Now compare the two ends of that table. Session `c4dace31` averaged **38K**
context. Session `42628f59` averaged **413K** — eleven times more expensive per
call, for work that wasn't eleven times harder. The difference isn't the task.
It's how long the conversation had been running.

---

## Comparison: what it cost vs. what it could have cost

Two alternative scenarios. **Both are models, not measurements** — I'm holding
the work constant and changing only how it was requested. The arithmetic is
shown so you can check it.

### Scenario A — what actually happened

```
9,857 calls × 306K avg context   = 3.02B cache-read tokens
                                 +  204M cache-write tokens
                                 + 9.06M output tokens
                                 ≈ $8,200
```

### Scenario B — same work, disciplined sessions

Change one thing: **start a fresh session for each section** instead of running
one conversation for hours. Your own short sessions prove this is achievable —
`c4dace31` held 38K, `c373b3d9` held 80K. Assume a 100K average.

```
9,857 calls × 100K avg context   = 986M cache-read tokens
same output (the work is the work) = 9.06M
                                 ≈ $3,100
```

**Saving: ~$5,100 — about 62%.** No design compromise. Same number of
iterations, same result. You'd just be re-sending less history each time.

### Scenario C — "perfect", with tighter briefs too

Now also assume ~40% fewer iterations, from giving exact values and batching
related changes rather than one tweak per message.

```
5,900 calls × 80K avg context    = 472M cache-read tokens
output ~5.4M
                                 ≈ $1,600
```

**Saving: ~$6,600 — about 80%.**

| Scenario | Est. cost | Saving |
|---|---:|---:|
| A · What happened | ~$8,200 | — |
| B · Disciplined sessions | ~$3,100 | 62% |
| C · Sessions + tight briefs | ~$1,600 | 80% |

### An important honesty note about Scenario C

**Scenario C is not a target you should have hit.** A large share of those 134
edits to `AboutPage.jsx` and 126 to `Menu.jsx` were you making design decisions
— looking at something, disliking it, changing it. That *is* the work. That's
the loop your presentation is built on, and it's the reason the site looks like
your Figma file instead of a template.

The recoverable waste is mechanical, not creative:

- **Scenario B is nearly free money.** It costs you nothing but a habit.
- **Half of C's extra saving is real** — exact values instead of "a bit more",
  batching five tweaks into one message.
- **The other half would have cost you design quality**, and wasn't worth
  saving.

A realistic target for a project like this is **$2,000–2,500 — a 70% saving** —
with the same site at the end.

---

## 10 things you didn't do that would have saved the most

Ranked by how much they'd actually have saved, based on the data above.

### 1 · Start a new session for each section
**The single biggest lever — worth more than the other nine combined.**
Your 19 July session ran to 2,691 calls and 391K average context. Every message
in the last hour was paying to re-send the first hour. Finish the Footer, close
the session, start a new one for the Hero. Nothing is lost — the code is on
disk, which is the only memory that matters.

### 2 · Say the viewport before describing the problem
"The spacing is wrong" → I have to establish *where* before I can fix anything.
"On mobile at 375, the gap under the headline is too big" is one round trip
instead of three. Mobile work was a large share of Menu, Footer and Hero — your
three most expensive sections.

### 3 · Give the number, not the direction
"A bit more space", "slightly bigger", "make it tighter" each cost a full cycle
to converge, and often two or three. "Change the gap from 20 to 32" lands
first time. You're a designer — you already know the number. Saying it out loud
is free.

### 4 · Batch related changes into one message
`Menu.jsx` took 126 edits. Many arrived one at a time, each paying full context
price. Five changes in one message cost roughly one message. Keep a short list
as you review, then send the list.

### 5 · Point at the file and line
"In `Footer.jsx` around line 300, the bubble pill…" skips the search entirely.
`Footer.jsx` was read 51 times, and a good share of those reads were me
orienting myself in a file you could have pointed straight at.

### 6 · Say when a section is finished
"Footer is done, don't touch it again" lets everything about the Footer stop
being relevant. Without that signal it stays in context for the rest of the
session, being re-sent on every call.

### 7 · Use a cheaper model for mechanical work
Your own logs make this stark: **1,211 Haiku calls cost about $18. 3,058 Opus
calls cost about $2,868.** Renaming things, moving constants, writing content
files, formatting — none of that needs the expensive model. Design judgement
and tricky animation do.

### 8 · Ask for the plan before the code on anything large
The responsive overhaul and the case-study rail were both large rewrites that
went through several near-complete versions. "Tell me your approach in five
lines first" costs a few hundred tokens and can save an entire wrong
implementation.

### 9 · Don't paste a file back to me
If the file is on disk, I can read it. Pasting it in adds it to context
permanently, on top of the copy I already read. A path is enough.

### 10 · Ask "what's broken?" earlier, not at the end
You already know this one — it's slide 15 of your talk. The point here is
about *timing*. The audit that found the 9.4MB image and the missing spaces ran
near the end of the project. Run that after each section instead, and you fix
things while the context is small and the fix is cheap, rather than reopening
finished work when the window is already full.

---

## The one-sentence version

You spent about 92% of your tokens re-sending conversation and 7.5% producing
work; the fix is not to iterate less on the design, it's to keep each
conversation short and say the number you already have in your head.

---

*Method: parsed every `assistant` record across 11 session transcripts for
`usage.input_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`
and `output_tokens`. Sections attributed by the last project file touched by a
tool call in each message. Costs computed per model at published list rates —
Opus $15/$18.75/$1.50/$75 per MTok (in/cache-write/cache-read/out), Sonnet
$3/$3.75/$0.30/$15, Haiku 4.5 $1/$1.25/$0.10/$5; `claude-fable-5` priced at
Opus rates as its published rate was not known to me.*
