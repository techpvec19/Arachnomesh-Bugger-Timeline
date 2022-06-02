// This is 'app.js' - The Main File of Arachnomesh Bugger Timeline

// Importing Requirements
const express = require('express');
const app = express();
const db = require('./models');
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Routers

// 1. Employee Routes
const employeeRoleRoutes = require('./routes/role-routes')
app.use('/api/arachnomesh/employeeRoles', employeeRoleRoutes);

// 2. Role Routes
const employeeRoutes = require('./routes/employee-routes')
app.use('/api/arachnomesh/employees', employeeRoutes);

// 3. Attendance Routes
const attendanceRoutes = require('./routes/attendance-routes');
app.use('/api/arachnomesh/attendance', attendanceRoutes);

// 4. Break Routes
const breakRoutes = require('./routes/break-routes');
app.use('/api/arachnomesh/breaks/', breakRoutes)

// 5. Leave Routes
const leaveRoutes = require('./routes/leave-routes');
app.use('/api/arachnomesh/leaves/', leaveRoutes)

// 6. Project Routes 
const projectRoutes = require('./routes/project-routes');
app.use('/api/arachnomesh/projects/', projectRoutes);

// 7. Assignment Routes
const assignmentRoutes = require('./routes/assignment-routes');
app.use('/api/arachnomesh/assignments/', assignmentRoutes);

// 8. Task Routes
const taskRoutes = require('./routes/task-routes');
app.use('/api/arachnomesh/tasks/', taskRoutes);

// 9. Sub Task Routes
const subTaskRoutes = require('./routes/subTask-routes');
app.use('/api/arachnomesh/subTasks/', subTaskRoutes);

// 10. Employee Project Relationship Routes
const employeeProjectRelationshipRoutes = require('./routes/employee-project-routes');
app.use('/api/arachnomesh/employeeProjectRelationships/', employeeProjectRelationshipRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Syncing the Database and Running the Application
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`App Listening at http://localhost:${port}`);
    });
});