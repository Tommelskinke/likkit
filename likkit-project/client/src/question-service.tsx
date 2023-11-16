import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  question_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  karma: number;
};
export type Comment = {
  username: string;
  best_answer: boolean;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  karma: number;
};

export type Tag = {
  tag_id: number;
  tag_name: string;
};

class TaskService {
  /**
   * Get task with given id.
   */
  questionGet(question_id: number) {
    return axios.get<Question>('/posts/' + question_id).then((response) => response.data);
  }

  questionGetThree() {
    return axios.get<Question[]>('/').then((response) => response.data);
  }

  questionGetThreeNew() {
    return axios.get<Question[]>('/new').then((response) => response.data);
  }

  questionGetNewest() {
    return axios.get<Question>('/createPost/lol').then((response) => response.data);
  }

  questionCreate(title: string, content: string) {
    return axios
      .post<{ id: number }>('/createPost', { title: title, content: content })
      .then((response) => response.data.id);
  }
  questionTagCreate(question_id: number, tag_id: number) {
    return axios
      .post<{ id: number }>('/createPost/tag', { question_id: question_id, tag_id: tag_id })
      .then((response) => response.data.id);
  }

  questionTagGet(question_id: number) {
    return axios
      .get<Tag[]>('/posts/' + question_id + '/tag/')
      .then((response) => response.data);
  }

  commentsGet(question_id: number) {
    return axios
      .get<Comment[]>('/posts/' + question_id + '/comments/')
      .then((response) => response.data);
  }
  createComment(question_id: number, content: string, user_id: number) {
    return axios
      .post<{ id: number }>('/posts/' + question_id, {
        content: content,
        user_id: user_id,
      })
      .then((response) => response.data);
  }
}

const taskService = new TaskService();
export default taskService;
