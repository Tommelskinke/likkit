import axios from 'axios';
import { Question } from './question-service';
axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type UserComment = {
  username: string;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  title: string;
  question_id: number;
};

class UserpageService {
  getBestComments(user_id: number) {
    return axios
      .get<UserComment[]>('/user/bestComment', {
        params: { user_id },
      })
      .then((response) => response.data);
  }
  getAllUserComments(user_id: number) {
    return axios
      .get<UserComment[]>('/user/allComments', {
        params: { user_id },
      })
      .then((response) => response.data);
  }
  getAllUserPosts(user_id: number) {
    return axios
      .get<Question[]>('/user/allPosts', {
        params: { user_id },
      })
      .then((response) => response.data);
  }
  getBestPosts(user_id: number) {
    return axios
      .get<Question[]>('/user/bestPosts', {
        params: { user_id },
      })
      .then((response) => response.data);
  }
  getTotalLicks(user_id: number) {
    return axios
      .get<number>('/user/totalLicks', {
        params: { user_id },
      })
      .then((response) => response.data);
  }
  updateProfilePicture(user_id: number, newpfppath: string) {
    return axios.post('/user/newPfp', {
      user_id,
      newpfppath,
    });
  }
}

const userpageService = new UserpageService();
export default userpageService;
