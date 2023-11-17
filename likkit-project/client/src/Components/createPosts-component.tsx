import * as React from 'react';
import { UserContext, UserProvider } from '../authState';
import { Component } from 'react-simplified';
import taskService, { Question } from '../question-service';
import { Alert, Card, Row, Column, Form, Button, NavBar } from '../widgets';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class CreatePost extends Component {
  title: string = '';
  content: string = '';
  tags: string = '';
  user_id: number = Number(sessionStorage.getItem('user_id'));

  questionNew: Question = {
    username: '',
    question_id: 0,
    user_id: 0,
    title: "",
    content: "",
    created_at: "",
    upvotes: 0,
    downvotes: 0,
    karma: 0
  };
  
  questionSolved: boolean = false;
  questionJS: boolean = false;
  questionRust: boolean = false;
  questionLinux: boolean = false;

  render() {
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
                margin: '1%',
                marginLeft: '15%',
                marginRight: '15%',
              }}
            >
              <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
                <Row marginBottom={3}>
                  <Column width={2}>
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>Title </div>
                  </Column>
                  <Column width={7} none>
                    <Form.Input
                      type="text"
                      value={this.title}
                      onChange={(event) => (this.title = event.currentTarget.value)}
                      placeholder="Title..."
                    />
                  </Column>
                </Row>
                <Row marginBottom={3}>
                  <Column width={1}>
                    <div style={{ color: 'white', fontSize: '14px' }}>Solved?</div>
                  </Column>
                  <Column width={2}>
                    <Form.Checkbox
                      checked={this.questionSolved}
                      onChange={(event) =>
                        (this.questionSolved = event.currentTarget.checked ? true : false)
                      }
                    />
                  </Column>
                  <Column width={1}>
                    <div style={{ color: 'white', fontSize: '14px' }}>JavaScript</div>
                  </Column>
                  <Column width={2}>
                    <Form.Checkbox
                      checked={this.questionJS}
                      onChange={(event) =>
                        (this.questionJS = event.currentTarget.checked ? true : false)
                      }
                    />
                  </Column>
                  <Column width={1}>
                    <div style={{ color: 'white', fontSize: '14px' }}>Rust</div>
                  </Column>
                  <Column width={2}>
                    <Form.Checkbox
                      checked={this.questionRust}
                      onChange={(event) =>
                        (this.questionRust = event.currentTarget.checked ? true : false)
                      }
                    />
                  </Column>
                  <Column width={1}>
                    <div style={{ color: 'white', fontSize: '14px' }}>Linux</div>
                  </Column>
                  <Column width={2}>
                    <Form.Checkbox
                      checked={this.questionLinux}
                      onChange={(event) =>
                        (this.questionLinux = event.currentTarget.checked ? true : false)
                      }
                    />
                  </Column>
                </Row>
                <Row marginBottom={5}>
                  <Column width={2}></Column>
                  <Column width={9} none>
                    <Form.Textarea
                      type="text"
                      value={this.content}
                      onChange={(event) => (this.content = event.currentTarget.value)}
                      placeholder="Write your post here..."
                      style={{ height: '55vh' }}
                    />
                  </Column>
                </Row>
                <Row marginBottom={2}>
                  <Column right>
                    <Button.Success
                      onClick={() => {

                        if ((this.title.length <= 255) && (this.content.length <= 255)) {
                          taskService.questionCreate(this.user_id, this.title, this.content).then(() => { 
                          });
                          
                          //gjør dette om til en forEach loop
                          if (this.questionSolved) {
                            taskService.questionTagCreate((this.questionNew.question_id + 1), 1)
                          }
                          if (this.questionJS) {
                            taskService.questionTagCreate((this.questionNew.question_id + 1), 2)
                          }
                          if (this.questionRust) {
                            taskService.questionTagCreate((this.questionNew.question_id + 1), 3)
                          }
                          if (this.questionLinux) {
                            taskService.questionTagCreate((this.questionNew.question_id + 1), 4)
                          }
                          taskService.questionGetNewest().then(() => {
                          
                          })
                          setTimeout(() => {  history.push('/posts/' + (this.questionNew.question_id + 1)) }, 100);
                                   
                        } else {
                          alert("The title and/or content cant be more than 255 characters!")
                        }
                      }}
                    >
                      Post
                    </Button.Success>
                  </Column>
                </Row>
              </Card>
            </div>
          </div>
    );
  }
  mounted() {
    taskService.questionGetNewest().then((questionNew) => (this.questionNew = questionNew));
  }
}
