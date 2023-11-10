export class UserProfile extends Component {
  user: string = 'banan';
  userType: string = 'adminierinios';
  likkAmount: number = 696969;
  upvoteAmount: number = 1337;
  commentAmount: number = 2;
  bestCommentAmount: number = 0;

  render() {
    return (
      <>
      <Card title='User profile'>
        <Column width={3}>
          <Row >
            Username: {this.user}
          </Row>
          <Row>
            Usertype: {this.userType}
          </Row>
        </Column>
        <Column width={3}>
          <Row>
            Licks: {this.likkAmount}
          </Row>
          <Row>
            Upvotes: {this.upvoteAmount}
          </Row>
        </Column>
        <Column right width={3}>
          <Row>
            Comments: {this.commentAmount}
          </Row>
          <Row>
            Best comments: {this.bestCommentAmount}
          </Row>
        </Column>
      <Button.Light>Favorite Posts</Button.Light>
      <Button.Light>Best Post</Button.Light>
      <Button.Light>Best Comment</Button.Light>
      <Button.Light>Favorite Comments</Button.Light>
      <Button.Light>All Posts</Button.Light>
      <Button.Light>All Comments</Button.Light>
      </Card>
      </>
    );
  }
}
