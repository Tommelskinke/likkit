import pool from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Question = {
  question_id: number;
  user_id: number;
  tag_id: [];
  title: string;
  content: string;
  created_at: Date;
  upvotes: number;
  downvotes: number;
  karma: number;
};

class TaskService {
  /**
   * Get question with given id.
   */
  questionGet(question_id: number) {
    return new Promise<Question | undefined>((resolve, reject) => {
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
}

const taskService = new TaskService();
export default taskService;
