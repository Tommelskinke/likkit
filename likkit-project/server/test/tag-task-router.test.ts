import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import questionService, { tag, Question } from '../src/service/question-service';
const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

const testTag: tag[] = [
  { tag_id: 1, tag_name: 'JS' },
  { tag_id: 2, tag_name: 'Python' },
];

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

axios.defaults.baseURL = 'http://localhost:3003/api/v2';

let webServer: any;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3003, () => done());
});

beforeEach((done) => {
  //Slett alle questions, og reset id auto-increment startverdi
  pool.query('TRUNCATE TABLE question_tag', (error) => {
    if (error) return done(error);

    // Create a couple testQuestions, and attempting to tag the posts, finally calling done() when finished
    questionService
      .questionCreate(testQuestion[0].user_id, testQuestion[0].title, testQuestion[0].content)
      .then(() =>
        questionService.questionCreate(
          testQuestion[1].user_id,
          testQuestion[1].title,
          testQuestion[1].content,
        ),
      )
      .then(() => questionService.questionTagCreate(testQuestion[0].question_id, testTag[0].tag_id))
      .then(() => questionService.questionTagCreate(testQuestion[1].question_id, testTag[1].tag_id))
      .then(() => done()); // Call done() after tagging questions
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

describe('Create question and tag question (POST)', () => {
  // Test to check if the server returns a 200 status when successfully creating a question
  test('Create question (200 OK)', (done) => {
    axios
      .post('/questions', {
        user_id: 1,
        title: 'Test question',
        content: 'Test content',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data.user_id).toEqual(1);
        expect(response.data.title).toEqual('Test question');
        expect(response.data.content).toEqual('Test content');
        done();
      })
      .catch((error) => done(error));
  });

  // Test to check if the server returns a 200 status when successfully tagging a question
  test('Tag question (200 OK)', (done) => {
    axios
      .post('/questions/1/tags', { tag_id: 1 })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data.tag_id).toEqual(1);
        expect(response.data.question_id).toEqual(1);
        done();
      })
      .catch((error) => done(error));
  });

  // Test to check if the server returns an error status when trying to tag a question that doesn't exist
  test('Tag non-existent question (400 Bad Request)', (done) => {
    axios
      .post('/questions/9999/tags', { tag_id: 1 })
      .then(() => done(new Error('Expected to receive a 400 Bad Request error.')))
      .catch((error) => {
        expect(error.response.status).toEqual(400);
        done();
      });
  });
});
