import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import questionService, { Question } from '../src/service/question-service';
const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

const testQuestion: Question[] = [
  {
    username: '1',
    question_id: 1,
    user_id: 1,
    title: 'Help',
    content: 'I need somebody',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
  },
  {
    username: '2',
    question_id: 2,
    user_id: 2,
    title: 'Yesterday',
    content: 'I believe in yesterday',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
  },
  {
    username: '3',
    question_id: 3,
    user_id: 3,
    title: 'Hey Jude',
    content: 'Dont be afraid',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
  },
];

axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer: any;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  // Delete all questions, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE question', (error) => {
    if (error) return done(error);

    // Create testQuestions sequentially in order to set correct id, and call done() when finished
    questionService
      .questionCreate(testQuestion[0].user_id, testQuestion[0].title, testQuestion[0].content)
      .then(() =>
        questionService.questionCreate(
          testQuestion[1].user_id,
          testQuestion[1].title,
          testQuestion[1].content,
        ),
      ) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() =>
        questionService.questionCreate(
          testQuestion[2].user_id,
          testQuestion[2].title,
          testQuestion[2].content,
        ),
      ) // Create testQuestion[2] after testQuestion[1] has been created
      .then(() => done()); // Call done() after testQuestion[2] has been created
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

describe('Fetch posts (GET)', () => {
  // Test to see if the server responds with all posts
  test('Fetch all posts (200 OK)', (done) => {
    axios
      .get('/posts')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testQuestion);
        done();
      })
      .catch((error) => done(error));
  });

  // Test to see if the server responds with a single post
  test('Fetch post (200 OK)', (done) => {
    axios
      .get('/posts/1')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testQuestion[0]);
        done();
      })
      .catch((error) => done(error));
  });

  // Test to check if the server returns a 404 error when trying to fetch a post that doesn't exist
  test('Failing to fetch post that doesnt exist (404 Not Found)', (done) => {
    axios
      .get('/posts/4')
      .then(() => done(new Error('Expected to fail with 404 Not Found')))
      .catch((error) => {
        expect(error.response.status).toEqual(404);
        done();
      });
  });
});

describe('Create new post (POST)', () => {
  // Test to check if the server returns a 200 status when successfully creating a post
  test('Create new post (200 OK)', (done) => {
    axios
      .post('/createPost', {
        user_id: 1,
        title: 'Yellow Submarine',
        content: 'We all live in a yellow submarine',
        username: 'batman',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ id: 4 });
        done();
      })
      .catch((error) => done(error));
  });
});

describe('Delete post (DELETE)', () => {
  // Test to check if the server returns a 200 status when successfully deleting a post
  test('Delete post (200 OK)', (done) => {
    axios
      .delete('/posts/2')
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });
});

describe('Update post (PUT)', () => {
  // Test to check if the server returns a 200 status when successfully updating a post
  test('Update post (200 OK)', (done) => {
    axios
      .put('/posts', {
        title: 'Help',
        content: 'I need somebody',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });
});
