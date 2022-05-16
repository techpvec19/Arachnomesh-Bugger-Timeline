// This is 'attendance-controller.js' - A File containing all the controllers for Attendance entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Employee = Relations.Employee;
const Attendance = Relations.Attendance;
const Break = Relations.Break

// 1. Add a new attendance
const addNewAttendance = async (req, res) => {
    
    let newAttendanceDetails = {
        attendance_date: req.body.attendance_date,
        attendance_mark_in_time: req.body.attendance_mark_in_time,
        attendance_mark_out_time: req.body.attendance_mark_out_time,
        attendance_type: req.body.attendance_type,
        attendance_break_time: req.body.attendance_break_time,
        EmployeeId: req.body.EmployeeId
    };

    try{
        const newAttendance = await Attendance.create(newAttendanceDetails);
        res.status(200).send(newAttendance);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Get all attendance
const getAllAttendance = async (req, res) => {

    // Container to Store all attendance of the employees datewise
    let results = {};

    try{
        let allAttendance = await Attendance.findAll({
            attributes: ['attendance_date', 'attendance_break_time'],
            include: {
                model: Employee,
                attributes: ['employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no']
            }
        });

        for(let i=0; i<allAttendance.length; i++){

            let key = allAttendance[i]["attendance_date"];
            let value = allAttendance[i]["Employee"]
            

            if(allAttendance[i]["attendance_date"] in results){
                results[key].push(value);
            }
            else{
                results[key] = [value];
            }
        }

        res.status(200).send(results);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }

};

// 3. Get one attendance
const getOneAttendance = async (req, res) => {

    const date = req.params.date;
    let results = {
        "attendance_date": date,
        "Employees": [],
    };

    try{
        let oneAttendance = await Attendance.findAll({
            where: {
                attendance_date: date,
            },
            attributes: ['attendance_date'],
            include: {
                model: Employee,
                attributes: ['employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no']
            }
        });
        
        for(let i=0; i<oneAttendance.length; i++){
            let employee = oneAttendance[i]["Employee"];
            results["Employees"].push(employee)
        }          
        
        res.status(200).send(results);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`)
    }

};

// 4. Update one single attendance
const updateOneAttendance = async (req, res) => {

    const id = req.params.id;

    let updatedDetails = {
        attendance_date: req.body.attendance_date,
        attendance_mark_in_time: req.body.attendance_mark_in_time,
        attendance_mark_out_time: req.body.attendance_mark_out_time,
        attendance_type: req.body.attendance_type,
        attendance_break_time: req.body.attendance_break_time,
        EmployeeId: req.body.EmployeeId
    };

    try{
        let updateStatus = await Attendance.update(updatedDetails, {
            where: {
                id: id,
            },
            include: [Employee]
        });

        if(updateStatus){
            try{
                let oneAttendance = await Attendance.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['attendance_date'],
                    include: {
                        model: Employee,
                        attributes: ['employee_name', 'employee_email_id', 'employee_user_id', 'employee_contact_no']
                    }
                });
                res.status(200).send(oneAttendance);
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
const deleteOneAttendance = async (req, res) => {

    const id = req.params.id;

    try{
        let deleteStatus = await Attendance.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Attendance Deleted')
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
    addNewAttendance,
    getAllAttendance,
    getOneAttendance,
    updateOneAttendance,
    deleteOneAttendance
}

/*
[
    "attendance_date": 2022-05-13,
    "Employees": [
        {

        }
        {

        }
        {
            
        }
    ]
]

*/