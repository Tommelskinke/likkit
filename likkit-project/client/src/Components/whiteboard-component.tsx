import * as React from 'react';
import { Component } from 'react-simplified';
import whiteboardService, { Subscription } from '../whiteboard-service';
import { Alert, Card, Row, Column, Form, Button, NavBar } from '../widgets';

export class Whiteboard extends Component {
  canvas: HTMLCanvasElement | null = null;
  lastPos: { x: number; y: number } | null = null;
  subscription: Subscription | null = null;
  connected = false;

  render() {
    return (
      <>
        <canvas
          ref={(e) => (this.canvas = e) /* Store canvas element */}
          onMouseMove={(event) => {
            // Send lines to Whiteboard server
            const pos = { x: event.clientX, y: event.clientY };
            if (this.lastPos && this.connected) {
              whiteboardService.send({ line: { from: this.lastPos, to: pos } });
            }
            this.lastPos = pos;
          }}
          width={400}
          height={400}
          style={{ border: '2px solid black' }}
        />
        <div>{this.connected ? 'Connected' : 'Not connected'}</div>
      </>
    );
  }

  mounted() {
    // Subscribe to whiteboardService to receive events from Whiteboard server in this component
    this.subscription = whiteboardService.subscribe();

    // Called when the subscription is ready
    this.subscription.onopen = () => {
      this.connected = true;
    };

    // Called on incoming message
    this.subscription.onmessage = (message) => {
      const context = this.canvas?.getContext('2d');
      context?.beginPath();
      context?.moveTo(message.line.from.x, message.line.from.y);
      context?.lineTo(message.line.to.x, message.line.to.y);
      context?.closePath();
      context?.stroke();
    };

    // Called if connection is closed
    this.subscription.onclose = (code, reason) => {
      this.connected = false;
      Alert.danger('Connection closed with code ' + code + ' and reason: ' + reason);
    };

    // Called on connection error
    this.subscription.onerror = (error) => {
      this.connected = false;
      Alert.danger('Connection error: ' + error.message);
    };
  }

  // Unsubscribe from whiteboardService when component is no longer in use
  beforeUnmount() {
    if (this.subscription) whiteboardService.unsubscribe(this.subscription);
  }
}

export class Menu extends Component {
  search: string = '';
  render() {
    return (
      <NavBar
        brand={
          <img
            src="https://cdn.discordapp.com/attachments/623523695540830219/1169948601183649832/380254333_641845358065071_8017670276526516197_n.png?ex=6557428b&is=6544cd8b&hm=45e12c97e4c20ea17fc19d8feb50b18def1fa2ad524236098cb95bba40b4a144&"
            alt="Picture of likkit logo"
          />
        }
        id="test"
      >
        <Column width={3}>
          <h1>likkit</h1>
        </Column>
        <Column width={6} none>
          <Form.Input
            type="text"
            value={this.search}
            onChange={(event) => (this.search = event.currentTarget.value)}
            placeholder="Søk..."
          />
        </Column>
        <Column width={2} right>
          <NavBar.Link to="/">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
              alt="Green profile picture"
            />
          </NavBar.Link>
        </Column>
        <Column width={1} none>
          <Row>Navn</Row>
          <Row>likks: 371</Row>
        </Column>
      </NavBar>
    );
  }
}

export class Home extends Component {
  search: string = '';
  //posts: string[] = ['Post1', 'post2']; //Denne må endres te rett type seinere

  posts = [
    {
      text: 'Se på kjeksene mine!!!!',
      imageLink: 'https://i.scdn.co/image/ab6761610000e5eba3a7cba23d68a4e73c3b8155',
      likks: '30',
    },
    {
      text: 'anyways... COYS',
      imageLink: 'https://i.ytimg.com/vi/H8ZnIAama1A/maxresdefault.jpg',
      likks: '15',
    },
  ];

  alerttest = () => {
    alert('SHREK');
  };

