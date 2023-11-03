import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home,
  TagList,
  FavoriteList,
  UserProfile,
  Posts,
  TagPosts,
  Post,
} from './whiteboard-component';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Todo App">
        <NavBar.Link to="/">Tasks</NavBar.Link>
      </NavBar>
    );
  }
}

let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/tags" component={TagList} />
        <Route exact path="/favorites" component={FavoriteList} />
        <Route exact path="/user" component={UserProfile} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/tag/:id" component={TagPosts} />
        <Route exact path="/posts/tag/:id/post/:id" component={Post} />
      </div>
    </HashRouter>,
  );
