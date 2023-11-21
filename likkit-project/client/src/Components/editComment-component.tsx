import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Answer, Question, Tag } from '../question-service';
import { Card, Row, Column, Form, Button } from '../widgets';
import { createHashHistory } from 'history';
import EditorComponent from './editor-component';

const history = createHashHistory();

export class EditComment extends Component<{ match: { params: { id: number } } }> {
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

  answer: Answer = {
    answer_id: 0,
    question_id: 0,
    parent_answer_id: null,
    user_id: 0,
    best_answer: false,
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
    const currentContent = String(this.answer.content);
    console.log(currentContent);
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
                <Button.Danger onClick={this.delete}>Delete</Button.Danger>
              </Column>
            </Row>

            <Row marginBottom={3}>
              <Column width={2}></Column>
            </Row>
            <Row marginBottom={5}>
              <Column width={2}></Column>
              <Column width={9} none>
                <EditorComponent
                  initialValue={currentContent}
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
                          this.answer.content,
                          this.questionNew.question_id,
                        )
                        .then(() => {});

                      const tagsToCheck = [
                        { condition: this.questionSolved, tagId: 1 },
                        { condition: this.questionJS, tagId: 2 },
                        { condition: this.questionRust, tagId: 3 },
                        { condition: this.questionLinux, tagId: 4 },
                      ];
                      tagsToCheck.forEach(({ condition, tagId }) => {
                        if (condition) {
                          taskService.questionTagCreate(this.questionNew.question_id, tagId);
                        } else {
                          taskService.questionTagRemove(this.questionNew.question_id, tagId);
                        }
                      });
                      taskService.questionGetNewest().then(() => {});
                      setTimeout(() => {
                        history.push('/posts/' + 80);
                      }, 100);
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
  delete() {
    taskService.questionRemove(this.questionNew.question_id).then(() => {
      // Redirect to the post list or homepage after deletion
      history.push('/posts/'); // Change this to the desired path
    });
  }
}
