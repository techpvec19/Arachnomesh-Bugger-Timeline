// This is 'employee-project.js' - A File describing the employee-project Model and its attributes
module.exports = (sequelize, DataTypes) => {

    // EmployeeProject Module
    const EmployeeProject = sequelize.define("EmployeeProject", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        }

    });

    return EmployeeProject;
}