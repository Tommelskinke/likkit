const crypto = require('crypto');

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'eliassh_batman';
process.env.MYSQL_PASSWORD = 'batman';
process.env.MYSQL_DATABASE = 'eliassh_batman_todo_test';
process.env.GOOGLE_CLIENT_ID =
  '95455673344-k9ad79ufjhsk5g9is2p9ok07l6m93v08.apps.googleusercontent.com';
process.env.GOOGLE_CLIENT_SECRET = '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';
process.env.SESSION_SECRET = crypto.randomBytes(64).toString('hex');

export const SESSION_SECRET = process.env.SESSION_SECRET || '';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
