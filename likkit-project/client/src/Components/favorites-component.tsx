import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar } from '../widgets';

export class FavoriteList extends Component {
  //posts: string[] = ['Post1', 'post2']; //Denne må endres te rett type seinere
  search: string = '';

  posts = [
    {
      text: 'Se på kjeksene mine!!!!',
      imageLink: 'https://i.scdn.co/image/ab6761610000e5eba3a7cba23d68a4e73c3b8155',
      likks: '30',
    },
    {
      text: 'anyways... COYS',
      imageLink: 'https://i.ytimg.com/vi/H8ZnIAama1A/maxresdefault.jpg',
      likks: '15',
    },
    {
      text: 'Fo.',
      likks: '45',
    },
  ];

  alerttest = () => {
    alert('SHREK');
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(110, 160, 175), rgb(15, 40, 60))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100vh', //bør få denne til å scale
        }}
      >
        <div
          style={{
            margin: '2%',
          }}
        >
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Row marginBottom={5}>
              <div
                style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginLeft: '5px' }}
              >
                <Column>Sort by:</Column>
                <Column>
                  <div style={{ marginLeft: '10px' }}>
                    <select
                      id="dropdown"
                      style={{
                        appearance: 'none',
                        background: '#5A5A5A',
                        color: '#ffffff',
                        cursor: 'pointer',
                        border: '1px solid #ffffff',
                        borderRadius: '10px',
                        padding: '5px',
                      }}
                    >
                      <option value="">Popular</option>
                      <option value="op1">Best</option>
                    </select>
                  </div>
                </Column>
                <Column right>
                  <div
                    style={{
                      appearance: 'none',
                      background: '#5A5A5A',
                      color: '#ffffff',
                      cursor: 'pointer',
                      border: '1px solid #ffffff',
                      borderRadius: '10px',
                      padding: '5px',
                    }}
                  >
                    <select
                      id="filterdropdown"
                      style={{
                        appearance: 'none',
                        border: '#5A5A5A',
                        background: '#5A5A5A',
                        color: '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="none">None</option>
                      <option value="tagBesvart">Besvarte spørsmål</option>
                      <option value="tagUbesvart">Ubesvarte spørsmål</option>
                      <option value="tagMine">Mine spørsmål</option>
                      <option value="tagJS">Javascript</option>
                      <option value="tagC">C</option>
                    </select>
                  </div>
                </Column>
                <Column right>
                  <div style={{ marginRight: '5px' }}>Filters:</div>
                </Column>
              </div>
            </Row>

            <Card title="" width="100%" backgroundColor="rgb(70,70,70)" marginBottom={-3}>
              <Row>
                <Column>
                  {this.posts.map((post, i) => (
                    <Card
                      title=""
                      width="100%"
                      backgroundColor="rgb(60,60,60)"
                      marginBottom={3}
                      key={i}
                    >
                      <Button.Post onClick={this.alerttest}>
                        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>
                          <p style={{ position: 'absolute', top: '0', left: '10' }}>{post.likks}</p>
                          <p>{post.text}</p>
                        </div>
                      </Button.Post>
                    </Card>
                  ))}
                </Column>
                <Column right>
                  <Form.Input
                    type="text"
                    value={this.search}
                    onChange={(event) => (this.search = event.currentTarget.value)}
                    placeholder="Search..."
                  />
                </Column>
              </Row>
            </Card>
          </Card>
        </div>
      </div>
    );
  }
}
