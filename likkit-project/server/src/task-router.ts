import express from 'express';
import taskService from './task-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .questionGet(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

router.get('/', (_request, response) => {
  taskService
    .questionGetThree()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.post('/createPost', (request, response) => {
  const data = request.body;
  if (data && data.title && data.title.length != 0)
    taskService
      .questionCreate(data.title, data.content)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question title');
});

router.get('/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .commentsGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});
export default router;
