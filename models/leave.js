// This is 'leave.js' - A File describing the Leave Model and its attributes

module.exports = (sequelize, DataTypes) => {

    // Leave Model 
    const Leave = sequelize.define("Leave", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        leave_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        leave_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        leave_type: {
            type: DataTypes.BOOLEAN,    // 0 -> Leave, 1 -> Weekend Work Approval
            allowNull: false
        },

        leave_status: {
            type: DataTypes.INTEGER,    // 0 -> Pending, 1 -> Approved, 2 -> Rejected
            defaultValue: 0
        }

    });

    // Leave Associations
    Leave.associate = (models) => {

        // Many to One Association between Leave and Employee (N Leaves -> 1 Employee)
        Leave.belongsTo(models.Employee);    // foreignKey: EmployeeId        
    };

    return Leave;
}