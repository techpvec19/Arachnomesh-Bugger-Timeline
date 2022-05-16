// This is 'break-controller.js' - A File containing all the controllers for Break entity

// Importing Requirements
const Relations = require('../models');

// Accessing Relations
const Attendance = Relations.Attendance;
const Break = Relations.Break;

// Helper Function to calculate the difference between two times in minutes
function calcTimeInMins(breakInTime, breakOutTime){
    
    let startTime = new Date();
    let endTime = new Date();

    let startValue = breakInTime.split(":");
    let endValue = breakOutTime.split(":");

    startTime.setHours(startValue[0], startValue[1], startValue[2], 0)
    endTime.setHours(endValue[0], endValue[1], endValue[2], 0)

    return (endTime - startTime)/60000;

}

// 1. Add a new attendance
const addNewBreak = async (req, res) => {
    
    var newBreakDetails = {
        break_in_time: req.body.break_in_time,
        break_out_time: req.body.break_out_time,
        AttendanceId: req.body.AttendanceId
    };

    let breakInTime = newBreakDetails.break_in_time;
    let breakOutTime = newBreakDetails.break_out_time;

    let newBreakTime = calcTimeInMins(breakInTime, breakOutTime);
    console.log(`Break Time taken by Employee: ${newBreakTime}`)

    let attendanceRecordToBeUpdated = await Attendance.findOne({
        where: {
            id: newBreakDetails.AttendanceId
        }
    });
    console.log(attendanceRecordToBeUpdated)

    let breakTimeTillNow = attendanceRecordToBeUpdated["attendance_break_time"]
    console.log(breakTimeTillNow)

    let updatedAttendanceRecordDetails = await Attendance.update({
        attendance_break_time: breakTimeTillNow + newBreakTime
    }, {
        where: {
            id: newBreakDetails.AttendanceId
        }
    });
    console.log(`Break Time for AttendanceId: ${newBreakDetails.AttendanceId} Updated`);

    try{
        const newBreak = await Break.create(newBreakDetails);
        res.status(200).send(newBreak);
    }
    catch(err){
        res.status(404).send(`Error: ${err}`);
    }
};

// 2. Update one single break
const updateOneBreak = async (req, res) => {

    const id = req.params.id;

    let currentBreakRecordDetails = await Break.findOne({
        where: {
            id: id
        }
    })

    let previousBreakInTime = currentBreakRecordDetails["break_in_time"];
    let previousBreakOutTime = currentBreakRecordDetails["break_out_time"];

    let previousBreakTime = calcTimeInMins(previousBreakInTime, previousBreakOutTime);
    console.log(previousBreakTime)

    let updatedDetails = {
        break_in_time: req.body.break_in_time,
        break_out_time: req.body.break_out_time,
        AttendanceId: req.body.AttendanceId
    };

    try{
        let updateStatus = await Break.update(updatedDetails, {
            where: {
                id: id,
            },
            include: [Attendance]
        });

        if(updateStatus[0]){

            let updatedBreakInTime = updatedDetails.break_in_time;
            let updatedBreakOutTime = updatedDetails.break_out_time;

            let updatedBreakTime = calcTimeInMins(updatedBreakInTime, updatedBreakOutTime);
            console.log(`Updated Break Time taken by Employee: ${updatedBreakTime}`)

            let attendanceRecordToBeUpdated = await Attendance.findOne({
                where: {
                    id: updatedDetails.AttendanceId
                }
            });
            console.log(attendanceRecordToBeUpdated)

            let breakTimeTillNow = attendanceRecordToBeUpdated["attendance_break_time"]
            let updatedBreakTimeTillNow = breakTimeTillNow - previousBreakTime
            console.log(updatedBreakTimeTillNow)

            let updatedAttendanceRecordDetails = await Attendance.update({
                attendance_break_time: updatedBreakTimeTillNow + updatedBreakTime
            }, {
                where: {
                    id: updatedDetails.AttendanceId
                }
            });
            console.log(`Break Time for AttendanceId: ${updatedDetails.AttendanceId} Re-Updated`);

            try{
                let oneAttendance = await Break.findOne({
                    where: {
                        id: id
                    },
                    include: [Attendance]
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

// 3. Delete one break
const deleteOneBreak = async (req, res) => {

    const id = req.params.id;

    let currentBreakRecordDetails = await Break.findOne({
        where: {
            id: id
        }
    })

    let currentBreakInTime = currentBreakRecordDetails["break_in_time"];
    let currentBreakOutTime = currentBreakRecordDetails["break_out_time"];
    let currentBreakTime = calcTimeInMins(currentBreakInTime, currentBreakOutTime);
    console.log(currentBreakTime)

    let AttendanceId = currentBreakRecordDetails["AttendanceId"]
    let currentAttendanceRecordDetails = await Attendance.findOne({
        where: {
            id: AttendanceId
        }
    });
    let breakTime = currentAttendanceRecordDetails["attendance_break_time"]

    let updatedAttendanceRecordDetails = await Attendance.update({
        attendance_break_time: breakTime - currentBreakTime
    }, {
        where: {
            id: AttendanceId
        }
    });
    console.log(`Break Time for AttendanceId: ${AttendanceId} Re-Updated`);

    try{
        let deleteStatus = await Break.destroy({
            where: {
                id: id
            }
        });

        if(deleteStatus){
            res.status(200).send('Break Deleted')
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
    addNewBreak,
    updateOneBreak,
    deleteOneBreak
}