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
  answer_id: number;
  user_pfp: string;
};

class UserpageService {
  //gets the most upvoted comments the user has made
  getBestComments(user_id: number) {
    return axios
      .get<UserComment[]>('/user/bestComment', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //gets all comments a user has made
  getAllUserComments(user_id: number) {
    return axios
      .get<UserComment[]>('/user/allComments', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //gets all posts a user has made
  getAllUserPosts(user_id: number) {
    return axios
      .get<Question[]>('/user/allPosts', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //gets the most upvoted posts a user has made
  getBestPosts(user_id: number) {
    return axios
      .get<Question[]>('/user/bestPosts', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //gets the total amount of upvotes a user has gotten on posts and comments
  getTotalLicks(user_id: number) {
    return axios
      .get<number>('/user/totalLicks', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //lets users update the profile picture
  updateProfilePicture(user_id: number, newpfppath: string) {
    return axios.post('/user/newPfp', {
      user_id,
      newpfppath,
    });
  }

  //gets the users favorit posts
  getUserFavoritesQuestions(user_id: number) {
    return axios
      .get<Question[]>('/user/favPost', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //gets the users favorit comments
  getUserFavoritesAnswers(user_id: number) {
    return axios
      .get<UserComment[]>('/user/favAns', {
        params: { user_id },
      })
      .then((response) => response.data);
  }

  //sums the upvotes a user has gotten without subtracting the downvotes
  getTotalUserUpvotes(user_id: number) {
    return axios
      .get<number>('/user/upvotes', {
        params: { user_id },
      })
      .then((response) => response.data);
  }
}

const userpageService = new UserpageService();
export default userpageService;
