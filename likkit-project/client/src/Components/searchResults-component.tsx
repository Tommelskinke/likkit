import React from 'react';
import { useHistory } from 'react-router-dom';

type QuestionSummary = {
  question_id: number;
  title: string;
};

type SearchResultsProps = {
  results: QuestionSummary[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const history = useHistory();

  const handleRedirect = (postId: number) => {
    history.push(`/posts/${postId}`);
  };

  if (!results || results.length === 0) {
    return null; 
  }

  return (
    <ul>
      {results.map((result) => (
        <li key={result.question_id} onClick={() => handleRedirect(result.question_id)}>
          {result.title}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
