import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button } from '../widgets';

export class Login extends Component<{ match: { params: { id: number } } }> {
  username = '';
  password = '';
  GoogleLoginButton = () => {
    return (
      <a style={{ color: 'white' }} href="http://localhost:3000/oauth2/google">
        Log in as User
      </a>
    );
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
          height: '100vh',
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
          <Card title="Log in as Admin" width="100%" backgroundColor="rgb(90,90,90)">
            <Row>
              <Column width={9}>
                <Form.Input
                  type="text"
                  value={this.username}
                  onChange={(event) => (this.username = event.currentTarget.value)}
                  placeholder="username"
                />
                <Form.Input
                  type="password"
                  value={this.password}
                  onChange={(event) => (this.password = event.currentTarget.value)}
                  placeholder="password"
                />
                <Button.Success
                  onClick={() => {
                    console.log(this.username);
                  }}
                >
                  Login
                </Button.Success>
              </Column>
              <Column width={3}>
                <this.GoogleLoginButton />
              </Column>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}
