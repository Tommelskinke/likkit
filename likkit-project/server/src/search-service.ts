import pool from './mysql-pool';
import type { RowDataPacket } from 'mysql2';

export type QuestionSummary = {
  question_id: number;
  title: string;
  content: string;
  created_at: string;
  karma: number;
};

class SearchService {
  searchQuestions(query: string) {
    return new Promise<QuestionSummary[]>((resolve, reject) => {
      pool.query(
        'SELECT question_id, title, content, created_at, karma FROM question WHERE MATCH(title, content) AGAINST (? IN NATURAL LANGUAGE MODE)',
        [query],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as QuestionSummary[]);
        },
      );
    });
  }
}

const searchService = new SearchService();
export default searchService;
