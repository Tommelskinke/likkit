import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

export type Comment = {
  username: string;
  user_pfp: string;
  answer_id: number;
  best_answer: boolean;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  parent_answer_id: null;
  question_id: number;
  user_id: number;
};

class CommentService {
  //henter svar basert på id
  answerGet(answer_id: number) {
    return new Promise<Comment>((resolve, reject) => {
      pool.query(
        'SELECT * FROM answer WHERE answer_id = ?',
        [answer_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Comment);
        },
      );
    });
  }

  //get comments on a post from the database
  commentsGet(question_id: number) {
    return new Promise<Comment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, u.user_pfp, a.answer_id, a.parent_answer_id, a.best_answer, a.content, a.created_at, a.upvotes, a.downvotes FROM answer a INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.question_id=? ORDER BY (a.upvotes - a.downvotes) DESC',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Comment[]);
        },
      );
    });
  }

  //creates a comment on a post
  createComment(question_id: number, content: string, user_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO answer SET question_id=?, content=?, user_id=?, created_at=?',
        [question_id, content, user_id, formattedDate],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  //Setter et svar som beste
  bestAnswer(answer_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE answer SET best_answer = 1 WHERE answer_id = ?',
        [answer_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows === 0) {
            reject(new Error('Answer not found'));
          } else {
            resolve();
          }
        },
      );
    });
  }

  //Setter et svar som ikke beste
  notBestAnswer(answer_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE answer SET best_answer = 0 WHERE answer_id = ?',
        [answer_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows === 0) {
            reject(new Error('Answer not found'));
          } else {
            resolve();
          }
        },
      );
    });
  }

  //creates a reply to a comment
  createCommentReply(
    question_id: number,
    parent_answer_id: number,
    content: string,
    user_id: number,
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO answer SET question_id=?, parent_answer_id=?, content=?, user_id=?',
        [question_id, parent_answer_id, content, user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  //gets the comments sorted by newest
  commentsGetNewest(question_id: number) {
    return new Promise<Comment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, u.user_pfp, a.answer_id, a.parent_answer_id, a.best_answer, a.content, a.created_at, a.upvotes, a.downvotes FROM answer a INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.question_id=? ORDER BY created_at DESC',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Comment[]);
        },
      );
    });
  }
  //gets the comments sorted by most upvotes
  sortBestComment(question_id: number) {
    return new Promise<Comment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, u.user_pfp, a.answer_id, a.parent_answer_id, a.best_answer, a.content, a.created_at, a.upvotes, a.downvotes FROM answer a INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.question_id=? ORDER BY a.best_answer DESC, (a.upvotes - a.downvotes) DESC',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Comment[]);
        },
      );
    });
  }
}

const commentService = new CommentService();

export default commentService;
