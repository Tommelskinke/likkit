import { Component } from 'react-simplified';
import taskService, { Question } from './question-service'; // Make sure to import Question type
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export class VotingService extends Component {
  selectedOption: string = 'popular'; // Define the selected option
  posts: Question[] = []; // Define the posts array

  handleSortChange = (event: any) => {
    const selectedOption = event.target.value;
    this.selectedOption = selectedOption;

    if (selectedOption === 'popular') {
      taskService.questionGetThree().then((posts) => {
        this.posts = posts;
        this.forceUpdate(); // Trigger a re-render
      });
    } else if (selectedOption === 'newest') {
      taskService.questionGetThreeNew().then((posts) => {
        this.posts = posts;
        this.forceUpdate(); // Trigger a re-render
      });
    }
  };

  handleUpvote = (questionId: number) => {
    taskService
      .upvoteQuestion(questionId)
      .then(() => {
        this.handleSortChange({ target: { value: this.selectedOption } });
      })
      .catch((error) => {
        console.error('Error upvoting question:', error);
      });
  };

  handleDownvote = (questionId: number) => {
    taskService
      .downvoteQuestion(questionId)
      .then(() => {
        this.handleSortChange({ target: { value: this.selectedOption } });
      })
      .catch((error) => {
        console.error('Error downvoting question:', error);
      });
  };
}
