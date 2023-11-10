import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar } from '../widgets';

export class CreatePost extends Component {
  title: string = '';
  text: string = '';
  tags: string = '';
  imageLink: string = '';

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
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={5}>
              <Column width={2}>Title</Column>
              <Column width={8}>
                <Form.Input
                  type="text"
                  value={this.title}
                  onChange={(event) => (this.title = event.currentTarget.value)}
                  placeholder="Title..."
                />
              </Column>
            </Row>
            <Row marginBottom={5}></Row>
          </Card>
        </div>
      </div>
    );
  }
}
