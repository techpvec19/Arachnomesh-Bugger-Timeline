// This is 'task.js' - A File describing the Task Model and its attributes
module.exports = (sequelize, DataTypes) => {

    // Task Model 
    const Task = sequelize.define("Task", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        task_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        task_description: {
            type: DataTypes.STRING,
        },

        task_assigned_to: {
            type: DataTypes.STRING,
            allowNull: false
        },

        task_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        task_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        task_estimated_time: {
            type: DataTypes.STRING,
        },

        task_spent_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        task_progress: {
            type: DataTypes.INTEGER,   // The Progress is in Percentage
            defaultValue: 0
        },

        task_status: {
            type: DataTypes.BOOLEAN,   // 0 -> Incomplete,     1 -> Complete
            defaultValue: 0
        },

    });

    // Task Associations
    Task.associate = (models) => {
        
        Task.hasMany(models.SubTask, {
            onDelete: "cascade",
            onUpdate: "cascade"
        });

        Task.belongsTo(models.Assignment);

    };

    return Task;
}