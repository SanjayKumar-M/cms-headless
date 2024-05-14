import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;