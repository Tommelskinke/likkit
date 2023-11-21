import React from 'react';

interface UserData {
  user_id: number;
  email?: string;
  user_type: string;
  username?: string;
  user_pfp?: string;
}

fetch('/api/userinfo')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    return response.json();
  })
  .then((userData) => {
    console.log(userData);
    sessionStorage.setItem('user_id', userData.user_id);
    sessionStorage.setItem('email', userData.email);
    sessionStorage.setItem('user_type', userData.user_type);
    sessionStorage.setItem('username', userData.username);
    sessionStorage.setItem('user_pfp', userData.user_pfp);
  })
  .catch((error) => console.error(error));

export function handleLogout() {
  fetch('/logout')
    .then((response) => {
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Failed to log out');
      }
    })
    .catch((error) => {
      console.error('Logout error: ', error);
    });
}

export const UserContext = React.createContext<UserData | null>(null);

export const UserProvider = UserContext.Provider;
