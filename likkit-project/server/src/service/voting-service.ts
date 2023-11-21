import pool from '../mysql-pool';
import type { ResultSetHeader } from 'mysql2';

class VotingService {
  //voter opp en post
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

  //voter ned en post
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

  //voter opp en kommentar
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

  //voter ned en kommentar
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
