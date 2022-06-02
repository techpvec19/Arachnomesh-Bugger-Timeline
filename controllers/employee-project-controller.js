// This is 'employee-project-controller.js' - A File containing all the controllers for Employee-Project Junction entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const EmployeeProject = Relations.EmployeeProject

// 1. Add a new employee-project-relationship
const addNewEmployeeProjectRelationship = async (req, res) => {
    
    let newEmployeeProjectDetail = {
        EmployeeId: req.body.EmployeeId,
        ProjectId: req.body.ProjectId
    };

    try{
        const newEmployeeProjectRelation = await EmployeeProject.create(newEmployeeProjectDetail);
        res.status(200).send(newEmployeeProjectRelation);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 4. Update one single employee-project-relationship
const updateOneEmployeeProjectRelationship = async (req, res) => {

    const id = req.params.id;

    let updatedEmployeeProjectDetail = {
        EmployeeId: req.body.EmployeeId,
        ProjectId: req.body.ProjectId
    };

    try{
        let updateStatus = await EmployeeProject.update(updatedEmployeeProjectDetail, {
            where: {
                id: id,
            },
        });

        if(updateStatus[0]){
            try{
                res.status(200).send('Employee-Project Relationship Updated');
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

// 5. Delete one employee
const deleteOneEmployeeProjectRelationship = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await EmployeeProject.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Employee-Project Relationship Deleted')
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
    addNewEmployeeProjectRelationship,
    updateOneEmployeeProjectRelationship,
    deleteOneEmployeeProjectRelationship
}