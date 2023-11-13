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
  answer_id: number;
  question_id: number;
  user_id: number;
  best_answer: number;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  karma: number;
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

  questionCreate(title: string, content: string) {
    return axios
      .post<{ id: number }>('/createPost', { title: title, content: content })
      .then((response) => response.data.id);
  }
  commentsGet(question_id: number) {
    return axios.get<Comment[]>('/posts/' + question_id).then((response) => response.data);
  }
}

const taskService = new TaskService();
export default taskService;
