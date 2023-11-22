// generelt sett bad practice å legge passord og secrets i klartekst i config-filer,
// men av praktiske årsaker gjør vi det her

const crypto = require('crypto');

process.env.MYSQL_HOST = 'mysql.stud.ntnu.no';
process.env.MYSQL_USER = 'eliassh_batman';
process.env.MYSQL_PASSWORD = 'batman';
process.env.MYSQL_DATABASE = 'eliassh_batman_todo_dev';
process.env.GOOGLE_CLIENT_ID =
  '95455673344-k9ad79ufjhsk5g9is2p9ok07l6m93v08.apps.googleusercontent.com';
process.env.GOOGLE_CLIENT_SECRET = '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';
process.env.SESSION_SECRET = crypto.randomBytes(64).toString('hex');

export const SESSION_SECRET = process.env.SESSION_SECRET || '';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
