import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Answer, Tag } from '../question-service';
import { Card, Row, Column, Form, Button, deleteButton } from '../widgets';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class EditComment extends Component<{ match: { params: { id: number } } }> {
  answer_id: number = 15;
  content: string = '';
  user_id: number = Number(sessionStorage.getItem('user_id'));

  answer: Answer = {
    answer_id: 15,
    question_id: 0,
    parent_answer_id: null,
    user_id: 0,
    best_answer: false,
    content: '',
    created_at: '',
    upvotes: 0,
    downvotes: 0,
  };

  render() {
    return (
      <div className="background">
        <div
          style={{
            margin: '1%',
            marginLeft: '15%',
            marginRight: '15%',
          }}
        >
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={3}>
              <Column width={2}>
                <div
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                >
                  Edit Post
                </div>
              </Column>
              <Column width={9} none />
              <Column width={1}>
                <Button.Danger onClick={this.delete}>Delete</Button.Danger>
              </Column>
              <div className="d-flex justify-content-center align-items-center">
                <Column width={7} none>
                  <Form.Input
                    type="text"
                    value={this.answer.content}
                    onChange={(event) => (this.answer.content = event.currentTarget.value)}
                    placeholder="content..."
                  />
                </Column>
                <Column right>
                  <Button.Success
                    onClick={() => {
                      if (this.answer.content.length <= 255) {
                        taskService
                          .commentEdit(this.answer.content, this.answer.answer_id)
                          .then(() => {
                            history.push('/posts/' + this.answer.question_id);
                          });
                      } else {
                        alert('The content cant be more than 255 characters!');
                      }
                    }}
                  >
                    Post
                  </Button.Success>
                </Column>
              </div>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
  mounted() {
    taskService.commentGet(this.props.match.params.id).then((answer) => (this.answer = answer));
  }
  delete() {
    taskService.commentRemove(this.answer.answer_id).then(() => {
      history.push('/posts/:id');
    });
  }
}
