import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Question, Tag } from '../question-service';
import { Card, Row, Column, Form, Button } from '../widgets';
import { createHashHistory } from 'history';
import EditorComponent from './editor-component';

const history = createHashHistory();

export class EditPost extends Component<{ match: { params: { id: number } } }> {
  title: string = '';
  content: string = '';
  tags: Tag[] = [];
  user_id: number = Number(sessionStorage.getItem('user_id'));

  questionNew: Question = {
    username: '',
    question_id: 0,
    user_id: 0,
    title: '',
    content: '',
    created_at: '',
    upvotes: 0,
    downvotes: 0,
  };

  questionSolved: boolean = false;
  questionJS: boolean = false;
  questionRust: boolean = false;
  questionLinux: boolean = false;

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
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>Title </div>
              </Column>
              <Column width={7} none>
                <Form.Input
                  type="text"
                  value={this.questionNew.title}
                  onChange={(event) => (this.questionNew.title = event.currentTarget.value)}
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
                <EditorComponent
                  onContentChange={(content: string) => {
                    this.questionNew.content = content;
                  }}
                />
              </Column>
            </Row>
            <Row marginBottom={2}>
              <Column right>
                <Button.Success
                  onClick={() => {
                    if (this.title.length <= 255) {
                      taskService
                        .questionEdit(
                          this.questionNew.title,
                          this.questionNew.content,
                          this.questionNew.question_id,
                        )
                        .then(() => {});

                      //gjør dette om til en forEach loop
                      if (this.questionSolved) {
                        taskService.questionTagCreate(this.questionNew.question_id, 1);
                      } else {
                        taskService.questionTagRemove(this.questionNew.question_id, 1);
                      }
                      if (this.questionJS) {
                        taskService.questionTagCreate(this.questionNew.question_id, 2);
                      } else {
                        taskService.questionTagRemove(this.questionNew.question_id, 2);
                      }
                      if (this.questionRust) {
                        taskService.questionTagCreate(this.questionNew.question_id, 3);
                      } else {
                        taskService.questionTagRemove(this.questionNew.question_id, 3);
                      }
                      if (this.questionLinux) {
                        taskService.questionTagCreate(this.questionNew.question_id, 4);
                      } else {
                        taskService.questionTagRemove(this.questionNew.question_id, 4);
                      }
                      taskService.questionGetNewest().then(() => {});
                      setTimeout(() => {
                        history.push('/posts/' + this.questionNew.question_id);
                      }, 100);
                    } else {
                      alert('The title cant be more than 255 characters!');
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
    taskService
      .questionGet(this.props.match.params.id)
      .then((question) => (this.questionNew = question));
    taskService
      .questionTagGet(this.props.match.params.id)
      .then((tags) => (this.tags = tags))
      .then(() => {
        this.tags.forEach((tag) => {
          switch (tag.tag_id) {
            case 1:
              this.questionSolved = true;
              break;
            case 2:
              this.questionJS = true;
              break;
            case 3:
              this.questionRust = true;
              break;
            case 4:
              this.questionLinux = true;
              break;
            // Add more cases if needed for additional tags
            default:
              break;
          }
        });
      });
  }
}
