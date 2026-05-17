import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware'; 


const router = Router();

// Yeh ek master lock hai. Is line ke neeche jitne bhi routes hain, 
// un sab par 'protect' middleware apply ho jayega.
router.use(protect); 


// API Blueprint: Koun sa HTTP method kya karega
router.route('/')
  .get(getTasks)
  .post(createTask);

  
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

export default router;