import React, { useState } from 'react';
import { createEntity } from '../utils/api';

const EntityForm = () => {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [newAttribute, setNewAttribute] = useState({ name: '', type: 'STRING', allowNull: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntity(entityName, attributes);
      // Reset the form after successful submission
      setEntityName('');
      setAttributes([]);
      setNewAttribute({ name: '', type: 'STRING', allowNull: false });
    } catch (error) {
      console.error('Error creating entity:', error);
    }
  };

  const handleAttributeChange = (e) => {
    setNewAttribute({ ...newAttribute, [e.target.name]: e.target.value });
  };

  const addAttribute = () => {
    setAttributes([...attributes, newAttribute]);
    setNewAttribute({ name: '', type: 'STRING', allowNull: false });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Entity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="entityName" className="block font-medium">
            Entity Name
          </label>
          <input
            type="text"
            id="entityName"
            placeholder="Enter entity name"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="attributes" className="block font-medium">
            Attributes
          </label>
          <div className="space-y-2">
            {attributes.map((attr, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Attribute name"
                  value={attr.name}
                  onChange={(e) => {
                    const updatedAttributes = [...attributes];
                    updatedAttributes[index].name = e.target.value;
                    setAttributes(updatedAttributes);
                  }}
                  required
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={attr.type}
                  onChange={(e) => {
                    const updatedAttributes = [...attributes];
                    updatedAttributes[index].type = e.target.value;
                    setAttributes(updatedAttributes);
                  }}
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="STRING">STRING</option>
                  <option value="INTEGER">INTEGER</option>
                  <option value="FLOAT">FLOAT</option>
                  <option value="DATE">DATE</option>
                </select>
                <label htmlFor={`allowNull-${index}`} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`allowNull-${index}`}
                    checked={!attr.allowNull}
                    onChange={(e) => {
                      const updatedAttributes = [...attributes];
                      updatedAttributes[index].allowNull = !e.target.checked;
                      setAttributes(updatedAttributes);
                    }}
                    className="form-checkbox"
                  />
                  <span>Allow Null</span>
                </label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Attribute name"
                name="name"
                value={newAttribute.name}
                onChange={handleAttributeChange}
                required
                className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="type"
                value={newAttribute.type}
                onChange={handleAttributeChange}
                className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="STRING">STRING</option>
                <option value="INTEGER">INTEGER</option>
                <option value="FLOAT">FLOAT</option>
                <option value="DATE">DATE</option>
              </select>
              <label htmlFor="allowNull" className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowNull"
                  checked={!newAttribute.allowNull}
                  onChange={(e) => setNewAttribute({ ...newAttribute, allowNull: !e.target.checked })}
                  className="form-checkbox"
                />
                <span>Allow Null</span>
              </label>
              <button
                type="button"
                onClick={addAttribute}
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Attribute
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Entity
        </button>
      </form>
    </div>
  );
};

export default EntityForm;