// This is 'subTask.js' - A File describing the SubTask Model and its attributes
module.exports = (sequelize, DataTypes) => {

    // SubTask Model 
    const SubTask = sequelize.define("SubTask", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        subTask_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        subTask_description: {
            type: DataTypes.STRING,
        },

        subTask_assigned_to: {
            type: DataTypes.STRING,
            allowNull: false
        },

        subTask_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        subTask_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        subTask_estimated_time: {
            type: DataTypes.STRING,
        },

        subTask_spent_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        subTask_progress: {
            types: DataTypes.INTEGER,   // The Progress is in Percentage
            defaultValue: 0
        },

        subTask_status: {
            type: DataTypes.BOOL,   // 0 -> Incomplete,     1 -> Complete
            defaultValue: 0
        },

    });

    // SubTask Associations
    SubTask.associate = (models) => {

        SubTask.belongsTo(models.Task);
        
    };

    return SubTask;
}