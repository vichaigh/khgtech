export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).send('Method not allowed');
  }

  const { code, error, error_description: errorDescription } = request.query;

  if (error) {
    return response.status(400).send(errorDescription || error);
  }

  if (!code || typeof code !== 'string') {
    return response.redirect(302, '/api/tiktok-login');
  }

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  return response.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Authorization Code</title>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: #f4f7f4;
        color: #18241c;
        font-family: Arial, Helvetica, sans-serif;
      }

      main {
        width: min(92vw, 560px);
        padding: 28px;
        background: #ffffff;
        border: 1px solid #d9e4da;
        border-radius: 8px;
        box-shadow: 0 18px 45px rgba(20, 50, 28, 0.12);
      }

      h1 {
        margin: 0 0 8px;
        font-size: 24px;
        line-height: 1.2;
      }

      p {
        margin: 0 0 18px;
        color: #5d6b61;
        line-height: 1.5;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 14px;
      }

      textarea {
        width: 100%;
        min-height: 132px;
        resize: vertical;
        padding: 12px;
        border: 1px solid #b9c8bb;
        border-radius: 6px;
        color: #152019;
        background: #fbfdfb;
        font: 14px/1.5 Consolas, Monaco, monospace;
      }

      button {
        width: 100%;
        margin-top: 14px;
        padding: 12px 16px;
        border: 0;
        border-radius: 6px;
        background: #167a3f;
        color: #ffffff;
        font-weight: 700;
        cursor: pointer;
      }

      button:hover {
        background: #106532;
      }

      .status {
        min-height: 20px;
        margin-top: 10px;
        color: #167a3f;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Authorization Code</h1>
      <p>Copy this code and paste it into your token exchange form.</p>
      <label for="code">Code</label>
      <textarea id="code" readonly>${escapeHtml(code)}</textarea>
      <button id="copy" type="button">Copy code</button>
      <div id="status" class="status" role="status" aria-live="polite"></div>
    </main>
    <script>
      const code = document.getElementById('code');
      const status = document.getElementById('status');
      document.getElementById('copy').addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.value);
          status.textContent = 'Copied to clipboard.';
        } catch {
          code.select();
          document.execCommand('copy');
          status.textContent = 'Copied to clipboard.';
        }
      });
    </script>
  </body>
</html>`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
