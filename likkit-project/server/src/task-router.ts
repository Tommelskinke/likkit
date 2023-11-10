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


export default router;
