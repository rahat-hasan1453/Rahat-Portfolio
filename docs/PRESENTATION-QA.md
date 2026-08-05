# Q&A prep — "From Figma to Live Site"

Companion to [PRESENTATION-SCRIPT.md](PRESENTATION-SCRIPT.md). The audience is a
design team, not engineers — so most questions will be about **craft, role and
trust**, not about code. The technical questions that do come will be simple.

How to use this: don't memorise. Read it once the night before, and once an hour
before. The point is that no question feels like an ambush.

**Three rules for the whole Q&A**

1. If you don't know, say "I don't know, I'd have to check." You spend the whole
   talk saying the AI is confidently wrong — so you cannot be confidently wrong.
2. Bring every answer back to a *thing that actually happened on this site*. You
   have real stories. Use them instead of opinions.
3. When someone is really asking "is my job safe?", answer that question, not
   the technical one they wrapped it in.

---

## A · Craft and fidelity

**"Did it actually match your Figma, or did you just accept what it gave you?"**

The honest answer is both. Spacing, type and colour came out exact because it
read the real values from the file — my 84px heading with 3.36 letter-spacing
came through as 84 and 3.36. But layout judgement did not. It cropped my case
study images and cut half the picture off, and it sliced my hero text in half at
the bottom of the section. Neither was flagged to me. I found them by looking.
So: values transfer, taste does not.

**"How close is 'close'? Would you ship this to a client?"**

For my own portfolio, yes — it's live. For a client, the honest answer is that
the review burden goes up, not down. This site has no login, no payments and no
user data, and an audit still found real problems. On a client project you'd
want a developer reviewing the output, which means you've changed *when* the
developer is involved, not whether.

**"What about the design system? We have components — this thing writes one-off
code."**

That's the sharpest question in the room and I'd take it seriously. I made one
deliberate decision here: I did not let it build separate mobile components. The
mobile Figma frames existed, and the easy path was a second set of components —
which is exactly how desktop and mobile drift apart and you end up fixing every
bug twice. One component, two sizes. That was my call, not the AI's, and it's a
design-system decision. On a real product with a real library, that judgement
matters more, not less.

**"Does it understand hierarchy, rhythm, contrast — or just copy numbers?"**

Numbers. It's very good at "make this match that frame" and quite bad at "this
section feels heavy." Every time I said something like *the cards are crossing
my grid lines* it fixed it immediately — but it never once told me first.

---

## B · The role question (what they're really asking)

**"Does this replace developers?"**

No, and I want to say that plainly. It removed the *wait* for my own small site.
Everything I listed as going wrong — cropped images, sliced text, a confidently
wrong config that broke my login — is a developer's normal job. What changed is
that a designer can build and test their own idea before asking anyone for time.

**"So do we all need to learn to code now?"**

No. I still can't write this site from a blank file. What I got better at is
*reading* it well enough to know when something's off, and describing what's
wrong precisely. That second skill is just critique. We already have it.

**"Where does the designer's value go, then?"**

It moves to judgement. Somewhere in the middle of this project my job quietly
changed — I stopped making it and started reviewing it. That's not a smaller
job. The whole quality of the site came down to what I noticed and what I chose
to reject.

**"Isn't this just faster mediocrity? Everything AI-built looks the same."**

There's something in that, and the defence is the same as always: the taste has
to come from somewhere. This site looks like my Figma file because my Figma file
existed first. Step one of my process didn't change at all — I designed the
whole thing before any code. AI cannot tell you what is worth building.

---

## C · Process and method

**"How long did it really take, and were you working on it full-time?"**

Give the real number and the real conditions — nineteen days, alongside your
actual job. If someone hears "nineteen days full-time" they'll get the wrong
idea about their own first attempt.

**"How do you brief it? Do you write long specs?"**

Short briefs plus a reference beat long specs. A real thing I typed was one
sentence and a link. The first version was close but the cards crossed my grid
lines, so I said exactly that and it fixed it. It's a critique loop, not a
requirements document.

**"What was the single most useful thing you did?"**

Asking "don't tell me it's good, tell me what's broken." AI wants to agree with
you. Ask "is this good?" and it says yes. You have to ask for the bad news on
purpose, and you have to ask more than once.

**"What did it get wrong that you didn't catch until late?"**

The text one. On screen my case study read perfectly. In the code every space
between the words was missing — a screen reader would have read it as one long
word, Google couldn't read it, and you couldn't copy it. No amount of design
taste finds that. You can only find it by asking.

**"Did it ever confidently lie to you?"**

