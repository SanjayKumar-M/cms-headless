import React, { useState } from 'react';
import EntityForm from '../components/EntityForm';
import EntityList from '../components/EntityList';
import EntityTable from '../components/EntityTable';

const Dashboard = () => {
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleEntitySelect = (entity) => {
    setSelectedEntity(entity);
  };

  return (
    <div className="flex">
      <div className="w-1/4 border-r border-gray-300">
        <EntityForm />
      </div>
      <div className="w-1/4 border-r border-gray-300">
        <EntityList onEntitySelect={handleEntitySelect} />
      </div>
      <div className="w-2/4">
        {selectedEntity ? (
          <EntityTable entityName={selectedEntity} />
        ) : (
          <div className="p-4">Select an entity to view its entries.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;