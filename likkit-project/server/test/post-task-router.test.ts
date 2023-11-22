import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import questionService, { Question } from '../src/service/question-service';

const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

const testQuestion: Question[] = [
  {
    //@ts-ignore
    username: null,
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
    //@ts-ignore
    username: null,
    question_id: 2,
    user_id: 2,
    title: 'Yesterday',
    content: 'I believe in yesterday',
    created_at: formattedDate,
    upvotes: 0,
    downvotes: 0,
    karma: 0,
  },
  {
    //@ts-ignore
    username: null,
    question_id: 3,
    user_id: 3,
    title: 'Hey Jude',
    content: 'Dont be afraid',
    created_at: formattedDate,
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
    questionService
      .questionCreate(testQuestion[0].user_id, testQuestion[0].title, testQuestion[0].content)
      .then(() =>
        questionService.questionCreate(
          testQuestion[1].user_id,
          testQuestion[1].title,
          testQuestion[1].content,
        ),
      ) // Create testQuestion[1] after testQuestion[0] has been created
      .then(() =>
        questionService.questionCreate(
          testQuestion[2].user_id,
          testQuestion[2].title,
          testQuestion[2].content,
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
  //Tester om den kan hente alle posts
  test('Fetch all posts (200 OK)', (done) => {
    axios.get('/posts').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestion);
      done();
    });
  });

  test('Fetch post (200 OK)', (done) => {
    axios.get('/posts/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestion[0]);
      done();
    });
  });

  test('Failing to fetch post that doesnt exitst (404 Not Found)', (done) => {
    axios
      .get('/posts/4')
      .then((_response) => done(new Error()))
      .catch((error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new post (POST)', () => {
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
      });
  });
});

describe('Delete post (DELETE)', () => {
  test('Delete post (200 OK)', (done) => {
    axios.delete('/posts/2').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
