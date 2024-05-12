import EntitySchema from '../model/schema.js';
import mongoose from 'mongoose';

// Create a new entity
export const createEntity = async (req, res) => {
  try {
    const { entityName, attributes } = req.body;
    const entitySchema = new EntitySchema({ name: entityName, attributes });
    await entitySchema.save();
    res.status(201).json({ message: 'Entity created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get data for an entity
export const getEntityData = async (req, res) => {
  try {
    const { entityName } = req.params;
    const entitySchema = await EntitySchema.findOne({ name: entityName });
    if (!entitySchema) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    const entityModel = mongoose.model(entityName, entitySchema.schema);
    const data = await entityModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create data for an entity
export const createData = async (req, res) => {
  try {
    const { entityName } = req.params;
    const entitySchema = await EntitySchema.findOne({ name: entityName });
    if (!entitySchema) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    const entityModel = mongoose.model(entityName, entitySchema.schema);
    const newData = new entityModel(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update data for an entity
export const updateData = async (req, res) => {
  try {
    const { entityName, id } = req.params;
    const entitySchema = await EntitySchema.findOne({ name: entityName });
    if (!entitySchema) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    const entityModel = mongoose.model(entityName, entitySchema.schema);
    const updatedData = await entityModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete data for an entity
export const deleteData = async (req, res) => {
  try {
    const { entityName, id } = req.params;
    const entitySchema = await EntitySchema.findOne({ name: entityName });
    if (!entitySchema) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    const entityModel = mongoose.model(entityName, entitySchema.schema);
    const deletedData = await entityModel.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};