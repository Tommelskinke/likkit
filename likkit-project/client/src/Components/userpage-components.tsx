import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar, upLikk, downLikk } from '../widgets';
import taskService, { Question, Favorites } from '../question-service';
import userpageService, { UserComment } from '../userpage-service';
import { createHashHistory } from 'history';
import { UserContext, UserProvider } from '../authState';
import PrettyPreview from './prettyPreview-component';

const history = createHashHistory();

function shrek() {
  alert('SHREK');
}

export class UserProfile extends Component {
  user: string = String(sessionStorage.getItem('username'));
  userType: string = String(sessionStorage.getItem('user_type'));
  userFavorites: Favorites[] = [];
  likkAmount: number = 0;
  upvoteAmount: number = 0;
  commentAmount: number = 0;
  bestCommentAmount: number = 0;
  options = [[], [], [], [], [], []] as [
    Question[],
    UserComment[],
    UserComment[],
    Question[],
    Question[],
    UserComment[],
  ];
  active: number = 0;
  user_id: number = Number(sessionStorage.getItem('user_id'));
  newpfppath: string = '';
  current_user_pfp: string = String(sessionStorage.getItem('user_pfp'));

  render() {
    return (
      <div className="background">
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
                <Row marginBottom={4}>
                  <form
                    onSubmit={() => {
                      userpageService
                        .updateProfilePicture(this.user_id, this.newpfppath)
                        .then(() => {
                          location.reload();
                        });
                    }}
                  >
                    <Row>
                      <Column none>
                        <Form.Input
                          type="url"
                          value={this.newpfppath}
                          onChange={(event) => (this.newpfppath = event.currentTarget.value)}
                          placeholder="Profile picture URL..."
                        />
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <Form.Input
                          type="submit"
                          value="Update profilepicture"
                          onChange={() => {}}
                        />
                      </Column>
                    </Row>
                  </form>
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
                      <Button.Light
                        onClick={() => {
                          this.active = 4;
                          this.forceUpdate();
                        }}
                      >
                        Favorite Posts
                      </Button.Light>
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
                      <Button.Light
                        onClick={() => {
                          this.active = 5;
                          this.forceUpdate();
                        }}
                      >
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
                          {this.active == 0 || this.active == 3 || this.active == 4 ? (
                            <>
                              <Row>
                                <Column width={2}>
                                  <div
                                    style={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                      fontSize: '25px',
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                    }}
                                  >
                                    <Column width={4}>
                                      <Button.Vote onClick={() => {}}>{upLikk}</Button.Vote>
                                    </Column>
                                    <Column width={4}>
                                      <p style={{ margin: '0 10px' }}>
                                        {data.upvotes - data.downvotes}
                                      </p>
                                    </Column>
                                    <Column width={4}>
                                      <Button.Vote onClick={() => {}}>{downLikk}</Button.Vote>
                                    </Column>
                                  </div>
                                </Column>
                                <Column width={8} none>
                                  {/*Koden her gir error siden den ikke liker at vi har en knapp og annet innhold inne i en knapp*/}
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => history.push('/posts/' + data.question_id)}
                                  >
                                    <div
                                      style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '25px',
                                      }}
                                    >
                                      <p style={{ alignItems: 'center', alignContent: 'center' }}>
                                        {data.title}
                                      </p>
                                      <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
                                        <PrettyPreview htmlContent={data.content} maxLength={100} />
                                      </div>
                                    </div>
                                  </div>
                                </Column>
                                <Column width={2} right>
                                  <div>
                                    {this.userFavorites.some(
                                      (favorite) =>
                                        favorite.question_id == data.question_id &&
                                        favorite.answer_id == null,
                                    ) ? (
                                      <img
                                        style={{ cursor: 'pointer' }}
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
                                        alt="Filled picture of gold star, indicates favorites"
                                      />
                                    ) : (
                                      <img
                                        style={{ cursor: 'pointer' }}
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
                                        alt="Empty picture of star, indicates not favorites"
                                      />
                                    )}
                                  </div>
                                </Column>
                              </Row>
                            </>
                          ) : (
                            'username' in data &&
                            'answer_id' in data && (
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => history.push('/posts/' + data.question_id)}
                              >
                                <Row marginBottom={4}>
                                  <Row marginBottom={1}>
                                    <Column>
                                      <img
                                        src={data.user_pfp}
                                        alt={`${data.username} profile picture`}
                                      />
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
                                      <div style={{ color: 'white', fontSize: '14px' }}>
                                        Posted by {data.username} at {data.created_at}
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row marginBottom={2}>
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
                                      <Button.Vote onClick={() => {}}>{upLikk}</Button.Vote>
                                      <p style={{ margin: '0 10px' }}>
                                        {data.upvotes - data.downvotes}
                                      </p>
                                      <Button.Vote onClick={() => {}}>{downLikk}</Button.Vote>
                                      <div>
                                        {this.userFavorites.some(
                                          (favorite) =>
                                            'answer_id' in favorite &&
                                            favorite.question_id == data.question_id &&
                                            favorite.answer_id == data.answer_id,
                                        ) ? (
                                          <img
                                            style={{ cursor: 'pointer' }}
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
                                            alt="Filled picture of gold star, indicates favorites"
                                          />
                                        ) : (
                                          <img
                                            style={{ cursor: 'pointer' }}
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
                                            alt="Empty picture of star, indicates not favorites"
                                          />
                                        )}
                                      </div>
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
                                    <div style={{ fontSize: '12px', color: 'rgb(176, 176, 176)' }}>
                                      From: {data.title}
                                    </div>
                                  </Column>
                                </Row>
                              </div>
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

    userpageService
      .getTotalUserUpvotes(this.user_id)
      .then((totalUpvotes) => (this.upvoteAmount = totalUpvotes));

    userpageService.getUserFavoritesQuestions(this.user_id).then((userFavorites) => {
      this.options[4] = userFavorites;
    });

    userpageService.getUserFavoritesAnswers(this.user_id).then((userFavorites) => {
      this.options[5] = userFavorites;
    });

    taskService.getUserFavorites(this.user_id).then((userFavorites) => {
      this.userFavorites = userFavorites;
    });
  }
}
