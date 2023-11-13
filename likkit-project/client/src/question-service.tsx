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

class TaskService {
  /**
   * Get task with given id.
   */
  questionGet(question_id: number) {
    return axios.get<Question>('/posts/' + question_id).then((response) => response.data);
  }

  questionCreate(title: string, content: string) {
    return axios
      .post<{ id: number }>('/createPost', { title: title, content: content })
      .then((response) => response.data.id);
  }
}

const taskService = new TaskService();
export default taskService;
