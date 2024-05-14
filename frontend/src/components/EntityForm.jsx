// EntityForm.js
import React, { useState } from 'react';

const EntityForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Input fields for entity attributes */}
        {/* Example: */}
        <input type="text" name="name" placeholder="Name" value={formData.name || ''} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email || ''} onChange={handleChange} />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth || ''}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EntityForm;
