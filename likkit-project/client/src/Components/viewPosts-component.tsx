import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react-simplified';
import taskService, { Question, Answer, Comment, Tag, Favorites } from '../question-service';
import { createHashHistory } from 'history';
import {
  Alert,
  Card,
  Row,
  Column,
  Form,
  Button,
  upLikk,
  downLikk,
  SoMeX,
  SoMeInsta,
  SoMeReddit,
  SoMeRedditLink,
  SoMeInstaLink,
  SoMeXLink,
} from '../widgets';
import DOMPurify from 'dompurify';

const history = createHashHistory();

export class ViewPost extends Component<{ match: { params: { id: number } } }> {
  question: Question = {
    username: '',
    question_id: 1,
    user_id: 0,
    title: '',
    content: '',
    created_at: '',
    upvotes: 2,
    downvotes: 1,
  };

  answer: Answer = {
    answer_id: 0,
    question_id: 0,
    parent_answer_id: null,
    user_id: 1,
    best_answer: false,
    content: '',
    created_at: '',
    upvotes: 0,
    downvotes: 0,
  };
  writeComment: string = '';

  comments: Comment[] = [];

  userFavorites: Favorites[] = [];

  tags: Tag[] = [];

  user_id: number = Number(sessionStorage.getItem('user_id'));

  state = {
    showButtons: false,
    showcommentSection: false,
    activeButtonId: null,
    rendercommentButton: true,
  };

  handleButtonClick = (id: number) => {
    this.setState({ activeButtonId: id });
  };

  rendercommentButton = (comment: Comment) => {
    if (
      this.state.rendercommentButton === true ||
      this.state.activeButtonId !== comment.answer_id
    ) {
      return (
        <Column width={8} none>
          <Button.Share
            onClick={() => {
              this.handleButtonClick(comment.answer_id);
              console.log('test');
              this.setState({ showcommentSection: true, rendercommentButton: false });
            }}
          >
            Reply
          </Button.Share>
        </Column>
      );
    } else {
      return null;
    }
  };

  rendercommentSection = (comment: Comment) => {
    if (this.state.activeButtonId === comment.answer_id) {
      return (
        <>
          <Row marginTop={2}>
            <Column width={6} none>
              <Form.Textarea
                type="text"
                value={this.writeComment}
                onChange={(event) => (this.writeComment = event.currentTarget.value)}
                placeholder="Write your comment here..."
                style={{ height: '15vh' }}
              />
            </Column>
          </Row>
          <Row>
            <Column width={6} right>
              <Button.Success
                onClick={() => {
                  taskService
                    .createCommentReply(
                      this.props.match.params.id,
                      comment.answer_id,
                      this.writeComment,
                      this.user_id,
                    )
                    .then(() => {
                      this.writeComment = '';
                      taskService
                        .commentsGet(this.props.match.params.id)
                        .then((getComments) => (this.comments = getComments));
                    });
                  this.setState({
                    showcommentSection: false,
                    rendercommentButton: true,
                    activeButtonId: null,
                  });
                }}
              >
                Post
              </Button.Success>
            </Column>
          </Row>
        </>
      );
    }
  };

  handleShowButtons = () => {
    this.setState({ showButtons: !this.state.showButtons });
  };

  renderSocialButtons() {
    if (this.state.showButtons) {
      return (
        <>
          <Button.Vote onClick={SoMeXLink}>{SoMeX}</Button.Vote>
          <Button.Vote onClick={SoMeInstaLink}>{SoMeInsta}</Button.Vote>
          <Button.Vote onClick={SoMeRedditLink}>{SoMeReddit}</Button.Vote>
        </>
      );
    }
    return null; // or any other default content when showButtons is false
  }

  handleUpvote = (questionId: number) => {
    taskService
      .upvoteQuestion(questionId)
      .then(() => {
        taskService
          .questionGet(this.props.match.params.id)
          .then((question) => (this.question = question));
      })
      .catch((error) => {
        console.error('Error upvoting question:', error);
      });
    this.forceUpdate();
  };

  handleDownvote = (questionId: number) => {
    taskService
      .downvoteQuestion(questionId)
      .then(() => {
        taskService
          .questionGet(this.props.match.params.id)
          .then((question) => (this.question = question));
      })
      .catch((error) => {
        console.error('Error downvoting question:', error);
      });
    this.forceUpdate();
  };

  handleBestAnswer = (answer_id: number) => {
    this.comments.forEach((comment) => {
      if (comment.answer_id == answer_id) {
        taskService.bestAnswer(answer_id);
      } else if (comment.best_answer == true) {
        taskService.notBestAnswer(comment.answer_id);
      }
    });
    window.location.reload();
  };

  handleUpvoteComment = (answerId: number) => {
    taskService
      .upvoteAnswer(answerId)
      .then(() => {
        taskService
          .commentsGet(this.props.match.params.id)
          .then((getComments) => (this.comments = getComments));
        this.forceUpdate();
      })
      .catch((error) => {
        console.error('Error upvoting answer:', error);
      });
  };

