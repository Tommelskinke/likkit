import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import commentService, { Comment } from '../src/service/comment-service';

const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

const testComment: Comment[] = [
  {
    username: 'robin',
    user_pfp:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/bc74/live/1b7fa100-2d0c-11ed-b970-ff268dbbad44.jpg',
    answer_id: 2,
    best_answer: false,
    content: 'Beste RB i verden',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
    parent_answer_id: null,
    question_id: 2,
    user_id: 2,
  },
  {
    username: 'alfred',
    user_pfp:
      'https://ichef.bbci.co.uk/news/1536/cpsprodpb/bc74/live/1b7fa100-2d0c-11ed-b970-ff268dbbad44.jpg',
    answer_id: 3,
    best_answer: false,
    content: 'Beste RB i verden',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
    parent_answer_id: null,
    question_id: 3,
    user_id: 3,
  },
];

axios.defaults.baseURL = 'http://localhost:3002/api/v2';

let webServer: any;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3002, () => done());
});

beforeEach((done) => {
  // Empty 'answer'table
  pool.query('TRUNCATE TABLE answer', (error) => {
    if (error) return done(error);

    // Create testComments sequentially in order to set correct id, and call done() when finished
    commentService
      .createComment(testComment[0].question_id, testComment[0].content, testComment[0].user_id)
      .then(() =>
        commentService.createComment(
          testComment[1].question_id,
          testComment[1].content,
          testComment[1].user_id,
        ),
      ) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() => done()); // Call done() after testQuestion[1] has been created
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) {
    console.error('Web server not initialized');
    return done(new Error('Web server not initialized'));
  }
  webServer.close(() => {
    pool.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
        return done(err);
      }
      done();
    });
  });
});

describe('Create comment (POST)', () => {
  // Test for creating a comment without content
  test('Create comment without content (400 Bad Request)', (done) => {
    axios
      .post('/posts/1', { content: '', user_id: 1 })
      .then((response) => {
        expect(response.status).toEqual(400);
        done();
      })
      .catch((error) => {
        expect(error.response.status).toEqual(400);
        done();
      });
  });

  // Test for creating a comment successfully
  test('Create comment (200 OK)', (done) => {
    axios
      .post('/posts/1', { content: 'Test comment', user_id: 1 })
      .then((response) => {
        expect(response.status).toEqual(200);
        // Additional checks for response data
        done();
      })
      .catch((error) => done(error));
  });
});

describe('Delete comment (DELETE)', () => {
  // Test for successfully deleting a comment
  test('Delete comment (200 OK)', (done) => {
    axios
      .delete('/posts/1/comments/1')
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });
});
