import React from 'react';
import clipboard from 'clipboard';

const CopySectionButton = ({ sectionId }) => {
  const handleCopyClick = () => {
    const sectionToCopy = document.getElementById(sectionId);
    
    if (sectionToCopy) {
      const range = document.createRange();
      range.selectNode(sectionToCopy);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      try {
        // Now copy the selected content to the clipboard
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert('Copied to clipboard!');
      } catch (error) {
        console.error('Unable to copy to clipboard:', error);
      }
    } else {
      console.error('Section not found!');
    }
  };

  return (
    // <button onClick={handleCopyClick}>
    //   Copy Section
    // </button>
    <svg onClick={handleCopyClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/></g></svg>
  );
};

export default CopySectionButton;
