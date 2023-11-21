import express from 'express';
import questionService from '../service/question-service';

const router = express.Router();

//gets a post based on id
router.get('/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  questionService
    .questionGet(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

//gets the 3 most uppvoted posts
router.get('/', (_request, response) => {
  questionService
    .questionGetThree()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets the 3 newest posts
router.get('/new', (_request, response) => {
  questionService
    .questionGetThreeNew()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets all posts sorted by karma
router.get('/posts', (_request, response) => {
  questionService
    .questionGetAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets all posts sorted by newest
router.get('/postsNew', (_request, response) => {
  questionService
    .questionGetAllNew()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets all unanswered posts
router.get('/postsUnanswered', (_request, response) => {
  questionService
    .questionGetUnanswered()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});
//gets the newest post in the database
router.get('/createPost/:id', (_request, response) => {
  questionService
    .questionGetNewest()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//creates a post
router.post('/createPost', (request, response) => {
  const data = request.body;
  if (data && data.title && data.title.length != 0)
    questionService
      .questionCreate(data.user_id, data.title, data.content)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question title');
});

//Edits a post
router.post('/editPost/:id', (request, response) => {
  const id = Number(request.params.id);
  const data = request.body;
  questionService
    .questionEdit(data.title, data.content, id)
    .then(() => response.send({ message: 'Edit successful' }))
    .catch((error) => {
      if (error.message === 'Failed to edit post') {
        response.status(404).send('Failed to edit post');
      } else {
        response.status(500).send(error);
      }
    });
});

//creates tags for a post
router.post('/createPost/tag', (request, response) => {
  const data = request.body;
  questionService
    .questionTagCreate(data.question_id, data.tag_id)
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
});

//deletes a post
router.delete('/posts/:id', (request, response) => {
    questionService
      .questionRemove(Number(request.params.id))
      .then((_result) => response.send())
      .catch((error) => response.status(500).send(error));
  });
  

//remove tag from a post
router.post('/editPost/:id/tag/remove', (request, response) => {
  const id = Number(request.params.id);
  const data = request.body;
  questionService
    .questionTagRemove(id, data.tag_id)
    .then(() => response.send({ message: 'Edit successful' }))
    .catch((error) => {
      if (error.message === 'Failed to edit post') {
        response.status(404).send('Failed to edit post');
      } else {
        response.status(500).send(error);
      }
    });
});

//gets the tags a post have
router.get('/posts/:id/tag', (request, response) => {
  const id = Number(request.params.id);
  questionService
    .questionTagGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//get all posts with a given tag
router.get('/posts/tags/:id', (request, response) => {
  const id = Number(request.params.id);
  questionService
    .questionGetAllTag(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

export default router;
