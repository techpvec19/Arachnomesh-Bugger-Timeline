// This is 'Task-controller.js' - A File containing all the controllers for Task entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Employee = Relations.Employee
const Project = Relations.Project;
const Assignment = Relations.Assignment;
const Task = Relations.Task;
const SubTask = Relations.SubTask

// 1. Add a new Task
const addNewTask = async (req, res) => {
    
    let newTaskDetails = {
        task_name: req.body.task_name,
        task_description: req.body.task_description,
        task_assigned_to: req.body.task_assigned_to,
        task_start_date: req.body.task_start_date,
        task_end_date: req.body.task_end_date,
        task_estimated_time: req.body.task_estimated_time,
        task_spent_time: req.body.task_spent_time,
        task_progress: req.body.task_progress,
        task_status: req.body.task_status,
        AssignmentId: req.body.AssignmentId
    };

    try{
        const newTask = await Task.create(newTaskDetails);
        res.status(200).send(newTask);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all Tasks
const getAllTasks = async (req, res) => {

    try{
        let allTasks = await Task.findAll({
            attributes: ['task_name'],
            include: [
                {
                    attributes: ['subTask_name'],
                    model: SubTask
                    
                }, 
                {
                    attributes: ['assignment_name'],
                    model: Assignment,
                    include: {
                        attributes: ['project_name'],
                        model: Project
                    }
                }
            ]       
        });

        if(allTasks.length > 0) res.status(200).send(allTasks);
        else    res.status(200).send('No Tasks');
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one single Task
const getOneTask = async (req, res) => {

    const id = req.params.id;
    try{
        let oneTask = await Task.findOne({
            where: {
                id: id,
            },
            attributes: ['task_name'],
            include: [
                {
                    attributes: ['subTask_name'],
                    model: SubTask
                    
                }, 
                {
                    attributes: ['assignment_name'],
                    model: Assignment,
                    include: {
                        attributes: ['project_name'],
                        model: Project
                    }
                }
            ]        
        });

        res.status(200).send(oneTask);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 4. Update one single Task
const updateOneTask = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        task_name: req.body.task_name,
        task_description: req.body.task_description,
        task_assigned_to: req.body.task_assigned_to,
        task_start_date: req.body.task_start_date,
        task_end_date: req.body.task_end_date,
        task_estimated_time: req.body.task_estimated_time,
        task_spent_time: req.body.task_spent_time,
        task_progress: req.body.task_progress,
        task_status: req.body.task_status,
        AssignmentId: req.body.AssignmentId
    };

    try{
        let updateStatus = await Task.update(updatedDetails, {
            where: {
                id: id,
            }
        });

        if(updateStatus[0]){
            try{
                let oneTask = await Task.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['task_name'],
                    include: [
                        {
                            attributes: ['subTask_name'],
                            model: SubTask
                            
                        }, 
                        {
                            attributes: ['assignment_name'],
                            model: Assignment,
                            include: {
                                attributes: ['project_name'],
                                model: Project
                            }
                        }
                    ]     
                });
                res.status(200).send(oneTask);
            }
            catch(err){
                res.status(404).send(`Error: ${err}`);
            }
        }
        else{
            res.status(404).send(`Error in Updation`);
        }
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    };

};

// 5. Delete one Task
const deleteOneTask = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Task.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Task Deleted')
        }
        else{
            res.status(404).send('Error in Deletion');
        }
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
}

module.exports = {
    addNewTask,
    getAllTasks,
    getOneTask,
    updateOneTask,
    deleteOneTask
}