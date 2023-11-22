import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type QuestionSummary = {
  question_id: number;
  title: string;
  content: string;
  created_at: string;
};

class SearchService {
  //search questions by a query string
  searchQuestions(input: string) {
    return axios
      .get<QuestionSummary[]>('/search', { params: { term: input } })
      .then((response) => response.data);
  }
}

const searchService = new SearchService();
export default searchService;
