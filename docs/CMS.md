# Editing the site

Content lives in `/content` as JSON. You can edit it two ways: through the CMS
at `/admin`, or by editing the files directly. Both do the same thing.

---

## One-time setup on Vercel

The CMS commits to `rahat-hasan1453/Rahat-Portfolio` on your behalf, so GitHub
has to be told that's allowed. The OAuth exchange runs as two serverless
functions already in this project — `api/auth.js` and `api/callback.js` — so
there is no second service to deploy and no extra domain.

**1. Register a GitHub OAuth app**

GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**

| Field | Value |
| --- | --- |
| Application name | `Portfolio CMS` |
| Homepage URL | your live site URL |
| Authorization callback URL | `https://YOUR-DOMAIN/api/callback` |

Press **Generate a new client secret** and keep both values.

**2. Add them to Vercel**

Vercel → your project → Settings → Environment Variables. Add both to
**Production** *and* **Preview**:

| Name | Value |
| --- | --- |
| `GITHUB_CLIENT_ID` | from step 1 |
| `GITHUB_CLIENT_SECRET` | from step 1 |

Secrets belong here, never in the repo. `api/auth.js` reads them at request
time and returns a clear error if they are missing.

**3. Redeploy**, so the functions pick up the variables.

If you ever move to a custom domain, update `base_url` in
[`public/admin/config.yml`](../public/admin/config.yml) and the OAuth app's
callback URL to match — otherwise the login popup goes to the old address.

Then open `https://YOUR-DOMAIN/admin/` and click **Login with GitHub**.

**Who can get in:** GitHub only issues a token to a signed-in account, and the
token is only useful if that account has write access to the repo. `/admin`
being publicly reachable is fine — strangers can load the page but cannot
commit. It is also excluded from search engines.

---

## Using it right now, on your machine

You don't need any of the setup above to start writing. Two terminals:

```
npm run cms     # the local proxy — lets the CMS write files directly
npm run dev     # the site
```

Then open **http://localhost:5173/admin/** and click **Login** — no account, no
password, no GitHub. Edits save straight into `/content` on disk, exactly as if
you had typed them by hand, and the site hot-reloads as you go. Commit and push
when you're happy.

This is the fastest way to add a case study today. The GitHub setup above is
only needed to edit from a browser anywhere else — including your phone.

---

## Adding a case study

`/admin` → **Case Studies** → **New Case Study**.

| Field | Notes |
| --- | --- |
| Order | Lower numbers come first. Existing studies are 10, 20, 30 — use 40 for the next one, or renumber to reorder. |
| URL slug | Becomes `/case-studies/your-slug`. **Don't change it after you've shared the link** — old links would break. |
| Title | The page heading and the card title. |
| Short description | Two sentences max. Doubles as the Google result and the link-preview text, so lead with the outcome. |
| Tags | Exactly three. They render as one joined pill group. |
| Categories | Exactly two. |
| Access code | Leave blank to use the shared code. Fill it in to give this study its own. |
| Images | In order. See below. |
| Context / Problem / Challenges / Solutions / Conclusion | The body of the page. |

**Image order matters:**

1. First image — the cover: the card on the homepage and list page, the page
   hero, and the link-preview image.
2. Next three — the gallery above the Problem Statement.
3. Everything after — Design Exploration.

You never enter image sizes. They're read from the files at build time, and the
page lays each one out at its own aspect ratio so nothing is cropped —
landscape shots get a full-width row, portraits pair up side by side.

Publish, wait a minute or two for the rebuild, and the study is live. The
sitemap, the per-page titles and the link previews regenerate on their own.

---

## Changing the access code

`/admin` → **Settings** → **Access & contact**.

- **Shared access code** — used by every study that doesn't set its own.
- **How long an unlock lasts** — after this many minutes, that study asks
  again. Each study is timed separately, and unlocking one never unlocks
  another.
- **Contact email** — shown in the prompt so someone without a code can ask.

⚠️ **This is a courtesy gate, not security.** The code is checked in the
browser, so anyone who opens developer tools can read it. It keeps client work
out of casual browsing and off search results; it will not stop someone who is
determined. If you ever need real protection, the study content has to move
behind a server check — ask and it can be built.

---

## Editing without the CMS

The CMS is only a form over these files — editing them directly is equally
valid:

```
content/
  settings.json              shared code, unlock window, contact email
  case-studies/
    lets-meet.json
    d-pass.json
    ai-agent.json
public/assets/cs/<slug>/     that study's images
```

After adding images, `npm run dev` and `npm run build` both measure them
automatically. `src/data/imageSizes.json` is generated — don't edit it.

---

## How a publish reaches the site

```
/admin  →  commit to GitHub  →  Vercel rebuilds  →  npm run build
                                                    ├─ measure images
                                                    ├─ bundle the app
                                                    └─ write per-route HTML,
                                                       robots.txt, sitemap.xml
```

The domain is set in one place — `SITE_URL` in
[`src/lib/seo.js`](../src/lib/seo.js). Change it there and the canonicals,
preview cards, sitemap and robots.txt all follow.
