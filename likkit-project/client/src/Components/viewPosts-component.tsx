import * as React from 'react';
import { Component } from 'react-simplified';
import taskService, { Question } from '../question-service';
import { Alert, Card, Row, Column, Form, Button } from '../widgets';

type Comment = {
  answer_id: number;
  question_id: number;
  user: string;
  best_answer: boolean;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  karma: number;
};

export class ViewPost extends Component<{ match: { params: { id: number } } }> {
  question: Question = {
    question_id: 1,
    user_id: 0,
    title: 'Hjelp, igjen',
    content:
      'Jeg trenger hjelp med noe, igjen. eqpuoy piuypiuwgy iyri gy orieytgo uer gouyreo uftr eouy uretgo ureg uerygf oeqrgfouerg oerg  iupø9u reqøoyeigy eriluy l iqert lyerg iliuher øoy lierqgl iertygu ru goøhl iuegyure ulbiuev uirvuøhrewp dfhbjdfwvhlue vladf.vlou dfboiru-b reoiufwe uew pgyp98w',
    created_at: '2023-11-10 10:56:20',
    upvotes: 2,
    downvotes: 1,
    karma: 1,
  };
  writeComment: string = '';
  comment1: Comment = {
    answer_id: 1,
    question_id: 1,
    user: 'testperson1',
    best_answer: true,
    content:
      ' afa aotfyg osuvg ousg fuiogads uigvo iudsg osgighih fiuy ioh ily asoifiuyi ug oruyuiyerg fygerwqo8f geruyfv luerg vkerqvfiuerwhq fgpiqegrfo8 7er yfo qergoqegfierglifbvhbf,kgu qre09uyoqlihv aføuvhlufavoayv ladvladfyv bliuyelbvy dlobyeragh k',
    created_at: '2023-11-10 10:56:20',
    upvotes: 1,
    downvotes: 1,
    karma: 1,
  };
  comment2: Comment = {
    answer_id: 2,
    question_id: 2,
    user: 'testperson2',
    best_answer: false,
    content: 'test2',
    created_at: '2022-1-16 12:32:19',
    upvotes: 1,
    downvotes: 1,
    karma: 1,
  };
  comments: Comment[] = [this.comment1, this.comment2];

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
            margin: '2%',
          }}
        >
          <Card title="" width="100%" backgroundColor="rgb(90,90,90)">
            <Card title="" width="100%" backgroundColor="rgb(80,80,80)">
              <div
                style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <Row marginBottom={3}>
                  <Column width={1}></Column>
                  <Column>{this.question.title}</Column>
                  <Column width={1}></Column>
                </Row>
              </div>
              <div
                style={{
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                <Row marginBottom={5}>
                  <Column width={1}>a</Column>
                  <Column>{this.question.content}</Column>
                  <Column width={1}></Column>
                </Row>
              </div>
            </Card>
            <Card title="" width="100%" backgroundColor="rgb(80,80,80)">
              <div
                style={{
                  color: 'white',
                  fontSize: '17px',
                }}
              >
                <Row marginBottom={3}>
                  <Column width={1}></Column>
                  <Column width={1}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9513/9513587.png"
                      alt="Picture of comment bouble"
                    />
                  </Column>
                  <Column width={2}>Comments: {this.comments.length}</Column>
                </Row>
              </div>

              <Row marginBottom={3}>
                <Column width={1}></Column>
                <Column none>
                  <Form.Textarea
                    type="text"
                    value={this.writeComment}
                    onChange={(event) => (this.writeComment = event.currentTarget.value)}
                    placeholder="Write your post here..."
                    style={{ height: '30vh' }}
                  />
                </Column>
              </Row>
              <Row marginBottom={5}>
                <Column right>
                  <Button.Success onClick={() => {}}>Post</Button.Success>
                </Column>
              </Row>
              {this.comments.map((comment, i) => (
                <div
                  style={{
                    color: 'white',
                    fontSize: '14px',
                  }}
                >
                  <Row marginBottom={4}>
                    <Row marginBottom={1}>
                      <Column width={1}>
                        <img
                          src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                          alt="Green profile picture"
                        />
                      </Column>
                      <Column width={2}>{comment.user}</Column>
                      <Column width={3}>{comment.created_at}</Column>
                    </Row>
                    <Row>
                      <Column width={1}>↑</Column>
                      <Column width={1}>{comment.karma}</Column>
                      <Column width={1}>↓</Column>
                      <Column none>{comment.content}</Column>
                    </Row>
                  </Row>
                </div>
              ))}
            </Card>
          </Card>
        </div>
      </div>
    );
  }
  /*mounted() {
    taskService
      .questionGet(this.props.match.params.id)
      .then((question) => (this.question = question))
      .catch((error) => Alert.danger('Error getting task: ' + error.message));
  }*/
}
