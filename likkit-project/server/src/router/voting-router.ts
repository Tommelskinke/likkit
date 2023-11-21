import express from 'express';
import votingService from '../service/voting-service';

const router = express.Router();

//upvotes på en post
router.post('/posts/:id/upvote', (request, response) => {
  const id = Number(request.params.id);

  votingService
    .upvoteQuestion(id)
    .then(() => response.send({ message: 'Upvote successful' }))
    .catch((error) => {
      if (error.message === 'Question not found') {
        response.status(404).send('Question not found');
      } else {
        response.status(500).send(error);
      }
    });
});

//downvotes på en post
router.post('/posts/:id/downvote', (request, response) => {
  const id = Number(request.params.id);

  votingService
    .downvoteQuestion(id)
    .then(() => response.send({ message: 'Downvote successful' }))
    .catch((error) => {
      if (error.message === 'Question not found') {
        response.status(404).send('Question not found');
      } else {
        response.status(500).send(error);
      }
    });
});

//upvotes på kommentarer
router.post('/posts/answers/:id/upvote', (request, response) => {
  const id = Number(request.params.id);

  votingService
    .upvoteAnswer(id)
    .then(() => response.send({ message: 'Upvote successful' }))
    .catch((error) => {
      if (error.message === 'Answer not found') {
        response.status(404).send('Answer not found');
      } else {
        response.status(500).send(error);
      }
    });
});

//downvotes på kommentar
router.post('/posts/answers/:id/downvote', (request, response) => {
  const id = Number(request.params.id);

  votingService
    .downvoteAnswer(id)
    .then(() => response.send({ message: 'Downvote successful' }))
    .catch((error) => {
      if (error.message === 'Answer not found') {
        response.status(404).send('Answer not found');
      } else {
        response.status(500).send(error);
      }
    });
});

export default router;
