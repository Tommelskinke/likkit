import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button, NavBar, upLikk, downLikk } from '../widgets';
import taskService, { Question, Favorites } from '../question-service';
import { createHashHistory } from 'history';
import PrettyPreview from './prettyPreview-component';

const history = createHashHistory();

export class AllPostsTag extends Component {
  search: string = '';
  user_id: number = Number(sessionStorage.getItem('user_id'));
  posts: Question[] = [];
  userFavorites: Favorites[] = [];
  selectedOption: string = 'popular';

  handleSortChange = (event: any) => {
    const selectedOption = event.target.value;
    this.selectedOption = selectedOption;

    if (selectedOption === '1') {
      taskService.questionGetAllTag(1).then((posts) => (this.posts = posts));
    } else if (selectedOption === '2') {
      taskService.questionGetAllTag(2).then((posts) => (this.posts = posts));
    } else if (selectedOption === '3') {
      taskService.questionGetAllTag(3).then((posts) => (this.posts = posts));
    } else if (selectedOption === '4') {
      taskService.questionGetAllTag(4).then((posts) => (this.posts = posts));
    }
    this.forceUpdate(); // Trigger a re-render
  };

  handleUpvote = (questionId: number) => {
    taskService
      .upvoteQuestion(questionId)
      .then(() => {
        this.handleSortChange({ target: { value: this.selectedOption } });
      })
      .catch((error) => {
        console.error('Error upvoting question:', error);
      });
  };

  handleDownvote = (questionId: number) => {
    taskService
      .downvoteQuestion(questionId)
      .then(() => {
        this.handleSortChange({ target: { value: this.selectedOption } });
      })
      .catch((error) => {
        console.error('Error downvoting question:', error);
      });
  };

  render() {
    return (
      <div
        className="background"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            margin: '2%',
          }}
        >
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={5}>
              <div
                style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginLeft: '5px' }}
              >
                <Column>Sort by tags:</Column>
                <Column>
                  <div style={{ marginLeft: '10px' }}>
                    <select
                      id="dropdown"
                      style={{
                        appearance: 'none',
                        background: '#5A5A5A',
                        color: '#ffffff',
                        cursor: 'pointer',
                        border: '1px solid #ffffff',
                        borderRadius: '10px',
                        padding: '5px',
                      }}
                      onChange={this.handleSortChange}
                      value={this.selectedOption}
                    >
                      <option value="1">Solved</option>
                      <option value="2">JavaScript</option>
                      <option value="3">Rust</option>
                      <option value="4">Linux</option>
                    </select>
                  </div>
                </Column>
                <Column right>
                  <div style={{ marginRight: '5px' }}>Posts with this tag: {this.posts.length}</div>
                </Column>
              </div>
            </Row>

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
                            <Button.Vote onClick={() => this.handleUpvote(post.question_id)}>
                              {upLikk}
                            </Button.Vote>
                          </Column>
                          <Column width={4}>
                            <p style={{ margin: '0 10px' }}>{post.upvotes - post.downvotes}</p>
                          </Column>
                          <Column width={4}>
                            <Button.Vote onClick={() => this.handleDownvote(post.question_id)}>
                              {downLikk}
                            </Button.Vote>
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
                          onClick={() => history.push('/posts/' + post.question_id)}
                        >
                          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>
                            <p style={{ alignItems: 'center', alignContent: 'center' }}>
                              {post.title}
                            </p>
                            <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
                              <PrettyPreview htmlContent={post.content} maxLength={100} />
                            </div>
                          </div>
                        </div>
                      </Column>
                      <Column width={2} right>
                        <div>
                          {this.userFavorites.some(
                            (favorite) =>
                              favorite.question_id == post.question_id &&
                              favorite.answer_id == null,
                          ) ? (
                            <img
                              style={{ cursor: 'pointer' }}
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
                              alt="Filled picture of gold star, indicates favorites"
                              onClick={() => {
                                taskService
                                  .removeFavorite(this.user_id, post.question_id, null)
                                  .then(() => {
                                    window.location.reload();
                                  });
                              }}
                            />
                          ) : (
                            <img
                              style={{ cursor: 'pointer' }}
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
                              alt="Empty picture of star, indicates not favorites"
                              onClick={() => {
                                taskService
                                  .addFavorite(this.user_id, post.question_id, null)
                                  .then(() => {
                                    window.location.reload();
                                  });
                              }}
                            />
                          )}
                        </div>
                      </Column>
                    </Row>
                  </Card>
                ))}
              </Row>
            </Card>
          </Card>
        </div>
      </div>
    );
  }
  mounted() {
    taskService.questionGetAllTag(1).then((posts) => (this.posts = posts));
    taskService.getUserFavorites(this.user_id).then((userFavorites) => {
      this.userFavorites = userFavorites;
    });
  }
}
