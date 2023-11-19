import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import taskService, { Question } from '../src/task-service';

const testQuestion: Question[] = [
  {
    username: 'batman',
    question_id: 1,
    user_id: 1,
    title: 'Help',
    content: 'I need somebody',
    created_at: '2023-11-10 10:56:20',
    upvotes: 1,
    downvotes: 0,
    karma: 1,
  },
  {
    username: 'robin',
    question_id: 2,
    user_id: 2,
    title: 'Yesterday',
    content: 'I believe in yesterday',
    created_at: '2023-11-12 11:56:20',
    upvotes: 10,
    downvotes: 3,
    karma: 7,
  },
  {
    username: 'alfred',
    question_id: 1,
    user_id: 1,
    title: 'Hey Jude',
    content: 'Dont be afraid',
    created_at: '1939-11-10 19:56:20',
    upvotes: 100,
    downvotes: 30,
    karma: 70,
  },
];

axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer: any;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  //Slett alle questions, og reset id auto-increment startverdi
  pool.query('TRUNCATE TABLE Question', (error) => {
    if (error) return done(error);

    // Create testQuestions sequentially in order to set correct id, and call done() when finished
    taskService
      .create(testQuestion[0].title)
      .then(() => taskService.create(testQuestion[1].title, testQuestion[1].content)) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() => taskService.create(testQuestion[2].title, testQuestion[2].content)) // Create testQuestion[2] after testQuestion[1] has been created
      .then(() => done()); // Call done() after testQuestion[2] has been created
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Fetch posts (GET)', () => {
  test('Fetch all posts (200 OK)', (done) => {
    axios.get('/posts').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestion);
      done();
    });
  });
});
