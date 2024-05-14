import React, { useState, useEffect } from 'react';
import { readEntities } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const EntityList = ({ onEntitySelect }) => {
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const fetchedEntities = await readEntities();
        setEntities(fetchedEntities);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntities();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Entities</h2>
      <ul className="space-y-2">
        {entities.map((entity) => (
          <li
            key={entity}
            className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => onEntitySelect(entity)}
          >
            {entity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EntityList