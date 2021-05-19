const routes = require('express').Router();
const userList = require('./user-list');

routes.use('/user-list', userList);

module.exports = routes;