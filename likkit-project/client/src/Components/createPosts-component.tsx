import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar } from '../widgets';

export class CreatePost extends Component {
  title: string = '';
  text: string = '';
  tags: string = '';
  questionSolved: boolean = false;

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '150vh',
        }}
      >
        <div
          style={{
            margin: '1%',
          }}
        >
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={2}>
              <Column width={2}>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>Title </div>
              </Column>
              <Column width={8}>
                <Form.Input
                  type="text"
                  value={this.title}
                  onChange={(event) => (this.title = event.currentTarget.value)}
                  placeholder="Title..."
                />
              </Column>
            </Row>
            <Row marginBottom={3}>
              <Column width={2}>
                <div style={{ color: 'white', fontSize: '14px' }}>Solved?</div>
              </Column>
              <Column width={2} right>
                <Form.Checkbox
                  checked={this.questionSolved}
                  onChange={(event) =>
                    (this.questionSolved = event.currentTarget.checked ? true : false)
                  }
                />
              </Column>
            </Row>
            <Row marginBottom={5}>
              <Column width={2}></Column>
              <Column>
                <Form.Textarea
                  type="text"
                  value={this.text}
                  onChange={(event) => (this.text = event.currentTarget.value)}
                  placeholder="Write your post here..."
                />
              </Column>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}
