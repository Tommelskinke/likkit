// Component for å utnytte Quill library for text-formatting

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Define the props expected by EditorComponent
interface EditorComponentProps {
  onContentChange: (content: string) => void;
  initialValue?: string;
}

// Use the props in your component
class EditorComponent extends React.Component<EditorComponentProps> {
  state = {
    editorHtml: this.props.initialValue || '',
  };

  handleChange = (html: string) => {
    this.setState({ editorHtml: html });
    this.props.onContentChange(html); // Call the passed onContentChange function
  };

  componentDidUpdate(prevProps: EditorComponentProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ editorHtml: this.props.initialValue || '' });
    }
  }

  render() {
    return <ReactQuill value={this.state.editorHtml} onChange={this.handleChange} />;
  }
}

export default EditorComponent;
