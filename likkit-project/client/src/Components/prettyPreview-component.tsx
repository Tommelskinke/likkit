import React from 'react';

interface StripHtmlComponentProps {
  htmlContent: string;
  maxLength?: number;
}

const PrettyPreview: React.FC<StripHtmlComponentProps> = ({ htmlContent, maxLength }) => {
  const stripHtml = (html: string): string => {
    const temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = html;

    // Replace block-level elements with a newline followed by a space
    const blockElements = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'];
    blockElements.forEach((tag) => {
      temporalDivElement.querySelectorAll(tag).forEach((el) => {
        const spaceNode = document.createTextNode('\n');
        el.parentNode?.insertBefore(spaceNode, el);
      });
    });

    return temporalDivElement.textContent || temporalDivElement.innerText || '';
  };

  const truncateText = (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  // Process the html content
  let processedContent = stripHtml(htmlContent);
  if (maxLength) {
    processedContent = truncateText(processedContent, maxLength);
  }

  // Render the content with preserved spaces and line breaks
  return <div>{processedContent}</div>;
};

export default PrettyPreview;
