// EntityTable.js
import React from 'react';

const EntityTable = ({ entries, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Entries</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {/* Table headers for entity attributes */}
            {/* Example: */}
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              {/* Display entry attributes */}
              {/* Example: */}
              <td className="border border-gray-300 px-4 py-2">{entry.name}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.email}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.mobileNumber}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.dateOfBirth}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => onDelete(entry.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntityTable;
