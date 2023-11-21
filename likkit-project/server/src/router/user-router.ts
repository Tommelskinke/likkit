import express from 'express';
import userService from '../service/user-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

//gets best comments
router.get('/user/bestComment', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getBestComments(user_id)
      .then((bestComments) => response.send(bestComments))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets all comments
router.get('/user/allComments', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getAllUserComments(user_id)
      .then((allComments) => response.send(allComments))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets all posts
router.get('/user/allPosts', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getAllUserPosts(user_id)
      .then((allPosts) => response.send(allPosts))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets best posts
router.get('/user/bestPosts', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getBestUserPosts(user_id)
      .then((bestPosts) => response.send(bestPosts))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets likks
router.get('/user/totalLicks', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getUserLikks(user_id)
      .then((likks) => response.send(likks))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//updates the profile picture of a user
router.post('/user/newPfp', (request, response) => {
  const data = request.body;
  if (data && data.newpfppath && data.newpfppath.length != 0) {
    userService
      .updateProfilePicture(data.user_id, data.newpfppath)
      .then(() => response.send({ message: 'Upvote successful' }))
      .catch((error) => response.status(500).send(error));
  } else response.status(400).send('Missing user_id');
});

//gets a users favorits
router.get('/favorites', (request, response) => {
  userService
    .getUserFavorites(Number(request.query.user_id))
    .then((favorites) => response.send(favorites))
    .catch((error) => response.status(500).send(error));
});

//adds a favorit to to the user
router.post('/posts/:id/favorites/add', (request, response) => {
  const data = request.body;
  userService
    .addFavorite(
      Number(data.user_id),
      Number(data.question_id),
      data.answer_id !== null ? Number(data.answer_id) : null,
    )
    .then((id) => response.send({ id: id }));
});

//removes a favorit to to the user
router.post('/posts/:id/favorites/remove', (request, response) => {
  const data = request.body;
  userService
    .removeFavorite(data.user_id, Number(data.question_id), data.answer_id)
    .then(() => {
      response.send({ message: 'Favorite removed' });
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

//gets the users favorit posts
router.get('/user/favPost', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getUserFavoritesQuestions(user_id)
      .then((favPost) => response.send(favPost))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets the users favorit answers
router.get('/user/favAns', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getUserFavoritesAnswers(user_id)
      .then((favAnswer) => response.send(favAnswer))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

//gets the sum of a users upvotes as 1 number
router.get('/user/upvotes', (request, response) => {
  const user_id = Number(request.query.user_id);
  if (user_id != 0)
    userService
      .getTotalUserUpvotes(user_id)
      .then((upvotes) => {
        response.send(upvotes);
      })
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing user_id');
});

export default router;
