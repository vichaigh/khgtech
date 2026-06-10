const getCookie = (request, name) => {
  const cookies = request.headers.cookie || '';
  const match = cookies
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : '';
};

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = getCookie(request, 'tiktok_access_token');
  return response.status(200).json({
    ok: true,
    authenticated: Boolean(token),
    access_token: token || null,
  });
}
