import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button, NavBar, upLikk, downLikk } from '../widgets';
import taskService, { Question } from '../question-service';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class AllPostsTag extends Component {
  search: string = '';
  posts: Question[] = [];
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
                    marginBottom={4}
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
                      <Button.Vote onClick={() => this.handleUpvote(post.question_id)}>
                        {upLikk}
                      </Button.Vote>
                      <p style={{ margin: '0 10px' }}>{post.upvotes - post.downvotes}</p>
                      <Button.Vote onClick={() => this.handleDownvote(post.question_id)}>
                        {downLikk}
                      </Button.Vote>
                    </div>

                    <Button.Post onClick={() => history.push('/posts/' + post.question_id)}>
                      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                        <p>{post.title}</p>
                      </div>
                    </Button.Post>
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
  }
}
