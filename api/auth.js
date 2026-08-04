import { randomBytes } from "node:crypto";

/* =========================================================================
   Step 1 of the CMS login — hands the visitor off to GitHub.

   Decap opens this in a popup. GitHub's OAuth exchange needs a client SECRET,
   which can never live in browser code, so it happens here and in callback.js.
   Running it as a function in this same Vercel project means no second service
   and no extra domain.

   Requires two environment variables in the Vercel project:
     GITHUB_CLIENT_ID
     GITHUB_CLIENT_SECRET

   Note who can actually get in: GitHub only issues a token for someone who is
   signed in, and the token is only useful if that account has write access to
   the repo. /admin being publicly reachable is therefore fine — strangers can
   load the page, but they cannot commit.
   ========================================================================= */
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("GITHUB_CLIENT_ID is not set on this deployment.");
    return;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const redirectUri = `https://${host}/api/callback`;

  // CSRF guard: the same value goes out to GitHub and into a short-lived
  // cookie, and callback.js refuses to continue unless the two agree.
  const state = randomBytes(16).toString("hex");

  const url =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&scope=repo" +
    `&state=${state}`;

  res.setHeader("Set-Cookie", `cms_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.writeHead(302, { Location: url });
  res.end();
}
