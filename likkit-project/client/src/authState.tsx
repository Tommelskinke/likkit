import React from 'react';

interface UserData {
  user_id: number;
  email?: string;
  user_type: string;
  username?: string;
  user_pfp?: string;
}

// Example using Fetch API in a frontend JavaScript
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
    // Now you have user data, including the profile picture URL
    // You can display this data in your UI
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
      // Handle error case
    });
}

// Create a context with an initial empty state
export const UserContext = React.createContext<UserData | null>(null);

// Export the provider as a separate component for convenience
export const UserProvider = UserContext.Provider;
