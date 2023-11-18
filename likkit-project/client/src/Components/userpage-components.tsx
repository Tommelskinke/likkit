import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar, upLikk, downLikk } from '../widgets';
import taskService, { Question } from '../question-service';
import userpageService, { UserComment } from '../userpage-service';
import { createHashHistory } from 'history';
import { UserContext, UserProvider } from '../authState';

const history = createHashHistory();

function shrek() {
  alert('SHREK');
}

export class UserProfile extends Component {
  user: string = String(sessionStorage.getItem('username'));
  userType: string = String(sessionStorage.getItem('user_type'));
  likkAmount: number = 0;
  upvoteAmount: number = 0;
  commentAmount: number = 0;
  bestCommentAmount: number = 0;
  options = [[], [], [], []] as [Question[], UserComment[], UserComment[], Question[]];
  active: number = 0;
  user_id: number = Number(sessionStorage.getItem('user_id'));

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
          width: '100%',
        }}
      >
        <div style={{ margin: '1%', marginLeft: '15%', marginRight: '15%' }}>
          <Card title="" backgroundColor="rgb(90,90,90)">
            <Row>
              <Column width={2}>
                <Row marginBottom={2}>
                  <UserContext.Consumer>
                    {(userData) => (
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={userData?.user_pfp}
                        alt="User profile picture"
                      />
                    )}
                  </UserContext.Consumer>
                </Row>
                <Row>
                  <Column none>
                    <Card title="Information" backgroundColor="rgb(80,80,80)">
                      <div
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        <Row>
                          <Column width={6}>Username:</Column>
                          <Column width={5}>{this.user}</Column>
                        </Row>
                        <Row>
                          <Column width={6}>Licks:</Column>
                          <Column width={5}>{this.likkAmount}</Column>
                        </Row>
                        <Row>
                          <Column width={6}>Comments:</Column>
                          <Column width={5}>{this.commentAmount}</Column>
                        </Row>
                        <Row>
                          <Column width={6}>Usertype:</Column>
                          <Column width={5}>{this.userType}</Column>
                        </Row>
                        <Row>
                          <Column width={6}>Upvotes:</Column>
                          <Column width={5}>{this.upvoteAmount}</Column>
                        </Row>
                        <Row>
                          <Column width={6}>Best comments:</Column>
                          <Column width={5}>{this.bestCommentAmount}</Column>
                        </Row>
                      </div>
                    </Card>
                  </Column>
                </Row>
              </Column>
              <Column width={9}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    margin: '2%',
                    width: '100%',
                  }}
                >
                  <Row>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>Favorite Posts</Button.Light>
                    </Column>
                    <Column>
                      <Button.Light
                        onClick={() => {
                          this.active = 0;
                          this.forceUpdate();
                        }}
                      >
                        Best Post
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light
                        onClick={() => {
                          this.active = 1;
                          this.forceUpdate();
                        }}
                      >
                        Best Comment
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        Favorite Comments
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light
                        onClick={() => {
                          this.active = 3;
                          this.forceUpdate();
                        }}
                      >
                        All Posts
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light
                        onClick={() => {
                          this.active = 2;
                          this.forceUpdate();
                        }}
                      >
                        All Comments
                      </Button.Light>
                    </Column>
                  </Row>
                </div>
                <Row>
                  <Card title="" width="100%" backgroundColor="rgb(70,70,70)" marginBottom={-3}>
                    <Row>
                      {this.options[this.active].map((data, i) => (
                        <Card
                          title=""
                          width="100%"
                          backgroundColor="rgb(60,60,60)"
                          marginBottom={3}
                          key={i}
                        >
                          {this.active == 0 || this.active == 3 ? (
                            <>
                              <div
                                style={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '25px',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <Button.Vote onClick={shrek}>{upLikk}</Button.Vote>
                                <p style={{ margin: '0 10px' }}>{data.upvotes - data.downvotes}</p>
                                <Button.Vote onClick={shrek}>{downLikk}</Button.Vote>
                              </div>
                              <Button.Post
                                onClick={() => history.push('/posts/' + data.question_id)}
                              >
                                <div
                                  style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}
                                >
                                  <p style={{ position: 'absolute', top: '0', left: '10' }}></p>
                                  <p>{data.title}</p>
                                  <p style={{ fontSize: '14px', fontWeight: 'normal' }}>
                                    {data.content}
                                  </p>
                                </div>
                              </Button.Post>
                            </>
                          ) : (
                            'username' in data && (
                              <Button.Post
                                onClick={() => history.push('/posts/' + data.question_id)}
                              >
                                <div
                                  style={{
                                    color: 'white',
                                    fontSize: '14px',
                                  }}
                                >
                                  <Row>
                                    <Row marginBottom={1}>
                                      <Column>
                                        <UserContext.Consumer>
                                          {(userData) => (
                                            <img
                                              style={{ borderRadius: '50%' }}
                                              src={userData?.user_pfp}
                                              alt="User profile picture"
                                            />
                                          )}
                                        </UserContext.Consumer>
                                      </Column>
                                      <div
                                        style={{
                                          color: 'white',
                                          fontWeight: 'bold',
                                          fontSize: '25px',
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'stretch',
                                        }}
                                      ></div>

                                      <Column width={4}>
                                        Posted by {data.username} at {data.created_at}
                                      </Column>
                                    </Row>
                                    <Row>
                                      <div
                                        style={{
                                          color: 'white',
                                          fontWeight: 'bold',
                                          fontSize: '25px',
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'stretch',
                                        }}
                                      >
                                        <Button.Vote onClick={() => console.log(data.downvotes)}>
                                          {upLikk}
                                        </Button.Vote>

                                        <p style={{ margin: '0 10px' }}>
                                          {data.upvotes - data.downvotes}
                                        </p>
                                        <Button.Vote onClick={() => console.log('HI')}>
                                          {downLikk}
                                        </Button.Vote>
                                      </div>
                                      <div
                                        style={{
                                          color: 'white',
                                          fontWeight: 'bold',
                                          fontSize: '25px',
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'stretch',
                                        }}
                                      >
                                        <Card title="" width="100%" backgroundColor="rgb(55,55,55)">
                                          <div
                                            style={{
                                              color: 'white',
                                              fontSize: '20px',
                                              fontWeight: 'normal',
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'stretch',
                                              width: '100%',
                                            }}
                                          >
                                            <Column>{data.content}</Column>
                                          </div>
                                        </Card>
                                      </div>
                                    </Row>
                                  </Row>
                                  <Row marginBottom={3}>
                                    <Column right>
                                      <div
                                        style={{ fontSize: '12px', color: 'rgb(176, 176, 176)' }}
                                      >
                                        From: {data.title}
                                      </div>
                                    </Column>
                                  </Row>
                                </div>
                              </Button.Post>
                            )
                          )}
                        </Card>
                      ))}
                    </Row>
                  </Card>
                </Row>
              </Column>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
  mounted() {
    userpageService.getBestPosts(this.user_id).then((bestPosts) => (this.options[0] = bestPosts));
    userpageService.getBestComments(this.user_id).then((bestComments) => {
      this.options[1] = bestComments;
      this.bestCommentAmount = bestComments.length;
    });
    userpageService.getAllUserComments(this.user_id).then((allComments) => {
      this.options[2] = allComments;
      this.commentAmount = allComments.length;
    });
    userpageService.getAllUserPosts(this.user_id).then((allPosts) => (this.options[3] = allPosts));
    userpageService
      .getTotalLicks(this.user_id)
      .then((totalLicks) => (this.likkAmount = totalLicks));
  }
}
