import React from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { date, link } = useParams();

  // Use the postId and userId values in your component

  return (
    <div>
      <h2>Edit Post with ID: {date}</h2>
      <h2>User ID: {link}</h2>
      {/* Rest of the component */}
    </div>
  );
};

export default Edit;