Yes, and it's the thing I'd most warn people about. It told me a setting would
work, sounded completely certain, and my CMS login broke. *(Optional, if you
want the strongest version of this: while I was preparing this very talk, I
asked it to help with my About page and it rewrote my personal history —
invented a date, invented a team size, and wrote that I had left Selise. I
still work here. It sounded exactly as confident as when it's right.)*

---

## D · Quality, performance, accessibility

**"How do you know it's actually good under the hood if you can't read code?"**

I don't, on my own. That's the honest answer. What I did was ask it to audit
itself and then verify the claims I could see — the site went from 85MB to 24MB,
every page got its own name and address, and shared links show a proper preview
card now. The things I couldn't verify myself, I'd want a developer for.

**"Is it accessible?"**

Partly, and I'd be careful claiming more. The missing-spaces bug was an
accessibility bug I shipped without knowing. I've fixed what got found. I have
not done a full audit with a screen reader, and I wouldn't claim a site is
accessible without one.

**"What about performance on a slow connection in Bangladesh?"**

Fair, and this is where I learned the most. There was one image on my site that
was 9.4MB, sitting behind the footer, blurred — nobody could ever see it
properly and I was shipping it to every visitor. You feel a heavy image very
differently when you're the one shipping it.

---

## E · Using it at Selise / on client work

**"Could we use this on a client project?"**

Careful here, and it's fine to be careful in public. My portfolio has no login,
no payments, no user data. The audit found real problems on a *small* site. On
client work: more review, not less; a developer in the loop; and someone has to
answer the client data and IP questions before anyone pastes anything into a
tool.

**"What about NDAs and client IP? You're sending our work to a third party."**

Say plainly that this is a policy question, not a designer's call, and that on
this project the only thing at risk was my own portfolio. Don't improvise a
company position from the stage. If people want to push, offer to take it
offline with whoever owns that policy.

**"How would this change hand-off?"**

The interesting version isn't "designers write the code." It's that I can hand
over something that *runs* instead of a spec — you can feel the scroll and the
motion instead of imagining them. And I can fix a wrong colour myself instead of
filing a ticket for it.

**"Would you have built it differently if a developer had to maintain it?"**

Yes. Some of this is composed on a fixed canvas with values from Figma, which is
great for matching a design exactly and not how you'd build a product with a
long life. That's a real trade-off and I'd own it.

---

## F · Practical

**"What did it cost?"**

The tool subscription, and hosting is free at this size. Give the real numbers;
vagueness here reads as hiding something.

**"What tools exactly?"**

Figma for design, an AI coding assistant, GitHub to store it, Vercel to put it
online. Publishing is: I save, and it's live in about two minutes. If I break
something, going back is one click — that safety is what made me brave enough to
keep changing things.

**"How do I start? I've never touched code."**

Design something small you actually want to exist. Build that. Then ask it what
is broken. Don't start with a client project and don't start with something big.

**"What do I do when it breaks and I don't understand the error?"**

Paste the error back and say "explain this to me like I don't know what it
means." That works far more often than it should. And keep saving your work —
being able to go back one step is what makes the whole thing safe to try.

---

## G · The hard ones

**"Aren't you just doing a developer's job badly, for free?"**

Take it in good humour and answer it straight: for my own portfolio, I'd
otherwise be waiting on a favour. I'm not proposing designers absorb engineering
work. If anything this made me *more* respectful of what developers catch that
I can't — I have a list.

**"How much of that site is actually yours?"**

The design is entirely mine. The words are mine. The decisions about what to
keep, what to reject and what to fix are mine. The typing isn't. I think the
typing was never the part that made it mine.

**"What if it's wrong about something and you never find out?"**

That's the real risk and I don't have a clean answer. The missing-spaces bug
lived on my site for a while and looked perfect the whole time. The only defence
I've found is asking for bad news on purpose, repeatedly, and accepting that a
small site is a much safer place to learn that lesson than a client's product.

**"You found a bug while preparing this talk, didn't you?"** *(if you use the
live-demo bit)*

Yes — my own admin page. Opening it at one address worked and at a slightly
different address it broke completely, because of a missing slash. It had
probably been broken for days. It's a good illustration of the whole talk: the
tool built it fast, and the tool didn't notice. Someone has to look.

---

## Questions to ask *them*

If Q&A goes quiet, turn it around — this is a design team, they'll engage:

- "Who here has waited more than a week for a fix you could describe in one
  sentence?"
- "If you could ship your own prototype to a real URL tomorrow, what would you
  test that you can't test now?"
- "What's the thing in your work that you'd never let a tool decide?"

---

## Before you present

- [ ] Screenshot in the empty box on slide 3
- [ ] Live site open in a tab
- [ ] Access code (**1453**) ready
- [ ] Check the site on your phone
- [ ] **Open `/admin` on the live site once** — confirm the CMS login screen
      appears (see the fix note in [CMS.md](CMS.md)) before you demo it
- [ ] Decide whether you're using the "it rewrote my own history" anecdote — it's
      the strongest honesty beat you have, but it's personal. Your call.
