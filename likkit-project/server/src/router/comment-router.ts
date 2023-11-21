import express from 'express';
import commentService from '../service/comment-service';

const router = express.Router();

//get comments on a post from the database
router.get('/posts/:id/comments', (request, response) => {
  const id = Number(request.params.id);
  commentService
    .commentsGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//get specific comment
router.get('/posts/:id/comments/:id', (request, response) => {
  const id = Number(request.params.id);
  commentService
    .commentsGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//creates a comment on a post
router.post('/posts/:id', (request, response) => {
  const data = request.body;
  if (data && data.content && data.content.length != 0)
    commentService
      .createComment(Number(request.params.id), data.content, data.user_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing content');
});

//sets a comments as best
router.post('/posts/answers/:id/best', (request, response) => {
  const id = Number(request.params.id);
  commentService
    .bestAnswer(id)
    .then(() => response.send({ message: 'Best answer successful' }))
    .catch((error) => {
      if (error.message === 'Answer not found') {
        response.status(404).send('Answer not found');
      } else {
        response.status(500).send(error);
      }
    });
});

//sets a comment as not best
router.post('/posts/answers/:id/notBest', (request, response) => {
  const id = Number(request.params.id);
  commentService
    .notBestAnswer(id)
    .then(() => response.send({ message: 'Best answer successful' }))
    .catch((error) => {
      if (error.message === 'Answer not found') {
        response.status(404).send('Answer not found');
      } else {
        response.status(500).send(error);
      }
    });
});

//creates a reply to a comment
router.post('/posts/:id/reply', (request, response) => {
  const data = request.body;
  if (data && data.content && data.content.length != 0)
    commentService
      .createCommentReply(
        Number(request.params.id),
        data.parent_answer_id,
        data.content,
        data.user_id,
      )
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing content');
});

//gets the comments sorted by newest
router.get('/posts/:id/NewComments', (request, response) => {
  const id = Number(request.params.id);
  commentService
    .commentsGetNewest(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets the comments sorted by most upvotes
router.get('/posts/:id/sortBestComment', (request, response) => {
  const id = Number(request.params.id);
  commentService
    .sortBestComment(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

export default router;
