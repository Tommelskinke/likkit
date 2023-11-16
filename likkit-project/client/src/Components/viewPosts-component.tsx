import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react-simplified';
import taskService, { Question, Comment, Tag } from '../question-service';
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

function shrek() {
  alert('SHREK');
}

export class ViewPost extends Component<{ match: { params: { id: number } } }> {
  question: Question = {
    question_id: 1,
    user_id: 0,
    title: '',
    content: '',
    created_at: '',
    upvotes: 2,
    downvotes: 1,
    karma: 1,
  };
  writeComment: string = '';

  comments: Comment[] = [];

  tags: Tag[] = [];

  state = {
    showButtons: false,
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

  render() {
    let activeTags: string = 'Tags:';
    this.tags.forEach((tag) => {
      activeTags += ' ' + tag.tag_name + ',';
    });
    activeTags = activeTags.slice(0, -1) + '.';
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '150vh',
        }}
      >
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
                    <Button.Vote onClick={shrek}>{upLikk}</Button.Vote>
                    <p
                      style={{
                        marginLeft: '30px',
                        marginTop: '10px',
                        fontWeight: 'bold',
                        fontSize: '25px',
                      }}
                    >
                      {this.question.karma}
                    </p>
                    <Button.Vote onClick={shrek}>{downLikk}</Button.Vote>
                  </Column>
                  <Column>{this.question.content}</Column>
                  <Column width={1}></Column>
                </Row>
                <Row>
                  <Column width={1}></Column>
                  <Column>{activeTags}</Column>
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
                        console.log(this.props.match.params.id);
                        taskService
                          .createComment(
                            this.props.match.params.id,
                            this.writeComment,
                            4 /*user_id*/,
                          )
                          .then(() => {
                            this.writeComment = '';
                            taskService
                              .commentsGet(this.props.match.params.id)
                              .then((getComments) => (this.comments = getComments));
                          });
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
                {this.comments.map((comment, i) => (
                  <div
                    style={{
                      color: 'white',
                      fontSize: '14px',
                    }}
                    key={i}
                  >
                    <Row marginBottom={4}>
                      <Row marginBottom={1}>
                        <Column>
                          <img
                            src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                            alt="Green profile picture"
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
                          Posted by {comment.username} at {comment.created_at}
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
                          <Button.Vote onClick={shrek}>{upLikk}</Button.Vote>
                          <p style={{ margin: '0 10px' }}>{comment.karma}</p>
                          <Button.Vote onClick={shrek}>{downLikk}</Button.Vote>

                          <Button.Share onClick={this.handleShowButtons}>Share</Button.Share>
                          {this.renderSocialButtons()}
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
                              <Column>{comment.content}</Column>
                            </div>
                          </Card>
                        </div>
                      </Row>
                    </Row>
                  </div>
                ))}
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
  }
}
