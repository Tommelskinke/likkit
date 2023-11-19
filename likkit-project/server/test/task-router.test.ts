import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import taskService, { Question } from '../src/task-service';

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, -5) + '.000Z';

const formattedDateWithoutSeconds = formattedDate.replace(/:\d{2}$/, ':00');

const testQuestion: Question[] = [
  {
    username: 'batman',
    question_id: 1,
    user_id: 1,
    title: 'Help',
    content: 'I need somebody',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
    karma: 0,
  },
  {
    username: 'robin',
    question_id: 2,
    user_id: 2,
    title: 'Yesterday',
    content: 'I believe in yesterday',
    created_at: formattedDateWithoutSeconds,
    upvotes: 0,
    downvotes: 0,
    karma: 0,
  },
  {
    username: 'alfred',
    question_id: 3,
    user_id: 3,
    title: 'Hey Jude',
    content: 'Dont be afraid',
    created_at: formattedDateWithoutSeconds,
    upvotes: 0,
    downvotes: 0,
    karma: 0,
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
  pool.query('TRUNCATE TABLE question', (error) => {
    if (error) return done(error);

    // Create testQuestions sequentially in order to set correct id, and call done() when finished
    taskService
      .questionCreate(
        testQuestion[0].user_id,
        testQuestion[0].title,
        testQuestion[0].content,
        testQuestion[0].username,
      )
      .then(() =>
        taskService.questionCreate(
          testQuestion[1].user_id,
          testQuestion[1].title,
          testQuestion[1].content,
          testQuestion[1].username,
        ),
      ) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() =>
        taskService.questionCreate(
          testQuestion[2].user_id,
          testQuestion[2].title,
          testQuestion[2].content,
          testQuestion[2].username,
        ),
      ) // Create testQuestion[2] after testQuestion[1] has been created
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
