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
  username: string;
  best_answer: boolean;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  karma: number;
};

export type tag = {
  tag_id: number;
  tag_name: string;
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

  questionGetNewest() {
    return new Promise<Question>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question ORDER BY created_at DESC LIMIT 1',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Question);
        },
      );
    });
  }

  questionGetThree() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query('SELECT * FROM question ORDER BY karma DESC LIMIT 3', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Question[]);
      });
    });
  }

  questionGetThreeNew() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query('SELECT * FROM question ORDER BY created_at DESC LIMIT 3', (error, results: RowDataPacket[]) => {
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

  questionTagCreate(question_id: number, tag_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO question_tag SET question_id=?, tag_id=?',
        [question_id, tag_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  questionTagGet(question_id: number) {
    return new Promise<tag[]>((resolve, reject) => {
      pool.query(
        'SELECT t.tag_id, t.tag_name FROM question q, question_tag qt, tag t WHERE q.question_id = qt.question_id AND qt.tag_id = t.tag_id AND q.question_id = ?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as tag[]);
        },
      );
    });
  }

  commentsGet(question_id: number) {
    return new Promise<Comment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, a.best_answer, a.content, a.created_at, a.upvotes, a.downvotes, a.karma FROM answer a INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.question_id=?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Comment[]);
        },
      );
    });
  }
  createComment(question_id: number, content: string, user_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO answer SET question_id=?, content=?, user_id=?',
        [question_id, content, user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }
}

const taskService = new TaskService();
export default taskService;
