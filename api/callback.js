/* =========================================================================
   Step 2 of the CMS login — trades GitHub's one-time code for a token and
   hands it back to the CMS window.

   Decap listens for a very specific postMessage handshake; the shape of the
   two messages below is what it expects, not something to tidy up.
   ========================================================================= */

const page = (status, payload) => `<!doctype html>
<html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font:14px system-ui;padding:24px;color:#333">Finishing sign-in…
<script>
(function () {
  function receive(e) {
    if (!e.data || String(e.data).indexOf("authorizing:github") !== 0) return;
    window.removeEventListener("message", receive, false);
    e.source.postMessage(
      'authorization:github:${status}:${JSON.stringify(payload).replace(/</g, "\\\\u003c")}',
      e.origin
    );
  }
  window.addEventListener("message", receive, false);
  // tell the opener we are ready; it answers, and the line above replies with the token
  window.opener && window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body></html>`;

export default async function handler(req, res) {
  const { code, state } = req.query;
  const cookies = Object.fromEntries(
    (req.headers.cookie || "").split(";").map((c) => {
      const i = c.indexOf("=");
      return [c.slice(0, i).trim(), decodeURIComponent(c.slice(i + 1))];
    })
  );

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // clear the one-shot state cookie either way
  res.setHeader("Set-Cookie", "cms_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");

  if (!code || !state || state !== cookies.cms_oauth_state) {
    res.status(400).send(page("error", { message: "Sign-in expired or was tampered with. Close this window and try again." }));
    return;
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await response.json();

    if (!data.access_token) {
      res.status(401).send(page("error", { message: data.error_description || "GitHub refused the sign-in." }));
      return;
    }
    res.status(200).send(page("success", { token: data.access_token, provider: "github" }));
  } catch {
    res.status(500).send(page("error", { message: "Could not reach GitHub. Try again in a moment." }));
  }
}
