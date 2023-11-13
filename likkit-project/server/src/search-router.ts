import express from 'express';
import searchService from './search-service';
import pool from './mysql-pool';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/posts', async (request, response) => {
  try {
    const searchQuery = request.query.query;

    if (typeof searchQuery === 'string') {
      searchService.searchQuestions(searchQuery);
    } else {
      response.status(400).json({ error: 'Invalid search query.' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/suggest', async (request, response) => {
  try {
    const partialQuery = request.query.term; // Assume 'term' is the query parameter
    if (!partialQuery) {
      return response.status(400).json({ error: 'No search term provided' });
    }

    // Example query, adjust according to your data schema
    const suggestions = await pool.query(
      'SELECT DISTINCT title FROM question WHERE title LIKE CONCAT("%", ?, "%") LIMIT 10',
      [partialQuery],
    );

    response.json(suggestions);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
