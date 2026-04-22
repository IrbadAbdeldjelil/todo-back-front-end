const createError = require('http-errors');
const { Task } = require('../models/relation.model');
const { sendResponse } = require('../helpers/responses');

// create
module.exports.createTask = async (req, res, next) => {
       
    const {title, description} = req.validated;
    const userId = req.user.id;
    const task = await Task.create({title, description, userId});
    if (!task) {
        throw createError(401, 'something went wrong on creating task');
    }
    sendResponse(res, true, 201, 'task created successfully', task, null);

}
// get all tasks
module.exports.getTasks = async (req, res, next) => {

      const tasks = await Task.findAll()
      sendResponse(res, true, 200, 'all tasks', tasks, null);
};

// get task by ID
module.exports.getTask = async (req, res, next) => {

    const id = req.params.id;
    validateId(id);
    const task = await Task.findByPk(id);
    if (!task) {
       throw createError(404, 'task not exist');
    }
    sendResponse(res, true, 200, 'task found successfully', task, null)
};

// update task by ID
module.exports.updateTask = async (req, res, next) => {
        
      const id = req.params.id;
      validateId(id)
      const {title, description, status} = req.validated;
      const isTask = await Task.findByPk(id);
      if (!isTask) {
        throw createError(404, 'task not exist');
      }
      const updated = await Task.update({title, description, status: status || isTask.status}, {where:{id}});
      sendResponse(res, true, 200, 'task updated successfuly', {
        id: isTask.id,
        title,
        description,
        status: status || isTask.status,
        userId: isTask.userId
    }, null);
}

// delete task 
module.exports.deleteTask = async (req, res, next) => {
        
    const id= req.params.id;
    validateId(id);
    const isTask = await Task.findByPk(id);
    if(!isTask) {
        throw createError(404, 'task not exist');
    }
    const task = await Task.destroy({where:{id}});
    sendResponse(res, true, 200, 'task deleted successfuly', null, null);
}

//id validation
function validateId(id) {
    if(!id) throw createError(400, 'ID is required');
    if(!Number(id)) throw createError(400, "ID must be Number");
}