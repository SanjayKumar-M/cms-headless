import React, { useState, useEffect } from 'react';
import { readEntries, createEntry, updateEntry, deleteEntry } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const EntityTable = ({ entityName }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEntry, setNewEntry] = useState({});
  const [editingEntryId, setEditingEntryId] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await readEntries(entityName);
        setEntries(fetchedEntries);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [entityName]);

  const handleCreateEntry = async () => {
    try {
      const createdEntry = await createEntry(entityName, newEntry);
      setEntries([...entries, createdEntry]);
      setNewEntry({});
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateEntry = async (entryId) => {
    try {
      const updatedEntry = await updateEntry(entityName, entryId, newEntry);
      setEntries(entries.map((entry) => (entry.id === entryId ? updatedEntry : entry)));
      setEditingEntryId(null);
      setNewEntry({});
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await deleteEntry(entityName, entryId);
      setEntries(entries.filter((entry) => entry.id !== entryId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Entries for {entityName} ({entries.length})
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">ID</th>
            {Object.keys(entries[0] || {}).map((key) => (
              <th key={key} className="p-2 border border-gray-300">
                {key}
              </th>
            ))}
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border border-gray-300">
              <td className="p-2 border border-gray-300">{entry.id}</td>
              {Object.entries(entry).map(([key, value]) =>
                key !== 'id' ? (
                  <td key={key} className="p-2 border border-gray-300">
                    {editingEntryId === entry.id ? (
                      <input
                        type="text"
                        value={newEntry[key] || value || ''}
                        onChange={(e) => setNewEntry({ ...newEntry, [key]: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    ) : (
                      value
                    )}
                  </td>
                ) : null
              )}
              <td className="p-2 border border-gray-300">
                {editingEntryId === entry.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateEntry(entry.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEntryId(null)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingEntryId(entry.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr className="border border-gray-300">
            <td className="p-2 border border-gray-300"></td>
            {Object.keys(entries[0] || {}).map((key) => (
              <td key={key} className="p-2 border border-gray-300">
                <input
                  type="text"
                  value={newEntry[key] || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, [key]: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              </td>
            ))}
            <td className="p-2 border border-gray-300">
              <button
                onClick={handleCreateEntry}
                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Create
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EntityTable;