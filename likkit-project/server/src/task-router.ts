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

//gets all posts sorted by karma
router.get('/posts', (_request, response) => {
  taskService
    .questionGetAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets all posts sorted by newest
router.get('/postsNew', (_request, response) => {
  taskService
    .questionGetAllNew()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//gets all unanswered posts
router.get('/postsUnanswered', (_request, response) => {
  taskService
    .questionGetUnanswered()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});
//gets the newest post in the database
router.get('/createPost/new', (_request, response) => {
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
      .questionCreate(data.user_id, data.title, data.content)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question title');
});

//Edits a post
router.post('/editPost/:id', (request, response) => {
  const id = Number(request.params.id);
  const data = request.body;
  taskService
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
  taskService
    .questionTagCreate(data.question_id, data.tag_id)
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
});

//remove tag from a post
router.post('/editPost/:id/tag/remove', (request, response) => {
  const id = Number(request.params.id);
  const data = request.body;
  taskService
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
  taskService
    .questionTagGet(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//get all posts with a given tag
router.get('/posts/tags/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .questionGetAllTag(id)
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

//get specific comment
router.get('/posts/:id/comments/:id', (request, response) => {
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

//upvotes på en post
router.post('/posts/:id/upvote', (request, response) => {
  const id = Number(request.params.id);

  taskService
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

  taskService
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

  taskService
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

  taskService
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

//Setter et svar som beste
router.post('/posts/answers/:id/best', (request, response) => {
  const id = Number(request.params.id);
  taskService
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

//Setter et svar som ikke beste
router.post('/posts/answers/:id/notBest', (request, response) => {
  const id = Number(request.params.id);
  taskService
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

//gets best comments
router.get('/user/bestComment', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getBestComments(user_id)
      .then((bestComments) => response.send(bestComments))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets all comments
router.get('/user/allComments', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getAllUserComments(user_id)
      .then((allComments) => response.send(allComments))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets all posts
router.get('/user/allPosts', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getAllUserPosts(user_id)
      .then((allPosts) => response.send(allPosts))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets best posts
router.get('/user/bestPosts', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getBestUserPosts(user_id)
      .then((bestPosts) => response.send(bestPosts))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets likks
router.get('/user/totalLicks', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getUserLikks(user_id)
      .then((likks) => response.send(likks))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

router.post('/user/newPfp', (request, response) => {
  const data = request.body;
  if (data && data.newpfppath && data.newpfppath.length != 0) {
    taskService
      .updateProfilePicture(data.user_id, data.newpfppath)
      .then(() => response.send({ message: 'Upvote successful' }))
      .catch((error) => response.status(500).send(error));
  } else response.status(400).send('Missing user_id');
});

router.post('/posts/:id/reply', (request, response) => {
  const data = request.body;
  if (data && data.content && data.content.length != 0)
    taskService
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

router.delete('/posts/:id', (request, response) => {
  taskService
    .questionRemove(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

router.get('/favorites', (request, response) => {
  taskService
    .getUserFavorites(Number(request.query.user_id))
    .then((favorites) => response.send(favorites))
    .catch((error) => response.status(500).send(error));
});

router.post('/posts/:id/favorites/add', (request, response) => {
  const data = request.body;
  taskService
    .addFavorite(
      Number(data.user_id),
      Number(data.question_id),
      data.answer_id !== null ? Number(data.answer_id) : null,
    )
    .then((id) => response.send({ id: id }));
});

router.post('/posts/:id/favorites/remove', (request, response) => {
  const data = request.body;
  taskService
    .removeFavorite(data.user_id, Number(data.question_id), data.answer_id)
    .then(() => {
      response.send({ message: 'Favorite removed' });
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

router.delete('/tasks/:id', (request, response) => {
  taskService
    .postDelete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

router.get('/user/favPost', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getUserFavoritesQuestions(user_id)
      .then((favPost) => response.send(favPost))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

router.get('/user/favAns', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    taskService
      .getUserFavoritesAnswers(user_id)
      .then((favAnswer) => response.send(favAnswer))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

export default router;