  handleDownvoteComment = (answerId: number) => {
    taskService
      .downvoteAnswer(answerId)
      .then(() => {
        taskService
          .commentsGet(this.props.match.params.id)
          .then((getComments) => (this.comments = getComments));
        this.forceUpdate();
      })
      .catch((error) => {
        console.error('Error downvoting answer:', error);
      });
  };

  mapComments(comments: Comment[], parentId: number, depth: number = 1) {
    return comments
      .filter((reply) => reply.parent_answer_id === parentId)
      .map((reply) => (
        <div
          key={reply.answer_id}
          style={{
            marginLeft: `${depth * 30}px`,
            borderLeft: '1px dotted #ccc',
            paddingLeft: '10px',
          }}
        >
          <Row marginBottom={4}>
            <Row marginBottom={1}>
              <Column>
                <img src={reply.user_pfp} alt="Green profile picture" />
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
                Posted by {reply.username} at {reply.created_at}
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
                <Button.Vote onClick={() => this.handleUpvoteComment(reply.answer_id)}>
                  {upLikk}
                </Button.Vote>
                <p style={{ margin: '0 10px' }}>{reply.upvotes - reply.downvotes}</p>
                <Button.Vote onClick={() => this.handleDownvoteComment(reply.answer_id)}>
                  {downLikk}
                </Button.Vote>

                <Button.Share onClick={this.handleShowButtons}>Share</Button.Share>
                {this.renderSocialButtons()}
                <div>
                  {this.userFavorites.some(
                    (favorite) =>
                      favorite.question_id == this.props.match.params.id &&
                      favorite.answer_id == reply.answer_id,
                  ) ? (
                    <img
                      style={{ cursor: 'pointer' }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
                      alt="Filled picture of gold star, indicates favorites"
                      onClick={() => {
                        taskService
                          .removeFavorite(this.user_id, this.props.match.params.id, reply.answer_id)
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
                          .addFavorite(this.user_id, this.props.match.params.id, reply.answer_id)
                          .then(() => {
                            window.location.reload();
                          });
                      }}
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
                <Card title="" width="100%" backgroundColor="rgb(60,60,60)">
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
                    <Column>{reply.content}</Column>
                  </div>
                </Card>
              </div>
            </Row>

            <Row>{this.rendercommentButton(reply)}</Row>

            <Row>{this.rendercommentSection(reply)}</Row>
          </Row>
          {this.mapComments(comments, reply.answer_id, depth + 1)}
        </div>
      ));
  }

  render() {
    const isAuthor = this.user_id === this.question.user_id;
    let activeTags: string = 'Tags:';
    this.tags.forEach((tag) => {
      activeTags += ' ' + tag.tag_name + ',';
    });
    activeTags = activeTags.slice(0, -1) + '.';
    return (
      <div className="background">
        <div
          style={{
            margin: '2%',
          }}
        >
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Card title="" width="100%" backgroundColor="rgb(80,80,80)">
              <div
                style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                {/* Conditionally render the button based on the user being the author */}
                {isAuthor && (
                  <Button.Success
                    onClick={() => history.push('/editPost/' + this.question.question_id)}
                  >
                    edit
                  </Button.Success>
                )}
                <Row marginBottom={3}>
                  <Column width={1}></Column>
                  <Column>{this.question.title}</Column>
                  <Column width={1}></Column>
                </Row>
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                <Row marginBottom={5}>
                  <Column width={1}>
                    <Button.Vote onClick={() => this.handleUpvote(this.question.question_id)}>
                      {upLikk}
                    </Button.Vote>
                    <p
                      style={{
                        marginLeft: '30px',
                        marginTop: '10px',
                        fontWeight: 'bold',
                        fontSize: '25px',
                      }}
                    >
                      {this.question.upvotes - this.question.downvotes}
                    </p>

                    <Button.Vote onClick={() => this.handleDownvote(this.question.question_id)}>
                      {downLikk}
                    </Button.Vote>
                  </Column>
                  <Column>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(this.question.content),
                      }}
                    />
                  </Column>
                  <Column width={1}></Column>
                </Row>
                <Row>
                  <Column width={1}></Column>
                  <Column>{activeTags}</Column>
                  <Button.Share onClick={this.handleShowButtons}>Share</Button.Share>
                  {this.renderSocialButtons()}
                </Row>
                <Row>
                  Posted by: {this.question.username} at {this.question.created_at}
                </Row>
              </div>
            </Card>
            <Card title="" width="100%" backgroundColor="rgb(80,80,80)">
              <div
                style={{
                  color: 'white',
                  fontSize: '17px',
                }}
              >
                <Row marginBottom={3}>
                  <Column width={1}></Column>
                  <Column width={1}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9513/9513587.png"
                      alt="Picture of comment bouble"
                    />
                  </Column>
                  <Column width={2}>Comments: {this.comments.length}</Column>
                </Row>

                <Row marginBottom={3}>
                  <Column width={1}></Column>
                  <Column none>
                    <Form.Textarea
                      type="text"
                      value={this.writeComment}
                      onChange={(event) => (this.writeComment = event.currentTarget.value)}
                      placeholder="Write your post here..."
                      style={{ height: '30vh' }}
                    />
                  </Column>
                </Row>
                <Row marginBottom={5}>
                  <Column right>
                    <Button.Success
                      onClick={() => {
                        if (this.writeComment.length <= 100000) {
                          console.log(this.props.match.params.id);
                          taskService
                            .createComment(
                              this.props.match.params.id,
                              this.writeComment,
                              this.user_id,
                            )
                            .then(() => {
                              this.writeComment = '';
                              taskService
                                .commentsGet(this.props.match.params.id)
                                .then((getComments) => (this.comments = getComments));
                            });
                        } else {
                          alert('The comment cant be more than 100000 characters!');
                        }
                      }}
                    >
                      Post
                    </Button.Success>
                  </Column>
                </Row>
                <Column>Sort by:</Column>
              </div>
              <Column>
                <div style={{ marginLeft: '10px', color: 'white' }}>
                  <select
                    id="dropdown"
                    style={{
                      appearance: 'none',
                      background: '#5A5A5A',
                      color: 'white',
                      cursor: 'pointer',
                      border: '1px solid #ffffff',
                      borderRadius: '10px',
                      padding: '5px',
                    }}
                  >
                    <option value="">Popular</option>
                    <option value="best">Best</option>
                  </select>
                </div>
              </Column>

              <Card title="" width="100%" backgroundColor="rgb(70,70,70)">
                {this.comments.map((comment, i) => {
                  if (comment.parent_answer_id === null) {
                    return (
                      <div
                        style={{
                          color: 'white',
                          fontSize: '14px',
                          borderLeft: '1px dotted #ccc',
                          paddingLeft: '10px',
                        }}
                        key={i}
                      >
                        <Row marginBottom={4}>
                          <Row marginBottom={1}>
                            <Column>
                              <img src={comment.user_pfp} alt="Green profile picture" />
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
                              Posted by {comment.username} at {comment.created_at}
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
                              <Button.Vote
                                onClick={() => this.handleUpvoteComment(comment.answer_id)}
                              >
                                {upLikk}
                              </Button.Vote>
                              <p style={{ margin: '0 10px' }}>
                                {comment.upvotes - comment.downvotes}
                              </p>
                              <Button.Vote
                                onClick={() => this.handleDownvoteComment(comment.answer_id)}
                              >
                                {downLikk}
                              </Button.Vote>

                              <Button.Share onClick={this.handleShowButtons}>Share</Button.Share>
                              {this.renderSocialButtons()}
                              <div>
                                {this.userFavorites.some(
                                  (favorite) =>
                                    favorite.question_id == this.props.match.params.id &&
                                    favorite.answer_id == comment.answer_id,
                                ) ? (
                                  <img
                                    style={{ cursor: 'pointer' }}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
                                    alt="Filled picture of gold star, indicates favorites"
                                    onClick={() => {
                                      taskService
                                        .removeFavorite(
                                          this.user_id,
                                          this.props.match.params.id,
                                          comment.answer_id,
                                        )
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
                                        .addFavorite(
                                          this.user_id,
                                          this.props.match.params.id,
                                          comment.answer_id,
                                        )
                                        .then(() => {
                                          window.location.reload();
                                        });
                                    }}
                                  />
                                )}
                              </div>
                              {this.user_id === this.question.user_id && (
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => this.handleBestAnswer(comment.answer_id)}
                                >
                                  <img
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"
                                    alt="Picture of checkmark used for marking the best answer"
                                  />
                                </div>
                              )}
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
                              <Card title="" width="100%" backgroundColor="rgb(60,60,60)">
                                <div
                                  style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    fontWeight: 'normal',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'stretch',
                                    width: '100%',
                                    backgroundColor: comment.best_answer
                                      ? 'rgb(60, 130, 60)'
                                      : 'rgb(60,60,60)',
                                  }}
                                >
                                  <Column>{comment.content}</Column>
                                </div>
                              </Card>
                            </div>
                          </Row>
                          <Row>{this.rendercommentButton(comment)}</Row>
                          <Row>{this.rendercommentSection(comment)}</Row>
                        </Row>
                        {this.mapComments(this.comments, comment.answer_id)}
                      </div>
                    );
                  }
                })}
              </Card>
            </Card>
          </Card>
        </div>
      </div>
    );
  }
  mounted() {
    taskService
      .questionGet(this.props.match.params.id)
      .then((question) => (this.question = question));

    taskService
      .commentsGet(this.props.match.params.id)
      .then((getComments) => (this.comments = getComments));

    taskService.questionTagGet(this.props.match.params.id).then((tags) => (this.tags = tags));

    taskService.getUserFavorites(this.user_id).then((userFavorites) => {
      this.userFavorites = userFavorites;
      console.log(userFavorites);
    });
  }
}
