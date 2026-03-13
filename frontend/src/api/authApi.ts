export async function login(username: string, password: string): Promise<boolean> {
  const res = await fetch('/api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return true;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function getToken() {
  return localStorage.getItem('access_token');
}

export async function fetchMe() {
  const res = await fetch('/api/me/', {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}