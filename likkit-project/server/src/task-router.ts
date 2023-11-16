import express from 'express';
import taskService from './task-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

//gets a post based on id
router.get('/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .questionGet(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

//gets the 3 most uppvoted posts 
router.get('/', (_request, response) => {
  taskService
    .questionGetThree()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets the 3 newest posts 
router.get('/new', (_request, response) => {
  taskService
    .questionGetThreeNew()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets the newest post in the database
router.get('/createPost/lol', (_request, response) => {
  taskService
    .questionGetNewest()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//creates a post
router.post('/createPost', (request, response) => {
  const data = request.body;
  if (data && data.title && data.title.length != 0)
    taskService
      .questionCreate(data.title, data.content)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question title');
});

//creates tags for a post
router.post('/createPost/tag', (request, response) => {
  const data = request.body;
    taskService
      .questionTagCreate(data.question_id, data.tag_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
});

//gets the tags a post have
router.get('/posts/:id/tag', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .questionTagGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//get comments on a post from the database
router.get('/posts/:id/comments', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .commentsGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//creates a comment on a post
router.post('/posts/:id', (request, response) => {
  const data = request.body;
  if (data && data.content && data.content.length != 0)
    taskService
      .createComment(Number(request.params.id), data.content, data.user_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing content');
});
export default router;
