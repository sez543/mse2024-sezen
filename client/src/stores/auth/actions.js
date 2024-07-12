export const AUTH_STORAGE_ID = 'authStorageForum';

const fetchUserData = async (username, token) => {
  const AuthHeaders = new Headers();

  AuthHeaders.append('Content-Type', 'application/json');
  AuthHeaders.append('Authorization', `Bearer ${token}`);

  const userDataResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/users/${username}`, {
    headers: AuthHeaders,
    method: 'GET'
  });

  if (!userDataResponse.ok) {
    return null;
  }

  const userData = await userDataResponse.json();
  return userData;
};

export async function handleLogin(username, password) {
  try {
    const LoginHeaders = new Headers();
    LoginHeaders.append('Content-Type', 'application/json');

    const loginResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/auth/login`, {
      body: JSON.stringify({
        username: username,
        password: password
      }),
      method: 'POST',
      headers: LoginHeaders
    });

    if (loginResponse.ok) {
      const responseJSON = await loginResponse.json();
      const tokenValue = responseJSON.token;
      const userData = await fetchUserData(username, tokenValue);

      if (!userData) {
        return {type: 'LOGIN_ERROR', payload: 'Error getting user information from server!'};
      }

      const authResult = {
        userData: userData,
        token: {
          start: Date.now(),
          value: tokenValue,
          expiration: responseJSON.expiresIn
        }
      };

      localStorage.setItem(AUTH_STORAGE_ID, JSON.stringify(authResult));

      return {type: 'LOGIN_SUCCESS', payload: authResult};
    } else {
      return {type: 'LOGIN_ERROR', payload: 'Login failed! Invalid username or password'};
    }
  } catch (error) {
    return {type: 'LOGIN_ERROR', payload: error};
  }
}

export function handleLogout() {
  localStorage.removeItem(AUTH_STORAGE_ID);
  return {type: 'LOGIN_TERMINATE'};
}

export async function handleRegister (registerPayload) {
  try {
    const RegisteredHeaders = new Headers();
    RegisteredHeaders.append('Content-Type', 'application/json');

    const registerResponse = await fetch(`${import.meta.env.VITE_FORUM_BACKEND_SERVER}/auth/signup`, {
      body: JSON.stringify(registerPayload),
      method: 'POST',
      headers: RegisteredHeaders
    });

    if (registerResponse.ok) {
      const responseJSON = await registerResponse.json();

      if (!responseJSON.username || !responseJSON.password) {
        return {type: 'REGISTER_ERROR', payload: 'Error getting user information from server!'};
      }

      return {type: 'REGISTER_SUCCESS', payload: responseJSON};
    } else {
      return {type: 'REGISTER_ERROR', payload: 'Registration failed! Username or email already exist'};
    }
  } catch (error) {
    return {type: 'REGISTER_ERROR', payload: error};
  }
}