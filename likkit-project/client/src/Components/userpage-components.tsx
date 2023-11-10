import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar } from '../widgets';

export class UserProfile extends Component {
  user: string = 'banan';
  userType: string = 'adminierinios';
  likkAmount: number = 696969;
  upvoteAmount: number = 1337;
  commentAmount: number = 2;
  bestCommentAmount: number = 0;

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100vh', //bør få denne til å scale
        }}
      >
        <div style={{ margin: '1%' }}>
          <Card title="User profile" backgroundColor="rgb(90,90,90)">
            <div
              style={{
                margin: '1%',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              <Row>
                <Column>Username: {this.user}</Column>
                <Column>Licks: {this.likkAmount}</Column>
                <Column right>Comments: {this.commentAmount}</Column>
              </Row>
              <Row>
                <Column>Usertype: {this.userType}</Column>
                <Column>Upvotes: {this.upvoteAmount}</Column>
                <Column right>Best comments: {this.bestCommentAmount}</Column>
              </Row>
              <Column>
                <Button.Light onClick={() => console.log('yep)')}>
                  <NavBar.Link to="/">Favorite Posts</NavBar.Link>
                </Button.Light>
                <Button.Light onClick={() => console.log('yep)')}>
                  <NavBar.Link to="/">Best Post</NavBar.Link>
                </Button.Light>
                <Button.Light onClick={() => console.log('yep)')}>
                  <NavBar.Link to="/">Best Comment</NavBar.Link>
                </Button.Light>
                <Button.Light onClick={() => console.log('yep)')}>
                  <NavBar.Link to="/">Favorite Comments</NavBar.Link>
                </Button.Light>
                <Button.Light onClick={() => console.log('yep)')}>
                  <NavBar.Link to="/">All Posts</NavBar.Link>
                </Button.Light>
                <Button.Light onClick={() => console.log('yep)')}>
                  <NavBar.Link to="/">All Comments</NavBar.Link>
                </Button.Light>
              </Column>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
// må bare ha en endring for prettier
