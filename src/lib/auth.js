export function saveToken(token) {
  localStorage.setItem('album-token', token);
}

export function getToken() {
  return localStorage.getItem('album-token');
}

export function decodeToken() {
  const token = getToken();
  if (!token) return {};
  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded;
}

export function tokenUsername() {
  return decodeToken().username;
}

export function tokenUserId() {
  return decodeToken().sub;
}

export function deleteToken() {
  localStorage.removeItem('album-token');
}

export function isAuthenticated() {
  return !!getToken();
}


export function authorizationHeader() {
  return {
    headers: { Authorization: 'Bearer ' + getToken() }
  };
}
