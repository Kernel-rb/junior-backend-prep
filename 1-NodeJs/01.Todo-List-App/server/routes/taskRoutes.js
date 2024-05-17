import express from 'express';
import { addTask, getTasks, updateTask, deleteTask } from '../controllers/taskControllers.js';



const router = express.Router();

router.get('/all', getTasks);
router.post('/add', addTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;