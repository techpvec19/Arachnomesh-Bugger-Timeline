// This is 'employee-controller.js' - A File containing all the controllers for Employee entity

// Importing Requirements
const Relations = require('../models');
const project = require('../models/project');

// Accessing Relations
const Employee = Relations.Employee;
const Role = Relations.Role;
const Attendance = Relations.Attendance;
const Break = Relations.Break;
const Leave = Relations.Leave
const Project = Relations.Project;
const Assignment = Relations.Assignment;
const Task = Relations.Task;
const SubTask = Relations.SubTask

// 1. Add a new employee
const addNewEmployee = async (req, res) => {
    
    let newEmployeeDetails = {
        employee_name: req.body.employee_name,
        employee_email_id: req.body.employee_email_id,
        employee_password: req.body.employee_password,
        employee_user_id: req.body.employee_user_id,
        employee_profile_icon: req.body.employee_profile_icon,
        employee_contact_no: req.body.employee_contact_no,
        employee_date_of_birth: req.body.employee_date_of_birth,
        employee_joining_date: req.body.employee_joining_date,
        employee_status: req.body.employee_status,
        RoleId: req.body.RoleId
    };

    try{
        const newEmployee = await Employee.create(newEmployeeDetails);
        res.status(200).send(newEmployee);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all employees
const getAllEmployees = async (req, res) => {

    try{
        let allEmployees = await Employee.findAll({
            attributes: ['id', 'uuid', 'employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no', 'employee_joining_date', 'employee_status'],
            include: [
                {
                    model: Role, 
                    attributes: ['employee_role_name', 'employee_role_isAdmin']
                },
                {
                    model: Attendance,
                    attributes: ['attendance_date', 'attendance_break_time'],
                    
                    include: {
                        model: Break,
                        attributes: ['break_in_time', 'break_out_time']
                    }
                },
                {
                    model: Leave,
                    attributes: ['leave_start_date', 'leave_end_date']
                },
                {
                    attributes: ['id', 'project_name'],
                    model: Project,
                    through: {attributes: []},

                    include: {

                        attributes: ['id', 'assignment_name'],
                        model: Assignment,

                        include: {

                            attributes: ['id', 'task_name'],
                            model: Task,

                            include: {

                                attributes: ['id', 'subTask_name'],
                                model: SubTask
                            }
                        }
                    }
                },
            ]       
        });

        if(allEmployees.length > 0) res.status(200).send(allEmployees);
        else    res.status(200).send('No Employees');
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one single employee
const getOneEmployee = async (req, res) => {

    const id = req.params.id;

    try{
        let oneEmployee = await Employee.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'uuid', 'employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no', 'employee_joining_date', 'employee_status'],
            include: [
                {
                    model: Role, 
                    attributes: ['employee_role_name', 'employee_role_isAdmin']
                },
                {
                    model: Attendance,
                    attributes: ['attendance_date', 'attendance_break_time'],
                    
                    include: {
                        model: Break,
                        attributes: ['break_in_time', 'break_out_time']
                    }
                },
                {
                    model: Leave,
                    attributes: ['leave_start_date', 'leave_end_date']
                },
                {
                    attributes: ['id', 'project_name'],
                    model: Project,
                    through: {attributes: []},

                    include: {

                        attributes: ['id', 'assignment_name'],
                        model: Assignment,

                        include: {

                            attributes: ['id', 'task_name'],
                            model: Task,

                            include: {

                                attributes: ['id', 'subTask_name'],
                                model: SubTask
                            }
                        }
                    }
                },
            ]        
        });
        if(oneEmployee.length < 0)  res.status(200).send('Error: Not a Valid Employee Id');
        else    res.status(200).send(oneEmployee)
    }
    catch(err){
        res.status(404).send(`Error: ${err}`)
    }

};

// 4. Update one single employee
const updateOneEmployee = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        employee_name: req.body.employee_name,
        employee_email_id: req.body.employee_email_id,
        employee_password: req.body.employee_password,
        employee_user_id: req.body.employee_user_id,
        employee_profile_icon: req.body.employee_profile_icon,
        employee_contact_no: req.body.employee_contact_no,
        employee_date_of_birth: req.body.employee_date_of_birth,
        employee_joining_date: req.body.employee_joining_date,
        employee_status: req.body.employee_status,
        RoleId: req.body.RoleId
    };

    try{
        let updateStatus = await Employee.update(updatedDetails, {
            where: {
                id: id,
            },
            include: [Role]
        });

        if(updateStatus[0]){
            try{
                let oneRole = await Employee.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['id', 'uuid', 'employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no', 'employee_joining_date', 'employee_status'],
                    include: [
                        {
                            model: Role, 
                            attributes: ['employee_role_name', 'employee_role_isAdmin']
                        },
                        {
                            model: Attendance,
                            attributes: ['attendance_date', 'attendance_break_time'],
                            
                            include: {
                                model: Break,
                                attributes: ['break_in_time', 'break_out_time']
                            }
                        },
                        {
                            model: Leave,
                            attributes: ['leave_start_date', 'leave_end_date']
                        }
                    ]     
                });
                res.status(200).send(oneRole);
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
const deleteOneEmployee = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Employee.destroy({
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
    addNewEmployee,
    getAllEmployees,
    getOneEmployee,
    updateOneEmployee,
    deleteOneEmployee
}