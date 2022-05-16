// This is 'role.js' - A File describing the Role Model and its attributes

module.exports = (sequelize, DataTypes) => {
    
    // Role Model
    const Role = sequelize.define("Role", {
        
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        employee_role_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_role_description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        employee_role_isAdmin: {
            type: DataTypes.BOOLEAN,    // 0 -> Not Admin,  1 -> Admin
            defaultValue: 0
        }

    });

    // Role Associations
    Role.associate = (models) => {

        // One to Many Association between Role and Employee (1 Role -> N Employees)
        Role.hasMany(models.Employee, {
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    };

    return Role;
}