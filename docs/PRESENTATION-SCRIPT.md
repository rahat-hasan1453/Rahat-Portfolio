# From Figma to Live Site — speaker script

24 slides · about 25 minutes · Selise team

Figma Slides has no speaker-notes field the plugin can write to, so the script
lives here. Keep it on your phone or a second screen.

Rough timing: **~1 minute per slide**, except where marked. Slides 15–17 are the
heart of the talk — slow down there.

---

### 1 · From Figma to Live Site

> "I want to show you something I did over the last three weeks. I designed my
> portfolio, and then I built it and put it online myself. No developer. I want
> to show you how, and I want to be honest about the parts that went wrong."

Set the tone early: this is a real story, not a sales pitch for AI.

---

### 2 · Can a designer ship a real website alone?

> "This was my question. Not a prototype, not a clickable Figma file — a real
> site, on a real address, that you can open right now on your phone."

Pause here. Let people think about their own answer.

---

### 3 · Yes. rahat-uxd.vercel.app

> "The answer turned out to be yes. This is live. Open it while I talk if you
> want — it works on your phone."

*Drop a homepage screenshot into the empty box before you present.*

---

### 4 · The whole project in four numbers

> "Nineteen days from starting to being live. Twenty-eight saves along the way.
> One person. Zero developers. And that includes the design, the writing, the
> testing and putting it online."

---

### 5 · How my work used to end (~1.5 min)

Walk down the list slowly. Land on line 5.

> "Every designer here knows this feeling. You hand it off, you wait, and what
> comes back is close but not right. The design was mine. The result was not."

This is the emotional hook. Don't rush it.

---

### 6 · What changed

> "What changed is that the AI can open my actual Figma file and read it — not
> look at a picture of it, read it. But the important line is the second one: I
> stayed the designer. It never decided anything. I decided everything."

---

### 7 · The eight steps

> "Here is the whole process. I'll walk through each one quickly."

Don't explain them here — just show the shape of the talk.

---

### 8 · Design first

> "Step one did not change at all. I designed the whole thing in Figma first.
> AI cannot tell you what is worth building. That is still our job."

Reassuring point for the designers in the room.

---

### 9 · From Figma to real code (~1.5 min)

> "This is the part that surprised me. It reads the real values out of my file.
> My heading is 84 pixels with 3.36 letter spacing — it used exactly that. Not
> 'about 84'. This is the step that always used to get lost in hand-off."

---

### 10 · Proof — the About page

> "I pointed it at one frame. It rebuilt the whole page and pulled the twelve
> tool logos straight out of my file as real files. I measured nothing by hand."

---

### 11 · The loop that did the real work (~2 min)

> "This is really the whole method. I ask, I look at it live, I say what feels
> wrong, it fixes it. Minutes, not days. And somewhere in there my job quietly
> changed — I stopped making it and started judging it."

Say the last line slowly. It sets up the ending.

---

### 12 · An example

> "Here is a real thing I typed. That was the whole brief — one sentence and a
> reference. The first version was close but the cards crossed my grid lines, so
> I said that, and it fixed it. A reference plus honest feedback beat a long
> written spec."

---

### 13 · One component, two sizes

> "The mobile design had its own Figma frames. But I did not let it build
> separate mobile components — that is how desktop and mobile drift apart and
> you end up fixing every bug twice. This was my call, not the AI's. It is a
> design-system decision, and those are still ours."

---

### 14 · Real content

> "I pointed it at my Dribbble profile and it pulled three real case studies in
> — the writing and every image. And the content now lives outside the layout,
> so the words are not trapped inside the code."

---

### 15 · "Don't tell me it's good. Tell me what's broken." (~2 min)

**The turn in the talk. Slow right down.**

> "This was the single most useful thing I asked. AI wants to agree with you.
> If you ask 'is this good?', it will say yes. You have to ask for the bad news
> on purpose."

---

### 16 · Five things I could not see (~2 min)

Go one by one. Let the 9.4 MB one land.

> "There was one image on my site that was nine and a half megabytes. It sat
> behind the footer, and it was blurred anyway. Nobody could ever see it
> properly. I had been shipping that to every visitor."

---

### 17 · A bug you cannot see (~2 min)

**The strongest slide. Take your time.**

> "This one genuinely scared me. On screen my case study read perfectly. But in
> the code every space was missing. A screen reader would read that as one long
> word. Google could not read it. You could not copy it.
>
> No amount of design taste catches this. You cannot see it. You can only find
> it by asking."

---

### 18 · Before → after

> "After the fixes: the site went from 85 megabytes to 24. Every page got its
> own name. The links became clean addresses. And sharing a link finally shows
> a proper preview card instead of nothing."

---

### 19 · Putting it on the internet

> "I save my work and it is live in about two minutes. No server to manage. And
> if I break something, going back is one click. That safety is what made me
> brave enough to keep changing things."

---

### 20 · Handing myself the keys

> "The last thing I built was a small admin page on my own site. Adding a case
> study is now filling in a form and pressing publish. No code, no terminal,
> nobody to ask. That is what independence actually looks like."

---

### 21 · What the AI got wrong (~2 min)

**Do not skip this. It is what makes the whole talk credible.**

> "It cropped my case study images and cut half the picture off — it did not
> notice, I did. It sliced the text at the bottom of my hero section in half —
> I caught that too. And it told me a setting would work, confidently, and the
> login broke.
>
> It is fast. It is not the reviewer. I am."

---

### 22 · The skill is not typing. It is asking.

> "These three questions did more for the quality of this site than anything
> else I typed. Notice none of them are technical. They are the questions a
> good designer already asks in a critique.
>
> Our design judgement became the quality control. That part did not get
> automated."

---

### 23 · What I think this means for us (~2 min)

Adapt this to the room — this is where colleagues decide if it's relevant.

> "I am not saying we should all become developers. But being able to build a
> working version changes what we can do: we can test how scroll and motion
> actually feel, we can hand over something that runs instead of a spec, and we
> can fix a wrong colour ourselves instead of filing a ticket.
>
> And you learn what things cost. You feel a heavy image differently when you
> are the one shipping it."

---

### 24 · Thank you

> "The site is live at this address. Open it, try to break it, and tell me what
> you find — that is exactly what I've been doing for three weeks."

Then demo live if there's time: the sideways scroll, a case study, the
access code, and `/admin`.

---

## If you get asked…

**"How much did it cost?"**
Be honest about the tool subscription and that hosting is free at this size.

**"Could it do a client project?"**
Careful here. Say: my portfolio has no login, no payments, no user data. The
audit found real problems on a *small* site. On a client project the review
burden goes up, not down.

**"Does this replace developers?"**
No — and say it plainly. It removed the wait for *my own small site*. Everything
in slide 21 is a developer's normal job. What changed is that a designer can now
build and test their own ideas before asking anyone.

**"How do I start?"**
Design something small you actually want. Build that. Then ask it what's broken.

---

## Before you present

- [ ] Put a homepage screenshot in the empty box on slide 3
- [ ] Open the live site in a tab, ready to demo
- [ ] Have the access code (**1453**) ready if you demo a case study
- [ ] Check the site on your phone once — people will open it while you talk
