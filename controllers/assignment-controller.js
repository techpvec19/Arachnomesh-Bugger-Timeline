// This is 'assignment-controller.js' - A File containing all the controllers for Assignment entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Employee = Relations.Employee
const Project = Relations.Project;
const Assignment = Relations.Assignment;
const Task = Relations.Task;
const SubTask = Relations.SubTask

// 1. Add a new Assignment
const addNewAssignment = async (req, res) => {
    
    let newAssignmentDetails = {
        assignment_name: req.body.assignment_name,
        assignment_description: req.body.assignment_description,
        assignment_assigned_to: req.body.assignment_assigned_to,
        assignment_start_date: req.body.assignment_start_date,
        assignment_end_date: req.body.assignment_end_date,
        assignment_estimated_time: req.body.assignment_estimated_time,
        assignment_spent_time: req.body.assignment_spent_time,
        assignment_progress: req.body.assignment_progress,
        assignment_status: req.body.assignment_status,
        ProjectId: req.body.ProjectId
    };

    try{
        const newAssignment = await Assignment.create(newAssignmentDetails);
        res.status(200).send(newAssignment);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all Assignments
const getAllAssignments = async (req, res) => {

    try{
        let allAssignments = await Assignment.findAll({
            attributes: ['assignment_name'],
            include: [
                {
                    model: Task,
                    attributes: ['task_name'],
                    include: {
                        attributes: ['subTask_name'],
                        model: SubTask
                    }
                }, 
                {
                    attributes: ['project_name'],
                    model: Project
                }
            ]       
        });

        if(allAssignments.length > 0) res.status(200).send(allAssignments);
        else    res.status(200).send('No Assignments');
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one single Assignment
const getOneAssignment = async (req, res) => {

    const id = req.params.id;
    try{
        let oneAssignment = await Assignment.findOne({
            where: {
                id: id,
            },
            attributes: ['assignment_name'],
            include: [
                {
                    model: Task,
                    attributes: ['task_name'],
                    include: {
                        attributes: ['subTask_name'],
                        model: SubTask
                    }
                }, 
                {
                    attributes: ['project_name'],
                    model: Project
                }
            ]       
        });

        res.status(200).send(oneAssignment);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 4. Update one single Assignment
const updateOneAssignment = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        assignment_name: req.body.assignment_name,
        assignment_description: req.body.assignment_description,
        assignment_assigned_to: req.body.assignment_assigned_to,
        assignment_start_date: req.body.assignment_start_date,
        assignment_end_date: req.body.assignment_end_date,
        assignment_estimated_time: req.body.assignment_estimated_time,
        assignment_spent_time: req.body.assignment_spent_time,
        assignment_progress: req.body.assignment_progress,
        assignment_status: req.body.assignment_status,
        ProjectId: req.body.ProjectId
    };

    try{
        let updateStatus = await Assignment.update(updatedDetails, {
            where: {
                id: id,
            }
        });

        if(updateStatus[0]){
            try{
                let oneAssignment = await Assignment.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['assignment_name'],
                    include: [
                        {
                            model: Task,
                            attributes: ['task_name'],
                            include: {
                                attributes: ['subTask_name'],
                                model: SubTask
                            }
                        }, 
                        {
                            attributes: ['project_name'],
                            model: Project
                        }
                    ]      
                });
                res.status(200).send(oneAssignment);
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

// 5. Delete one Assignment
const deleteOneAssignment = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Assignment.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Assignment Deleted')
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
    addNewAssignment,
    getAllAssignments,
    getOneAssignment,
    updateOneAssignment,
    deleteOneAssignment
}