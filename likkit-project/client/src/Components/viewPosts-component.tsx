import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Question } from '../../../server/src/task-service';
import { Alert, Card, Row, Column, Form } from '../widgets';

export class ViewPost extends Component<{ match: { params: { id: number } } }> {
  question: Question = {
    question_id: 0,
    user_id: 0,
    tag_id: [],
    title: '',
    content: '',
    created_at: '',
    upvotes: 0,
    downvotes: 0,
    karma: 0,
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150vh',
        }}
      >
        <div
          style={{
            margin: '1%',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          <Card title="Question" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={5}>
              <Column width={2}>{this.question.title}</Column>
              <Column width={8}></Column>
            </Row>
            <Row marginBottom={5}>{this.question.content}</Row>
          </Card>
        </div>
      </div>
    );
  }
  mounted() {
    taskService
      .questionGet(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error) => Alert.danger('Error getting task: ' + error.message));
  }
}
