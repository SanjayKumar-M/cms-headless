import express from 'express';
import {
  createEntity,
  createEntry,
  readEntries,
  updateEntry,
  deleteEntry,
  readEntities
} from '../controller/entitycontroller.js';

const router = express.Router();

router.post('/create', createEntity);
router.get('/', readEntities);
router.post('/entry', createEntry);
router.get('/:entityName', readEntries);
router.put('/:entityName/:entryId', updateEntry);
router.delete('/:entityName/:entryId', deleteEntry);

export default router;