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

  //gets the newest post in the database
  questionGetNewest() {
    return axios.get<Question>('/createPost/new').then((response) => response.data);
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
  //get comments on a post from the database
  commentsGet(question_id: number) {
    return axios
      .get<Comment[]>('/posts/' + question_id + '/comments/')
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

  //henter svar
  answerGet(answer_id: number) {
    return axios.get<Answer>('/posts/' + answer_id).then((response) => response.data);
  }

  //upvoter en post
  upvoteQuestion(question_id: number) {
    return axios.post('/posts/' + question_id + '/upvote');
  }
  //downvoter en post
  downvoteQuestion(question_id: number) {
    return axios.post('/posts/' + question_id + '/downvote');
  }

  //upvoter en kommentar
  upvoteAnswer(answer_id: number) {
    return axios.post('/posts/answers/' + answer_id + '/upvote');
  }
  //downvoter en kommentar
  downvoteAnswer(answer_id: number) {
    return axios.post('/posts/answers/' + answer_id + '/downvote');
  }

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
}

const taskService = new TaskService();
export default taskService;
