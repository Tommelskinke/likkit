import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const date = new Date();
const formattedDate = date.toISOString().slice(0, -9);

export type Question = {
  username: string;
  question_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
};

export type tag = {
  tag_id: number;
  tag_name: string;
};

class QuestionService {
  //gets a post based on id
  questionGet(question_id: number) {
    return new Promise<Question>((resolve, reject) => {
      pool.query(
        'SELECT u.username, a.* FROM question a INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.question_id = ?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Question);
        },
      );
    });
  }

  //gets the newest post in the database
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

  //gets the 3 most uppvoted posts
  questionGetThree() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question ORDER BY (upvotes - downvotes) DESC LIMIT 5',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }

  //gets the 3 newest posts
  questionGetThreeNew() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question ORDER BY created_at DESC LIMIT 5',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }

  //gets all posts sorted by karma
  questionGetAll() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question ORDER BY (upvotes - downvotes) DESC',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }

  //gets all posts sorted by newest
  questionGetAllNew() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question ORDER BY created_at DESC',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }

  //gets every unanswered question
  questionGetUnanswered() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question q WHERE q.question_id NOT IN (SELECT a.question_id FROM answer a)',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }

  //creates a post
  questionCreate(user_id: number, title: string, content: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO question SET user_id=?, title=?, content=?, created_at=?',
        [user_id, title, content, formattedDate],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  //Edits a post
  questionEdit(title: string, content: string, question_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE question SET title=?, content=? WHERE question_id = ?',
        [title, content, question_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows === 0) {
            reject(new Error('Failed to edit post'));
          } else {
            resolve();
          }
        },
      );
    });
  }

  //creates tags for a post
  questionTagCreate(question_id: number, tag_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT IGNORE INTO question_tag SET question_id=?, tag_id=?',
        [question_id, tag_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  //deletes a post
  questionRemove(question_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM question WHERE question_id = ?',
        [question_id],
        (error, _results: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }

  //removes tags for a post
  questionTagRemove(question_id: number, tag_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'DELETE FROM question_tag where question_id = ? AND tag_id = ?',
        [question_id, tag_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  //gets the tags a post have
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

  //get all posts with a given tag
  questionGetAllTag(tag_id: number) {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question WHERE question_id IN (SELECT question_id FROM question_tag WHERE tag_id = ?)',
        [tag_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }
}

const questionService = new QuestionService();

export default questionService;
