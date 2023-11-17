import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar, upLikk, downLikk } from '../widgets';
import taskService, { Question } from '../question-service';
import { createHashHistory } from 'history';

const history = createHashHistory();

function shrek() {
  alert('SHREK');
}

export class UserProfile extends Component {
  posts: Question[] = [];
  user: string = 'banan';
  userType: string = 'administrator';
  likkAmount: number = 696969;
  upvoteAmount: number = 1337;
  commentAmount: number = 2;
  bestCommentAmount: number = 0;
  bio: string =
    'I am a banana (lol nice bio copilot) then just a lot of  gpuiwehs giouhrweop8 ugewraoiugh oiuaguokyighiou weoie ufgqOUYG Fgfu wegfuyogbwe fuweyfg iouagh faygbf hgidf oilfuhg ipaefhgvoipaudfhgoiuafd yhfgorgholaerfghvafedgø oiadfhgbpiudafhbpsf djbgubp9fdhgb oiuarhgfp9a rehg7pa erhg9po7ae rhbodfhb vliudfshg lfdyhgdfpiuy  ghfodihaougp  9adef8grea p p8 iuoy oiyewou yuygouiy g  uygu uwyq giuywebjnwe jn uhg uiuy';

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100vh',
        }}
      >
        <div style={{ margin: '1%', marginLeft: '15%', marginRight: '15%' }}>
          <Card title="" backgroundColor="rgb(90,90,90)">
            <Row>
              <Column width={2}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src="https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/f5tcnybatu9tvnbrh18y/smash-burger"
                  alt="Green profile picture"
                />
              </Column>
              <Column width={9}>
                <Card title="Bio" backgroundColor="rgb(80,80,80)">
                  <div
                    style={{
                      color: 'white',
                      fontSize: '14px',
                      height: '17vh',
                    }}
                  >
                    {this.bio}
                  </div>
                </Card>
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Card title="Information" backgroundColor="rgb(80,80,80)">
                  <div
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    <Row>
                      <Column width={5}>Username:</Column>
                      <Column width={5}>{this.user}</Column>
                    </Row>
                    <Row>
                      <Column width={5}>Licks:</Column>
                      <Column width={5}>{this.likkAmount}</Column>
                    </Row>
                    <Row>
                      <Column width={5}>Comments:</Column>
                      <Column width={5}>{this.commentAmount}</Column>
                    </Row>
                    <Row>
                      <Column width={5}>Usertype:</Column>
                      <Column width={5}>{this.userType}</Column>
                    </Row>
                    <Row>
                      <Column width={5}>Upvotes:</Column>
                      <Column width={5}>{this.upvoteAmount}</Column>
                    </Row>
                    <Row>
                      <Column width={5}>Best comments:</Column>
                      <Column width={5}>{this.bestCommentAmount}</Column>
                    </Row>
                  </div>
                </Card>
              </Column>
              <Column width={9}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    margin: '2%',
                  }}
                >
                  <Row>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        <NavBar.Link to="/">Favorite Posts</NavBar.Link>
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        <NavBar.Link to="/">Best Post</NavBar.Link>
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        <NavBar.Link to="/">Best Comment</NavBar.Link>
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        <NavBar.Link to="/">Favorite Comments</NavBar.Link>
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        <NavBar.Link to="/">All Posts</NavBar.Link>
                      </Button.Light>
                    </Column>
                    <Column>
                      <Button.Light onClick={() => console.log('yep')}>
                        <NavBar.Link to="/">All Comments</NavBar.Link>
                      </Button.Light>
                    </Column>
                  </Row>
                </div>
                <Row>
                  <Card title="" width="100%" backgroundColor="rgb(70,70,70)" marginBottom={-3}>
                    <Row>
                      {this.posts.map((post, i) => (
                        <Card
                          title=""
                          width="100%"
                          backgroundColor="rgb(60,60,60)"
                          marginBottom={3}
                          key={i}
                        >
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
                            <p style={{ margin: '0 10px' }}>{post.karma}</p>
                            <Button.Vote onClick={shrek}>{downLikk}</Button.Vote>
                          </div>

                          <Button.Post onClick={() => history.push('/posts/' + post.question_id)}>
                            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>
                              <p style={{ position: 'absolute', top: '0', left: '10' }}></p>
                              <p>{post.title}</p>
                              <p style={{ fontSize: '14px', fontWeight: 'normal' }}>
                                {post.content}
                              </p>
                            </div>
                          </Button.Post>
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
    taskService.questionGetThree().then((posts) => (this.posts = posts));
  }
}
