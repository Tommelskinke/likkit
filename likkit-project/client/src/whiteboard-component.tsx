import * as React from 'react';
import { Component } from 'react-simplified';
import whiteboardService, { Subscription } from './whiteboard-service';
import { Alert, Card, Row, Column, Form, Button } from './widgets';

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

export class Home extends Component {
  render() {
    return (
      <div>
        <Card>
          <Row>
            <Column width={1}>
              <img
                src="https://cdn.discordapp.com/attachments/623523695540830219/1169948601183649832/380254333_641845358065071_8017670276526516197_n.png?ex=6557428b&is=6544cd8b&hm=45e12c97e4c20ea17fc19d8feb50b18def1fa2ad524236098cb95bba40b4a144&"
                alt="Picture of likkit logo"
              />
            </Column>
            <Column width={8}>
              <Form.Input
                type="text"
                //value={this.task.title}
                //onChange={(event) => (this.task.title = event.currentTarget.value)}
                placeholder="Søk..."
              />
            </Column>
            <Column width={1}>
              <img
                src="https://cdn.discordapp.com/attachments/623523695540830219/1169948601183649832/380254333_641845358065071_8017670276526516197_n.png?ex=6557428b&is=6544cd8b&hm=45e12c97e4c20ea17fc19d8feb50b18def1fa2ad524236098cb95bba40b4a144&"
                alt="Picture of likkit logo"
              />
            </Column>
          </Row>
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
  render() {
    return (
      <div>
        <h1>User</h1>
      </div>
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
