import pool from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

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
  user: string;
  best_answer: number;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  karma: number;
};

class TaskService {
  /**
   * Get question with given id.
   */
  questionGet(question_id: number) {
    return new Promise<Question>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question WHERE question_id = ?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Question);
        },
      );
    });
  }

  questionGetThree() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query('SELECT * FROM question LIMIT 3', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Question[]);
      });
    });
  }

  questionCreate(title: string, content: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO question SET title=?, content=?',
        [title, content],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }
  commentsGet(question_id: number) {
    return new Promise<Comment[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM answer WHERE question_id=?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Comment[]);
        },
      );
    });
  }
}

const taskService = new TaskService();
export default taskService;
