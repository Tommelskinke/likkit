import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Answer, Tag } from '../question-service';
import { Card, Row, Column, Form, Button, deleteButton } from '../widgets';
import { createHashHistory } from 'history';
import EditorComponent from './editor-component';

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
    const currentContent = String(this.answer.content);
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
                  Edit Comment
                </div>
              </Column>
              <Column width={9} none />
              <Column width={1}>
                <Button.Vote onClick={this.delete}>{deleteButton}</Button.Vote>
              </Column>
              <div className="d-flex justify-content-center align-items-center">
                <Column width={7} none>
                  <div style={{ color: 'white' }}>
                    <EditorComponent
                      initialValue={currentContent}
                      onContentChange={(content: string) => {
                        this.answer.content = content;
                      }}
                    />
                  </div>
                </Column>
                <Column right>
                  <Button.Blue
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
                  </Button.Blue>
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