  render() {
    const largerImageStyle = {
      width: '300px',
      height: '200px',
    };
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150vh', //bør få denne til å scale
        }}
      >
        <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
          <Row marginBottom={5}>
            <Column width={2}></Column>
            <Column width={8} none>
              <div id="createPost" onClick={() => console.log('alooo')}>
                <Form.Input
                  type="text"
                  value={this.search}
                  onChange={(event) => (this.search = event.currentTarget.value)}
                  placeholder="Create a post..."
                />
              </div>
            </Column>
          </Row>
          <Row marginBottom={5}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
              <Column>Sort by:</Column>
              <Column>
                <div style={{ marginLeft: '10px' }}>
                  <select
                    id="dropdown"
                    id="filterdropdown"
                    style={{
                      appearance: 'none',
                      border: '#5A5A5A',
                      background: '#5A5A5A',
                      color: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">Popular</option>
                    <option value="op1">Best</option>
                  </select>
                </div>
              </Column>
              <Column right>
                <div style={{ marginRight: '10px' }}>
                  <select
                    id="filterdropdown"
                    id="filterdropdown"
                    style={{
                      appearance: 'none',
                      border: '#5A5A5A',
                      background: '#5A5A5A',
                      color: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="none">None</option>
                    <option value="tag1">Javascript</option>
                  </select>
                </div>
              </Column>
              <Column right>
                <div style={{ marginRight: '30px' }}>Filters:</div>
              </Column>
            </div>
          </Row>

          <Card title="" width="100%" backgroundColor="rgb(70,70,70)">
            <Row>
              {this.posts.map((post, i) => (
                <Card
                  title=""
                  width="100%"
                  backgroundColor="rgb(60,60,60)"
                  marginBottom={3}
                  key={i}
                >
                  <Button.Post onClick={this.alerttest}>
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>
                      <p style={{ position: 'absolute', top: '0', left: '10' }}>{post.likks}</p>
                      <p>{post.text}</p>
                      <img src={post.imageLink} alt={post.text} style={largerImageStyle} />
                    </div>
                  </Button.Post>
                </Card>
              ))}
            </Row>
          </Card>
        </Card>
      </div>
    );
  }
}

export class TagList extends Component {
  render() {
    return (
      <div>
        <h1>Tags</h1>
      </div>
    );
  }
}

export class FavoriteList extends Component {
  render() {
    return (
      <div>
        <h1>Favorites</h1>
      </div>
    );
  }
}

export class UserProfile extends Component {
  user: string = 'banan';
  userType: string = 'adminierinios';
  likkAmount: number = 696969;
  upvoteAmount: number = 1337;
  commentAmount: number = 2;
  bestCommentAmount: number = 0;

  render() {
    return (
      <>
        <Card title="User profile">
          <Column width={3}>
            <Row>Username: {this.user}</Row>
            <Row>Usertype: {this.userType}</Row>
          </Column>
          <Column width={3}>
            <Row>Licks: {this.likkAmount}</Row>
            <Row>Upvotes: {this.upvoteAmount}</Row>
          </Column>
          <Column right width={3}>
            <Row>Comments: {this.commentAmount}</Row>
            <Row>Best comments: {this.bestCommentAmount}</Row>
          </Column>
          <Button.Light>Favorite Posts</Button.Light>
          <Button.Light>Best Post</Button.Light>
          <Button.Light>Best Comment</Button.Light>
          <Button.Light>Favorite Comments</Button.Light>
          <Button.Light>All Posts</Button.Light>
          <Button.Light>All Comments</Button.Light>
        </Card>
      </>
    );
  }
}

export class Posts extends Component {
  render() {
    return (
      <div>
        <h1>Posts</h1>
      </div>
    );
  }
}

export class TagPosts extends Component {
  render() {
    return (
      <div>
        <h1>Posts</h1>
      </div>
    );
  }
}

export class Post extends Component {
  render() {
    return (
      <div>
        <h1>Post</h1>
      </div>
    );
  }
}

export class CreatePost extends Component {
  render() {
    return (
      <div>
        <h1>Create Post</h1>
      </div>
    );
  }
}
