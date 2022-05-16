// This is 'project.js' - A File describing the Project Model and its attributes

module.exports = (sequelize, DataTypes) => {

    // Project Model 
    const Project = sequelize.define("Project", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        project_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        project_description: {
            type: DataTypes.STRING,
        },

        project_assigned_to: {
            type: DataTypes.STRING,
            allowNull: false
        },

        project_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        project_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        project_estimated_time: {
            type: DataTypes.STRING,
        },

        project_spent_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        project_progress: {
            types: DataTypes.INTEGER,       // The Progress is in Percentage
            defaultValue: 0
        },

        project_status: {
            type: DataTypes.BOOL,   // 0 -> Incomplete,     1 -> Complete
            defaultValue: 0
        },

    });

    // Project Associations
    Project.associate = (models) => {
        
        Project.hasMany(models.Assignment, {
            onDelete: "cascade",
            onUpdate: "cascade"
        });

    };

    return Project;
}