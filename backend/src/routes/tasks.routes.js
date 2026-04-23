const { Router } = require('express');
const router = Router();
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask

} = require('../controllers/tasks.controller');
const {todoSchema, validate} = require('../middlewares/validation.middleware');
const { auth } = require('../middlewares/auth.middleware');

router.use(auth);
// get all tasks
router.get('/', getTasks);
// get task by ID
router.get('/:id', getTask);


// create task
router.post('/', validate(todoSchema), createTask);
//update task by ID
router.patch('/:id', validate(todoSchema), updateTask);
//delete task by ID
router.delete('/:id', deleteTask);

module.exports = router;