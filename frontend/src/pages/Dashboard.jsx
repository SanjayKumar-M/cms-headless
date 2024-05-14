// Dashboard.js
import React, { useState } from 'react';
import EntityList from '../components/EntityList';
import EntityForm from '../components/EntityForm';
import EntityTable from '../components/EntityTable';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { createEntry, deleteEntry, fetchEntries } from '../utils/api';

const Dashboard = () => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectEntity = async (entityName) => {
    try {
      setLoading(true);
      setSelectedEntity(entityName);
      const data = await fetchEntries(entityName);
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setError('Error fetching entries');
      setLoading(false);
    }
  };

  const handleSubmitEntry = async (formData) => {
    try {
      setLoading(true);
      await createEntry(selectedEntity, formData);
      const data = await fetchEntries(selectedEntity);
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating entry:', error);
      setError('Error creating entry');
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      setLoading(true);
      await deleteEntry(selectedEntity, entryId);
      const updatedEntries = entries.filter((entry) => entry.id !== entryId);
      setEntries(updatedEntries);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting entry:', error);
      setError('Error deleting entry');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <EntityList onSelectEntity={handleSelectEntity} />
        </div>
        <div className="col-span-1">
          {error && <ErrorMessage message={error} />}
          {selectedEntity && <EntityForm onSubmit={handleSubmitEntry} />}
          {loading && <LoadingSpinner />}
        </div>
        <div className="col-span-1">
          {selectedEntity && <EntityTable entries={entries} onDelete={handleDeleteEntry} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
