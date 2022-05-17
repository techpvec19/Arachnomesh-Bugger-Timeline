// This is 'SubTask-controller.js' - A File containing all the controllers for SubTask entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Employee = Relations.Employee
const Project = Relations.Project;
const Assignment = Relations.Assignment;
const Task = Relations.Task
const SubTask = Relations.SubTask;

// 1. Add a new SubTask
const addNewSubTask = async (req, res) => {
    
    let newSubTaskDetails = {
        subTask_name: req.body.subTask_name,
        subTask_description: req.body.subTask_description,
        subTask_assigned_to: req.body.subTask_assigned_to,
        subTask_start_date: req.body.subTask_start_date,
        subTask_end_date: req.body.subTask_end_date,
        subTask_estimated_time: req.body.subTask_estimated_time,
        subTask_spent_time: req.body.subTask_spent_time,
        subTask_progress: req.body.subTask_progress,
        subTask_status: req.body.subTask_status,
        TaskId: req.body.TaskId
    };

    try{
        const newSubTask = await SubTask.create(newSubTaskDetails);
        res.status(200).send(newSubTask);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all SubTasks
const getAllSubTasks = async (req, res) => {

    try{
        let allSubTasks = await SubTask.findAll({
            attributes: ['subTask_name'],
            include: [
                {
                    attributes: ['task_name'],
                    model: Task,
                    include: {
                        attributes: ['assignment_name'],
                        model: Assignment,
                        include: {
                            attributes: ['project_name'],
                            model: Project
                        }
                    }
                }
            ]       
        });

        if(allSubTasks.length > 0) res.status(200).send(allSubTasks);
        else    res.status(200).send('No SubTasks');
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one single SubTask
const getOneSubTask = async (req, res) => {

    const id = req.params.id;
    try{
        let oneSubTask = await SubTask.findOne({
            where: {
                id: id,
            },
            attributes: ['subTask_name'],
            include: [
                {
                    attributes: ['task_name'],
                    model: Task,
                    include: {
                        attributes: ['assignment_name'],
                        model: Assignment,
                        include: {
                            attributes: ['project_name'],
                            model: Project
                        }
                    }
                }
            ]      
        });

        res.status(200).send(oneSubTask);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 4. Update one single SubTask
const updateOneSubTask = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        subTask_name: req.body.subTask_name,
        subTask_description: req.body.subTask_description,
        subTask_assigned_to: req.body.subTask_assigned_to,
        subTask_start_date: req.body.subTask_start_date,
        subTask_end_date: req.body.subTask_end_date,
        subTask_estimated_time: req.body.subTask_estimated_time,
        subTask_spent_time: req.body.subTask_spent_time,
        subTask_progress: req.body.subTask_progress,
        subTask_status: req.body.subTask_status,
        TaskId: req.body.TaskId
    };

    try{
        let updateStatus = await SubTask.update(updatedDetails, {
            where: {
                id: id,
            }
        });

        if(updateStatus[0]){
            try{
                let oneSubTask = await SubTask.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['subTask_name'],
                    include: [
                        {
                            attributes: ['task_name'],
                            model: Task,
                            include: {
                                attributes: ['assignment_name'],
                                model: Assignment,
                                include: {
                                    attributes: ['project_name'],
                                    model: Project
                                }
                            }
                        }
                    ]
                });
                res.status(200).send(oneSubTask);
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

// 5. Delete one SubTask
const deleteOneSubTask = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await SubTask.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('SubTask Deleted')
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
    addNewSubTask,
    getAllSubTasks,
    getOneSubTask,
    updateOneSubTask,
    deleteOneSubTask
}