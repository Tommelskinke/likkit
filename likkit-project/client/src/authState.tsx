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
    // Now you have user data, including the profile picture URL
    // You can display this data in your UI
  })
  .catch((error) => console.error(error));

// Create a context with an initial empty state
export const UserContext = React.createContext<UserData | null>(null);

// Export the provider as a separate component for convenience
export const UserProvider = UserContext.Provider;
