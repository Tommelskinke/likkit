import express from 'express';
import searchService from '../service/search-service';
import pool from '../mysql-pool';

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const searchQuery = request.query.term;
    if (typeof searchQuery !== 'string') {
      return response.status(400).json({ error: 'Invalid search query.' });
    }

    const results = await searchService.searchQuestions(searchQuery);
    response.json(results);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

// Handler for autocomplete suggestions
router.get('/autocomplete', async (request, response) => {
  try {
    const partialQuery = request.query.term;
    if (typeof partialQuery !== 'string' || !partialQuery.trim()) {
      return response.status(400).json({ error: 'No search term provided' });
    }

    const queryResult = await pool.query(
      'SELECT DISTINCT title FROM question WHERE title LIKE CONCAT("%", ?, "%") LIMIT 10',
      [partialQuery],
    );

    if (Array.isArray(queryResult) && Array.isArray(queryResult[0])) {
      const suggestions = queryResult[0];
      response.json(suggestions);
    } else {
      // Handle unexpected structure
      console.error('Unexpected query result structure:', queryResult);
      response.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
