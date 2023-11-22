import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Menu } from './Components/homepage-component';
import { UserProfile } from './Components/userpage-components';
import { CreatePost } from './Components/createPosts-component';
import { ViewPost } from './Components/viewPosts-component';
import { Login } from './Components/auth-component';
import { AllPosts } from './Components/allPosts-component';
import { AllPostsTag } from './Components/allPostsTag-component';
import { EditPost } from './Components/editPosts-component';
import { HashRouter, Route } from 'react-router-dom';
import { UserProvider } from './authState';
import { Alert } from './widgets';
import { EditComment } from './Components/editComment-component';

let root = document.getElementById('root');
if (root) {
  const App = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetch('/api/userinfo')
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data: ', error));
    }, []);
    return (
      <UserProvider value={userData}>
        <HashRouter>
          <div>
            <Alert />
            <Menu />
            <Route exact path="/" component={Home} />
            <Route exact path="/tags" component={AllPostsTag} />
            <Route exact path="/createPost" component={CreatePost} />
            <Route exact path="/editPost/:id" component={EditPost} />
            <Route exact path="/editComment/:id" component={EditComment} />
            <Route exact path="/user" component={UserProfile} />
            <Route exact path="/posts" component={AllPosts} />
            <Route exact path="/posts/:id" component={ViewPost} />
            <Route exact path="/login" component={Login} />
          </div>
        </HashRouter>
      </UserProvider>
    );
  };

  createRoot(root).render(<App />);
}