import express from 'express';
import taskRouter from './task-router';
import searchRouter from './search-router';
/**
 * Express application.
 */
const app = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', taskRouter);

app.use('/api/v2/search', searchRouter);

export default app;
