// This is 'assignment.js' - A File describing the Assignment Model and its attributes
module.exports = (sequelize, DataTypes) => {

    // Assignment Model 
    const Assignment = sequelize.define("Assignment", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        assignment_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        assignment_description: {
            type: DataTypes.STRING,
        },

        assignment_assigned_to: {
            type: DataTypes.STRING,
            allowNull: false
        },

        assignment_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        assignment_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        assignment_estimated_time: {
            type: DataTypes.STRING,
        },

        assignment_spent_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        assignment_progress: {
            types: DataTypes.INTEGER,   // The Progress is in Percentage
            defaultValue: 0
        },

        assignment_status: {
            type: DataTypes.BOOL,   // 0 -> Incomplete,     1 -> Complete
            defaultValue: 0
        },

    });

    // Assignment Associations
    Assignment.associate = (models) => {
        
        Assignment.hasMany(models.Task, {
            onDelete: "cascade",
            onUpdate: "cascade"
        });

        Assignment.belongsTo(models.Project);

    };

    return Assignment;
}