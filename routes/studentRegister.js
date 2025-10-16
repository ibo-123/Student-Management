const express = require('express');
const newStudentregisteration = require('../controllers/studentsRegisterController');
const routers = express.Router();


routers.post('/', newStudentregisteration);
module.exports = routers;