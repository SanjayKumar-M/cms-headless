import express from 'express';
import {
  createEntity,
  createEntry,
  readEntries,
  updateEntry,
  deleteEntry,
} from '../controller/entitycontroller.js';

const router = express.Router();

router.post('/create', createEntity);
router.post('/entry', createEntry);
router.get('/:entityName', readEntries);
router.put('/:entityName/:entryId', updateEntry);
router.delete('/:entityName/:entryId', deleteEntry);

export default router;