import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import taskService, { Comment } from '../src/task-service';

const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

const testComment: Comment[] = [
  {
    username: 'Elias',
    user_pfp: 'ur mom',
    answer_id: 1,
    best_answer: false,
    content: 'Beste RB i verden',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
    karma: 0,
    parent_answer_id: null,
    question_id: 1,
    user_id: 1,
  },
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
    karma: 0,
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
    karma: 0,
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
  //Slett alle questions, og reset id auto-increment startverdi
  pool.query('TRUNCATE TABLE answer', (error) => {
    if (error) return done(error);

    // Create testQuestions sequentially in order to set correct id, and call done() when finished
    taskService
      .createComment(testComment[0].question_id, testComment[0].content, testComment[0].user_id)
      .then(() =>
        taskService.createComment(
          testComment[1].question_id,
          testComment[1].content,
          testComment[1].user_id,
        ),
      ) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() =>
        taskService.createComment(
          testComment[2].question_id,
          testComment[2].content,
          testComment[2].user_id,
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
/*
describe('Fetch comments (GET)', () => {
  //Tester om den kan hente alle kommentarer
  test('Fetch one comment (200 OK)', (done) => {
    axios.get('/posts/1/comments').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testComment[0]);
      done();
    });
  });
});

*/
describe('Fetch comments (GET)', () => {
  // Tester om den kan hente alle kommentarer
  test('Fetch one comment (200 OK)', (done) => {
    axios.get('/posts/1/comments').then((response) => {
      // Update the created_at field to match the received value

      expect(response.status).toEqual(200);
      expect(response.data[0]).toEqual(testComment[0]);
      done();
    });
  });
});

/*
describe('Delete comment (DELETE)', () => {
  test('Delete post (200 OK)', (done) => {
    axios.delete('/posts/1/comments/1').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
*/
