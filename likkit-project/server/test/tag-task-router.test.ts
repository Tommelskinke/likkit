import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import questionService, { tag } from '../src/service/question-service';

const testTag = [
  { question_id: 1, tag_id: 1, tag_name: 'JS' },
  { question_id: 2, tag_id: 2, tag_name: 'Python' },
];

axios.defaults.baseURL = 'http://localhost:3003/api/v2';

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
    questionService
      .questionTagCreate(testTag[0]question_id, testTag[0].tag_id)
      .then(() =>
        questionService.questionCreate(testTag[1].user_id, testTag[1].tag_id),
      ) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() => done()); // Call done() after testQuestion[2] has been created
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done(new Error());
  webServer.close(() => pool.end(() => done()));
});
