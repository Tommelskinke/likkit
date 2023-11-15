import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button } from '../widgets';

export class Auth extends Component<{ match: { params: { id: number } } }> {
  username = "";
  password = "";
  
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
          <Card title="Login" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={5}>
              <Column> 
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
                      console.log(this.username)
                    }}>login
                </Button.Success>
             </Column>
              <Column width={8}></Column>
            </Row>
            <Row marginBottom={5}>{}</Row>
          </Card>
        </div>
      </div>
    );
  }

}
