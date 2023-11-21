import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Answer, Tag } from '../question-service';
import { Card, Row, Column, Form, Button } from '../widgets';
import { createHashHistory } from 'history';
import EditorComponent from './editor-component';

const history = createHashHistory();

export class EditPost extends Component<{ match: { params: { id: number } } }> {
  title: string = '';
  content: string = '';
  tags: Tag[] = [];
  user_id: number = Number(sessionStorage.getItem('user_id'));

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

  questionSolved: boolean = false;
  questionJS: boolean = false;
  questionRust: boolean = false;
  questionLinux: boolean = false;

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this); // Bind the delete method
  }

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
            {/* ... (rest of your render method) ... */}
          </Card>
        </div>
      </div>
    );
  }

  mounted() {
    taskService.commentsGet(this.props.match.params.id).then((comment) => (this.comment = comment));
  }
  /*
  delete() {
    taskService.questionRemove(this.answer.answer_id).then(() => {
      // Redirect to the post list or homepage after deletion
      history.push('/posts/'); // Change this to the desired path
    });
  }
  */
}
