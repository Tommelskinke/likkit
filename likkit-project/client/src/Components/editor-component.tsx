// Component for å utnytte Quill library for text-formatting

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Define the props expected by EditorComponent
interface EditorComponentProps {
  onContentChange: (content: string) => void;
}

// Use the props in your component
class EditorComponent extends React.Component<EditorComponentProps> {
  state = {
    editorHtml: '',
  };

  handleChange = (html: string) => {
    this.setState({ editorHtml: html });
    this.props.onContentChange(html); // Call the passed onContentChange function
  };

  render() {
    return <ReactQuill value={this.state.editorHtml} onChange={this.handleChange} />;
  }
}

export default EditorComponent;
