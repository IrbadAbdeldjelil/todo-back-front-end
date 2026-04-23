const createError = require('http-errors');
const { Task, User } = require('../models/relation.model');
const { sendResponse } = require('../helpers/responses');

// create
module.exports.createTask = async (req, res, next) => {
       
    const {title, description} = req.validated;
    const user = req.user;
    const task = await user.createTask({title, description});
    if (!task) {
        throw createError(401, 'something went wrong on creating task');
    }
    sendResponse(res, true, 201, 'task created successfully', task, null);

}
// get all tasks
module.exports.getTasks = async (req, res, next) => {
      const userId = req.user.id;
      const tasks = await Task.findAll({
        where: {userId}, 
        include:{
            model: User,
            attributes: ["username", "email", "role"]
        }
    });
      sendResponse(res, true, 200, 'all tasks', tasks, null);
};

// get task by ID
module.exports.getTask = async (req, res, next) => {

    const id = req.params.id;
    validateId(id);
    const user = req.user;
    const task = await Task.findOne({
        where: {id, userId: user.id},
        include:{
            model: User,
            attributes: ["username", "email", "role"]
        }
    });
    if (!task) {
       throw createError(404, 'task not exist');
    }
    sendResponse(res, true, 200, 'task found successfully', task, null)
};

// update task by ID
module.exports.updateTask = async (req, res, next) => {
        
      const id = req.params.id;
      validateId(id);
      const user = req.user;
      const {title, description, status} = req.validated;
      const isTask = await Task.findOne({where: {id, userId: user.id}});
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
    const user = req.user;
    const isTask = await Task.findOne({where: {id, userId: user.id}});
    if(!isTask) {
        throw createError(404, 'task not exist');
    }
    const task = await Task.destroy({where:{id, userId: user.id}});
    sendResponse(res, true, 200, 'task deleted successfuly', null, null);
}

//id validation
function validateId(id) {
    if(!id) throw createError(400, 'ID is required');
    if(!Number(id)) throw createError(400, "ID must be Number");
}