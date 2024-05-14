// EntityList.js
import React, { useState, useEffect } from 'react';
import { fetchEntities } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
const EntityList = ({ onSelectEntity }) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEntities = async () => {
      try {
        const data = await fetchEntities();
        setEntities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    getEntities();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Entities</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="space-y-2">
          {entities.map((entity) => (
            <li key={entity.id} onClick={() => onSelectEntity(entity.name)} className="cursor-pointer">
              {entity.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntityList;
