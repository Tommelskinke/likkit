import express from 'express';
import searchService from './search-service';

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

export default router;
