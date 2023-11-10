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
      <>
        <Card title="User profile">
          <Row>
            <Column>Usertype: {this.userType}</Column>
            <Column>Licks: {this.likkAmount}</Column>
            <Column right>Comments: {this.commentAmount}</Column>
          </Row>
          <Row>
            <Column>Username: {this.user}</Column>
            <Column>Upvotes: {this.upvoteAmount}</Column>
            <Column right>Best comments: {this.bestCommentAmount}</Column>
          </Row>
          <Column width={12}>
            <Button.Light>Favorite Posts</Button.Light>
            <Button.Light>Best Post</Button.Light>
            <Button.Light>Best Comment</Button.Light>
            <Button.Light>Favorite Comments</Button.Light>
            <Button.Light>All Posts</Button.Light>
            <Button.Light>All Comments</Button.Light>
          </Column>
        </Card>
      </>
    );
  }
}
// må bare ha en endring for prettier
