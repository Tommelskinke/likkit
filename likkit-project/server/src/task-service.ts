import pool from './mysql-pool';
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

export type tag = {
  tag_id: number;
  tag_name: string;
};

export type Favorites = {
  question_id: number;
  answer_id: number | null;
};

class TaskService {
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

  // Henter alle kommentarer som er marker som best av en bruker
  getBestComments(user_id: number) {
    return new Promise<UserComment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, a.content, a.created_at, a.upvotes, a.downvotes, q.title, q.question_id, a.answer_id, u.user_pfp FROM answer a INNER JOIN question q ON (q.question_id = a.question_id) INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.user_id=? AND a.best_answer = 1',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as UserComment[]);
        },
      );
    });
  }

  // Henter alle kommentarer som er skrevet av en bruker
  getAllUserComments(user_id: number) {
    return new Promise<UserComment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, a.content, a.created_at, a.upvotes, a.downvotes, q.title, q.question_id, a.answer_id, u.user_pfp FROM answer a INNER JOIN question q ON (q.question_id = a.question_id) INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.user_id=?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as UserComment[]);
        },
      );
    });
  }

  // Henter alle poster som er skrevet av en bruker
  getAllUserPosts(user_id: number) {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question WHERE user_id=?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Question[]);
        },
      );
    });
  }

  // Henter alle poster som er skrevet av en bruker sortert etter karma
  getBestUserPosts(user_id: number) {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question WHERE user_id=? ORDER BY (upvotes - downvotes) DESC LIMIT 5',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Question[]);
        },
      );
    });
  }

  //gets the sum of upvotes and downvotes the user have
  getUserLikks(user_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'SELECT SUM(total_votes) AS total_votes FROM ( SELECT SUM(upvotes - downvotes) AS total_votes FROM question WHERE user_id = ? UNION ALL SELECT SUM(upvotes - downvotes) AS total_votes FROM answer WHERE user_id = ? ) AS combined_votes',
        [user_id, user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results[0].total_votes as number);
        },
      );
    });
  }

  //updates the profile picture of a user
  updateProfilePicture(user_id: number, user_pfp: string) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE users SET user_pfp = ? WHERE user_id = ?',
        [user_pfp, user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows === 0) {
            reject(new Error('User not found'));
          } else {
            resolve();
          }
        },
      );
    });
  }

  createUser(username: string, password: string, email: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO users SET username=?, password=?, email=?',
        [username, password, email],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

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

  getUserFavorites(user_id: number) {
    return new Promise<Favorites[]>((resolve, reject) => {
      pool.query(
        'SELECT question_id, answer_id FROM favorites WHERE user_id = ?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Favorites[]);
        },
      );
    });
  }

  addFavorite(user_id: number, question_id: number, answer_id: number | null) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO favorites SET user_id=?, question_id=?, answer_id=?',
        [user_id, question_id, answer_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  removeFavorite(user_id: number, question_id: number, answer_id: number | null) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'DELETE FROM favorites WHERE user_id=? AND question_id=? AND (answer_id=? OR answer_id IS NULL)',
        [user_id, question_id, answer_id],
        (error, results: ResultSetHeader) => {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
        },
      );
    });
  }

  getUserFavoritesQuestions(user_id: number) {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question WHERE question_id IN (SELECT question_id FROM favorites WHERE user_id = ? AND answer_id IS NULL)',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question[]);
        },
      );
    });
  }

  getUserFavoritesAnswers(user_id: number) {
    return new Promise<UserComment[]>((resolve, reject) => {
      pool.query(
        'SELECT u.username, a.content, a.created_at, a.upvotes, a.downvotes, q.title, q.question_id, a.answer_id, u.user_pfp FROM answer a INNER JOIN question q ON (q.question_id = a.question_id) INNER JOIN users u ON (u.user_id = a.user_id) WHERE a.answer_id IN (SELECT answer_id FROM favorites WHERE user_id = ?)',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as UserComment[]);
        },
      );
    });
  }

  getTotalUserUpvotes(user_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'SELECT SUM(total_votes) AS total_upvotes FROM ( SELECT SUM(upvotes) AS total_votes FROM question WHERE user_id = ? UNION ALL SELECT SUM(upvotes) AS total_votes FROM answer WHERE user_id = ? ) AS combined_votes',
        [user_id, user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results[0].total_upvotes as number);
        },
      );
    });
  }

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

const taskService = new TaskService();

export default taskService;
