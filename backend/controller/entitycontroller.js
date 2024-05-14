import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../model/schema.js';
// Create a new entity with its attributes
export const createEntity = async (req, res) => {
  const { entityName, attributes } = req.body;
  try {
    const updatedAttributes = {};

    // Convert attribute types to PostgreSQL-compatible types
    Object.entries(attributes).forEach(([key, value]) => {
      const { type, allowNull } = value;
      switch (type ? type.toUpperCase() : 'STRING') {
        case 'STRING':
          updatedAttributes[key] = {
            type: DataTypes.TEXT, // Use DataTypes.TEXT
            allowNull: !allowNull,
          };
          break;
        case 'INTEGER':
          updatedAttributes[key] = {
            type: DataTypes.INTEGER, // Use DataTypes.INTEGER
            allowNull: !allowNull,
          };
          break;
        case 'FLOAT':
          updatedAttributes[key] = {
            type: DataTypes.FLOAT, // Use DataTypes.FLOAT
            allowNull: !allowNull,
          };
          break;
        case 'DATE':
          updatedAttributes[key] = {
            type: DataTypes.DATE, // Use DataTypes.DATE
            allowNull: !allowNull,
          };
          break;
        // Add more cases for other data types as needed
        default:
          break;
      }
    });

    const entity = await sequelize.define(entityName, updatedAttributes, {
      freezeTableName: true,
    });
    await entity.sync();
    res.status(201).json({ message: `Entity ${entityName} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating entity' });
  }
};

export const readEntities = async (req, res) => {
  try {
    // Get all model names from the sequelize object
    const entityNames = Object.keys(sequelize.models);

    // Send the list of entity names as response
    res.status(200).json(entityNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reading entities' });
  }
};

// Rest of the code...
// Create a new entry for an existing entity
export const createEntry = async (req, res) => {
  const { entityName, entry } = req.body;

  try {
    const entity = sequelize.models[entityName];
    if (!entity) {
      return res.status(404).json({ message: `Entity ${entityName} not found` });
    }
    const newEntry = await entity.create(entry);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating entry' });
  }
};

// Read all entries for an existing entity
export const readEntries = async (req, res) => {
  const { entityName } = req.params;
  try {
    const entity = sequelize.models[entityName];
    if (!entity) {
      return res.status(404).json({ message: `Entity ${entityName} not found` });
    }

    const entries = await entity.findAll({
      attributes: Object.keys(entity.rawAttributes),
    });

    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reading entries' });
  }
};

// Update an existing entry for an entity
export const updateEntry = async (req, res) => {
  const { entityName, entryId } = req.params;
  const updatedEntry = req.body;

  try {
    const entity = sequelize.models[entityName];
    if (!entity) {
      return res.status(404).json({ message: `Entity ${entityName} not found` });
    }
    const [updated] = await entity.update(updatedEntry, {
      where: { id: entryId },
    });
    if (updated) {
      const updatedEntryData = await entity.findByPk(entryId);
      res.status(200).json(updatedEntryData);
    } else {
      res.status(404).json({ message: `Entry with id ${entryId} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating entry' });
  }
};

// Delete an existing entry for an entity
export const deleteEntry = async (req, res) => {
  const { entityName, entryId } = req.params;

  try {
    const entity = sequelize.models[entityName];
    if (!entity) {
      return res.status(404).json({ message: `Entity ${entityName} not found` });
    }
    const deleted = await entity.destroy({
      where: { id: entryId },
    });
    if (deleted) {
      res.status(200).json({ message: `Entry with id ${entryId} deleted successfully` });
    } else {
      res.status(404).json({ message: `Entry with id ${entryId} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting entry' });
  }
};