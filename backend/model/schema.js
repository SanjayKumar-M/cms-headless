import { Sequelize, DataTypes } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('cms', 'postgres', 'Sanjay@007', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define a function to create a new entity
const createEntity = (entityName, attributes) => {
  const updatedAttributes = {
    // Add an auto-incrementing id field
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  };

  // Convert attribute types to PostgreSQL-compatible types
  Object.entries(attributes).forEach(([key, value]) => {
    const { type, allowNull } = value;
    switch (type) {
      case 'STRING':
        updatedAttributes[key] = {
          type: DataTypes.TEXT,
          allowNull: !allowNull,
        };
        break;
      case 'INTEGER':
        updatedAttributes[key] = {
          type: DataTypes.INTEGER,
          allowNull: !allowNull,
        };
        break;
      case 'FLOAT':
        updatedAttributes[key] = {
          type: DataTypes.FLOAT,
          allowNull: !allowNull,
        };
        break;
      case 'DATE':
        updatedAttributes[key] = {
          type: DataTypes.DATE,
          allowNull: !allowNull,
        };
        break;
      // Add more cases for other data types as needed
      default:
        break;
    }
  });

  const entity = sequelize.define(entityName, updatedAttributes, { timestamps: true });
  return entity;
};

// Create an initial entity (e.g., Person)
const Person = createEntity('Person', {
  name: {
    type: 'STRING',
    allowNull: false,
  },
  email: {
    type: 'STRING',
    allowNull: false,
    unique: true,
  },
  mobileNumber: {
    type: 'STRING',
    allowNull: false,
  },
  dateOfBirth: {
    type: 'DATE',
    allowNull: false,
  },
});

// Store all created entities in a Map
const entities = new Map();
entities.set('Person', Person);

// Sync the database and create tables for all entities
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

// Export the necessary functions and objects
export { createEntity, entities };
export default sequelize;