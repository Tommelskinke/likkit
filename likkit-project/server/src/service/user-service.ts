import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

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

export type Favorites = {
  question_id: number;
  answer_id: number | null;
};

class UserService {
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

  //creates a user
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

  //gets a users favorits
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

  //adds a favorit to to the user
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
  //removes a favorit to to the user
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

  //gets the users favorit posts
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

  //gets the users favorit answers
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

  //gets the sum of a users upvotes as 1 number
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
}
const userService = new UserService();

export default userService;
