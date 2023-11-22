import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRouter from './router/auth-router';
import commentRouter from './router/comment-router';
import questionRouter from './router/question-router';
import searchRouter from './router/search-router';
import userRouter from './router/user-router';
import votingRouter from './router/voting-router';
import pool from './mysql-pool';
import { RowDataPacket } from 'mysql2';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } from '../config';
/**
 * Express application.
 */
declare global {
  namespace Express {
    interface User {
      user_id: number;
      google_id?: string;
      email?: string;
      user_type?: string;
      username?: string;
      password?: string | null;
      user_pfp?: string;
      // Include other fields as necessary
    }
  }
}
async function findUserByEmail(email: string): Promise<Express.User | undefined> {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      const rows = results as RowDataPacket[];
      resolve(rows.length > 0 ? (rows[0] as Express.User) : undefined);
    });
  });
}
async function findUserById(user_id: number): Promise<Express.User | undefined> {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      const rows = results as RowDataPacket[];
      resolve(rows.length > 0 ? (rows[0] as Express.User) : undefined);
    });
  });
}

async function findUserByUsername(username: string): Promise<Express.User | undefined> {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      const rows = results as RowDataPacket[];
      resolve(rows.length > 0 ? (rows[0] as Express.User) : undefined);
    });
  });
}

async function createUser(user: {
  email: string;
  user_type: string;
  username: string;
  password: string | null;
  google_id: string;
  user_pfp: string | null;
}): Promise<Express.User | undefined> {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (email, username, password, google_id) VALUES (?, ?, ?, ?)';
    pool.query(
      query,
      [user.email, user.username, user.password, user.google_id],
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(findUserByEmail(user.email));
      },
    );
  });
}

function generateUsername(profile: any): string {
  //create a base username using part of the Google profile with a random number sufix
  const baseUsername = `${profile.name.givenName}${Math.floor(Math.random() * 1000)}`;
  return baseUsername.toLowerCase();
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth2/redirect/google',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    },
    async (accessToken, refreshToken, profile: any, done) => {
      try {
        let user = await findUserByEmail(profile.emails[0].value);
        const profilePictureUrl = profile.photos[0].value;
        console.log(user);

        if (!user) {
          let username = generateUsername(profile);
          while ((await findUserByUsername(username)) != undefined) {
            username = generateUsername(profile);
          }

          user = await createUser({
            google_id: profile.id,
            email: profile.emails[0].value,
            user_type: 'user',
            username: username,
            password: null,
            user_pfp: profilePictureUrl,
          });
        }

        if (user) {
          done(null, user);
        } else {
          done(new Error('User creation failed'));
        }
      } catch (error) {
        done(error instanceof Error ? error : new Error('Unknown error'));
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done) => {
  console.log('Serializing user...');
  done(null, user.user_id);
  console.log('Serialized user!');
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use(authRouter);
app.use('/api/v2/', commentRouter);
app.use('/api/v2/', questionRouter);
app.use('/api/v2/search', searchRouter);
app.use('/api/v2/', userRouter);
app.use('/api/v2/', votingRouter);

export default app;
