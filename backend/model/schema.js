import { Sequelize, DataTypes } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('cms', 'postgres', 'Sanjay@007', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define a function to create a new entity
const createEntity = (entityName, attributes) => {
  const entity = sequelize.define(entityName, attributes, { timestamps: true });
  return entity;
};

// Create an initial entity (e.g., Person)
const Person = createEntity('Person', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Store all created entities in a Map
const entities = new Map();
entities.set('Person', Person);

// Sync the database and create tables for all entities
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

// Export the necessary functions and objects
export { createEntity, entities };
export default sequelize;