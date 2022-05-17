// This is 'project-controller.js' - A File containing all the controllers for Project entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Employee = Relations.Employee
const Project = Relations.Project;
const Assignment = Relations.Assignment;
const Task = Relations.Task;
const SubTask = Relations.SubTask

// 1. Add a new project
const addNewProject = async (req, res) => {
    
    let newProjectDetails = {
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_assigned_to: req.body.project_assigned_to,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_estimated_time: req.body.project_estimated_time,
        project_spent_time: req.body.project_spent_time,
        project_progress: req.body.project_progress,
        project_status: req.body.project_status,
    };

    try{
        const newProject = await Project.create(newProjectDetails);
        res.status(200).send(newProject);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all projects
const getAllProjects = async (req, res) => {

    try{
        let allProjects = await Project.findAll({
            attributes: ['project_name'],
            include: [
                {
                    attributes: ['assignment_name'],
                    model: Assignment,
                    include: {
                        attributes: ['task_name'],
                        model: Task,
                        include: {
                            attributes: ['subTask_name'],
                            model: SubTask
                        }
                    }
                }, 
            ]       
        });

        if(allProjects.length > 0) res.status(200).send(allProjects);
        else    res.status(200).send('No projects');
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one single project
const getOneProject = async (req, res) => {

    const id = req.params.id;
    try{
        let oneProject = await Project.findOne({
            where: {
                id: id,
            },
            attributes: ['project_name'],
            include: [
                {
                    attributes: ['assignment_name'],
                    model: Assignment,
                    include: {
                        attributes: ['task_name'],
                        model: Task,
                        include: {
                            attributes: ['subTask_name'],
                            model: SubTask
                        }
                    }
                }, 
            ]     
        });

        res.status(200).send(oneProject);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 4. Update one single project
const updateOneProject = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_assigned_to: req.body.project_assigned_to,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_estimated_time: req.body.project_estimated_time,
        project_spent_time: req.body.project_spent_time,
        project_progress: req.body.project_progress,
        project_status: req.body.project_status
    };

    try{
        let updateStatus = await Project.update(updatedDetails, {
            where: {
                id: id,
            }
        });

        if(updateStatus[0]){
            try{
                let oneProject = await Project.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['project_name'],
                    include: [
                        {
                            attributes: ['assignment_name'],
                            model: Assignment,
                            include: {
                                attributes: ['task_name'],
                                model: Task,
                                include: {
                                    attributes: ['subTask_name'],
                                    model: SubTask
                                }
                            }
                        }, 
                    ]  
                });
                res.status(200).send(oneProject);
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

// 5. Delete one project
const deleteOneProject = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Project.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Project Deleted')
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
    addNewProject,
    getAllProjects,
    getOneProject,
    updateOneProject,
    deleteOneProject
}