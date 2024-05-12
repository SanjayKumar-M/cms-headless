import express from 'express';
import { createEntity, getEntityData,createData,updateData,deleteData } from '../controller/entitycontroller.js';

const router = express.Router();

// Create a new entity
router.post('/entities', createEntity);

// Get data for an entity
router.get('/entities/:entityName', getEntityData);

// Create data for an entity
router.post('/entities/:entityName', createData);

// Update data for an entity
router.put('/entities/:entityName/:id', updateData);

// Delete data for an entity
router.delete('/entities/:entityName/:id', deleteData);

export default router;