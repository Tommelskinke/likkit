import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import taskService, { Comment } from '../src/task-service';

const date = new Date();
const formattedDate = date.toISOString().slice(0, -6);

const testComment: Comment = {
  username: 'batman',
  user_pfp:
    'https://ichef.bbci.co.uk/news/1536/cpsprodpb/bc74/live/1b7fa100-2d0c-11ed-b970-ff268dbbad44.jpg',
  answer_id: 1,
  best_answer: false,
  content: 'Beste RB i verden',
  created_at: formattedDate,
  upvotes: 0,
  downvotes: 0,
  karma: 0,
};

describe('Fetch comments (GET)', () => {
  //Tester om den kan hente alle posts
  test('Fetch all comments (200 OK)', (done) => {
    axios.get('/posts').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testComment);
      done();
    });
  });
});
