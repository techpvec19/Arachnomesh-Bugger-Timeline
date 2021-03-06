// This is 'employee.js' - A File describing the Employee Model and its attributes

module.exports = (sequelize, DataTypes) => {

    // Employee Model 
    const Employee = sequelize.define("Employee", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        employee_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_email_id: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_user_id: {
            type: DataTypes.INTEGER
        },

        employee_profile_icon: {
            type: DataTypes.STRING
        },

        employee_contact_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        employee_date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        employee_joining_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        employee_status: {
            type: DataTypes.BOOLEAN,    //  0 -> Not Active,    1 -> Active
        },

    });

    // Employee Associations
    Employee.associate = (models) => {

        // Many to One Association between Employee and Role (N Employees -> 1 Role)
        Employee.belongsTo(models.Role);    // foreignKey: RoleId

        // One to Many Association between Employee and Attendance (1 Employee -> N Attendances)
        Employee.hasMany(models.Attendance, {
            onDelete: "cascade",
            onUpdate: "cascade",
        });

        // One to Many Association between Employee and Leave (1 Employee -> N Leaves)
        Employee.hasMany(models.Leave, {
            onDelete: "cascade",
            onUpdate: "cascade",
        });

        // Many to Many Association between Employee and Project (N Employee -> N Project)
        Employee.belongsToMany(models.Project, {
            through: models.EmployeeProject
        });

        // Employee.hasMany(models.Activity, {
        //     onDelete: "cascade",
        //     onUpdate: "cascade",
        // });
        
    };

    return Employee;
}