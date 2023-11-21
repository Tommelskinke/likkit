import pool from '../mysql-pool';
import type { ResultSetHeader } from 'mysql2';

class VotingService {
  //votes a post up
  upvoteQuestion(question_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE question SET upvotes = upvotes + 1 WHERE question_id = ?',
        [question_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows === 0) {
            reject(new Error('Question not found'));
          } else {
            resolve();
          }
        },
      );
    });
  }

  //votes a post down
  downvoteQuestion(question_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE question SET downvotes = downvotes + 1 WHERE question_id = ?',
        [question_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows === 0) {
            reject(new Error('Question not found'));
          } else {
            resolve();
          }
        },
      );
    });
  }

  //votes a comment up
  upvoteAnswer(answer_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE answer SET upvotes = upvotes + 1 WHERE answer_id = ?',
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

  //voter a comment down
  downvoteAnswer(answer_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE answer SET downvotes = downvotes + 1 WHERE answer_id = ?',
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
}

const votingService = new VotingService();

export default votingService;
