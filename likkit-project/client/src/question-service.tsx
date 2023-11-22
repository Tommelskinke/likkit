import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  username: string;
  question_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
};
export type Comment = {
  answer_id: number;
  question_id: number;
  parent_answer_id: number | null;
  user_id: number;
  username: string;
  user_pfp: string;
  best_answer: boolean;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
};

export type Answer = {
  answer_id: number;
  question_id: number;
  parent_answer_id: Number | null;
  user_id: number;
  best_answer: boolean;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
};

export type Tag = {
  tag_id: number;
  tag_name: string;
};

export type Favorites = {
  question_id: number;
  answer_id: number | null;
};

class TaskService {
  //gets a post based on id
  questionGet(question_id: number) {
    return axios.get<Question>('/posts/' + question_id).then((response) => response.data);
  }

  //gets the 3 most uppvoted posts
  questionGetThree() {
    return axios.get<Question[]>('/').then((response) => response.data);
  }

  //gets the 3 newest posts
  questionGetThreeNew() {
    return axios.get<Question[]>('/new').then((response) => response.data);
  }

  //gets all posts sorted by karma
  questionGetAll() {
    return axios.get<Question[]>('/posts').then((response) => response.data);
  }

  //gets all posts sorted by newest
  questionGetAllNew() {
    return axios.get<Question[]>('/postsNew').then((response) => response.data);
  }

  //gets every unanswered question
  questionGetUnanswered() {
    return axios.get<Question[]>('/postsUnanswered').then((response) => response.data);
  }

  //gets the newest post in the database
  questionGetNewest() {
    return axios.get<Question>('/createPost/:id').then((response) => response.data);
  }

  //creates a post
  questionCreate(user_id: number | undefined, title: string, content: string) {
    return axios
      .post<{ id: number }>('/createPost', { user_id: user_id, title: title, content: content })
      .then((response) => response.data.id);
  }

  //edits a post
  questionEdit(title: string, content: string, question_id: number) {
    return axios.post('/editPost/' + question_id, {
      title: title,
      content: content,
      question_id: question_id,
    });
  }

  //edits a comment
  commentEdit(content: string, answer_id: number) {
    return axios.post('/editComment/' + answer_id, {
      content: content,
      answer_id: answer_id,
    });
  }

  //creates tags for a post
  questionTagCreate(question_id: number, tag_id: number) {
    return axios
      .post<{ id: number }>('/createPost/tag', { question_id: question_id, tag_id: tag_id })
      .then((response) => response.data.id);
  }

  //removes tags from a post
  questionTagRemove(question_id: number, tag_id: number) {
    return axios
      .post<{ id: number }>('/editPost/' + question_id + '/tag/remove', {
        question_id: question_id,
        tag_id: tag_id,
      })
      .then((response) => response.data.id);
  }

  //gets the tags a post have
  questionTagGet(question_id: number) {
    return axios.get<Tag[]>('/posts/' + question_id + '/tag/').then((response) => response.data);
  }

  ////get all posts with a given tag
  questionGetAllTag(tag_id: number) {
    return axios.get<Question[]>('/posts/tags/' + tag_id).then((response) => response.data);
  }

  //removes a question
  questionRemove(question_id: number) {
    return axios.delete('/posts/' + question_id).catch((error) => {
      // Handle the error here
      console.error('Error deleting post:', error);
      throw error; // Rethrow the error to propagate it to the calling code
    });
  }

  commentRemove(answer_id: number) {
    return axios.delete('/posts/:id/comments/' + answer_id).catch((error) => {
      console.error('Error deleting comment:', error);
      throw error;
    });
  }

  //get comments on a post from the database
  commentsGet(question_id: number) {
    return axios
      .get<Comment[]>('/posts/' + question_id + '/comments/')
      .then((response) => response.data);
  }
  //get one comment
  commentsGetOne(question_id: number) {
    return axios
      .get<Comment>('/posts/' + question_id + '/comments/')
      .then((response) => response.data);
  }
  //creates a comment on a post
  createComment(question_id: number, content: string, user_id: number) {
    return axios
      .post<{ id: number }>('/posts/' + question_id, {
        content: content,
        user_id: user_id,
      })
      .then((response) => response.data);
  }

  //gets a answer based on id
  answerGet(answer_id: number) {
    return axios.get<Answer>('/posts/' + answer_id).then((response) => response.data);
  }

  //upvotes a post
  upvoteQuestion(question_id: number) {
    return axios.post('/posts/' + question_id + '/upvote');
  }
  //downvotes a post
  downvoteQuestion(question_id: number) {
    return axios.post('/posts/' + question_id + '/downvote');
  }

  //upvotes a comment
  upvoteAnswer(answer_id: number) {
    return axios.post('/posts/answers/' + answer_id + '/upvote');
  }
  //downvotes a comment
  downvoteAnswer(answer_id: number) {
    return axios.post('/posts/answers/' + answer_id + '/downvote');
  }
  //Changes a commet to best
  bestAnswer(answer_id: number) {
    return axios.post('/posts/answers/' + answer_id + '/best'), {};
  }

  //Chages a comment to not best
  notBestAnswer(answer_id: number) {
    return axios.post('/posts/answers/' + answer_id + '/notBest'), {};
  }

  //creates a reply on a comment
  createCommentReply(
    question_id: number,
    parent_answer_id: number,
    content: string,
    user_id: number,
  ) {
    return axios
      .post<{ id: number }>('/posts/' + question_id + '/reply', {
        parent_answer_id: parent_answer_id,
        content: content,
        user_id: user_id,
      })
      .then((response) => response.data);
  }

  //gets a users favorit posts and comments
  getUserFavorites(user_id: number) {
    return axios
      .get<Favorites[]>('/favorites', { params: { user_id } })
      .then((response) => response.data);
  }

  //saves a post as a favorit
  addFavorite(user_id: number, question_id: number, answer_id: number | null) {
    return axios
      .post('/posts/:id/favorites/add', { user_id, question_id, answer_id })
      .then((response) => response.data);
  }

  //removes a post as a favorit
  removeFavorite(user_id: number, question_id: number, answer_id: number | null) {
    return axios
      .post<{ id: number }>('/posts/:id/favorites/remove', { user_id, question_id, answer_id })
      .then((response) => {
        response.data.id;
      });
  }

  //sorts comemts by newest
  getNewestComments(question_id: number) {
    return axios
      .get<Comment[]>('/posts/' + question_id + '/NewComments')
      .then((response) => response.data);
  }

  //sorts comments by most upvoted
  sortBestComments(question_id: number) {
    return axios
      .get<Comment[]>('/posts/' + question_id + '/sortBestComment')
      .then((response) => response.data);
  }
}

const taskService = new TaskService();
export default taskService;
