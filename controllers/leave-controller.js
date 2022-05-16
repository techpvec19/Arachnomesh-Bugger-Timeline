// This is 'leave-controller.js' - A File containing all the controllers for Leave entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Employee = Relations.Employee;
const Leave = Relations.Leave;

// 1. Add a new leave
const addNewLeave = async (req, res) => {
    
    let newLeaveDetails = {
        leave_start_date: req.body.leave_start_date,
        leave_end_date: req.body.leave_end_date,
        leave_type: req.body.leave_type,
        leave_status: req.body.leave_status,
        EmployeeId: req.body.EmployeeId
    };

    try{
        const newLeave = await Leave.create(newLeaveDetails);
        res.status(200).send(newLeave);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 4. Update one single employee
const updateOneLeave = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        leave_start_date: req.body.leave_start_date,
        leave_end_date: req.body.leave_end_date,
        leave_type: req.body.leave_type,
        leave_status: req.body.leave_status,
        EmployeeId: req.body.EmployeeId
    };

    try{
        let updateStatus = await Leave.update(updatedDetails, {
            where: {
                id: id,
            },
            include: [Employee]
        });

        if(updateStatus[0]){
            try{
                let oneLeave = await Leave.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['id', 'uuid', 'leave_start_date', 'leave_end_date'],
                    include: [
                        {
                            model: Employee, 
                            attributes: ['employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no']
                        }
                    ]     
                });
                res.status(200).send(oneLeave);
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
const deleteOneLeave = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Leave.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Employee Deleted')
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
    addNewLeave,
    updateOneLeave,
    deleteOneLeave
}