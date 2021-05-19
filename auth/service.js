const util = require('../common/util');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } = require('../common/appConfig');
const jwt = require('jsonwebtoken');
const dao = require('./dao');
const bcrypt = require('bcrypt');
const uuid = require('uuidv4');

async function userRegistration(reqData, callback) {
    const promise1 = new Promise((resolve) => resolve(dao.checkIfEmployeeIdExists(reqData.employee_id)));
    const promise2 = new Promise((resolve) => resolve(dao.checkIfEmailExists(reqData.email)));
    const res = await Promise.all([promise1, promise2]);

    if (res[0].rows > 0 && res[1].rows > 0) return callback(util.successResponse('Email and Employee Id already exists'));
    if (res[0].rows > 0) return callback(util.successResponse('Employee Id already exists'));
    if (res[1].rows > 0) return callback(util.successResponse('Email already exists'));

    const hash = await bcrypt.hash(reqData.password, 10);
    reqData.password = hash;

    reqData.user_id = uuid();

    await dao.addUserDetails(reqData);
    await dao.addEmployeeDetails(reqData);

    callback(util.successResponse('User registered successfully'));
}

async function userLogin(reqData, callback) {
    const userCredentials = await dao.getUserCeredentials(reqData.email);
    if (userCredentials.rows == 0) return callback(util.successResponse({ msg: 'User doesnot exists' }));

    const match = await bcrypt.compare(reqData.password, userCredentials.rows[0].password);
    if (!match) return callback(util.successResponse({ msg: 'User credentials incorrect' }));

    const payload = { email: reqData.email };
    const token = await generateAuthToken(payload);

    callback(util.successResponse({ token, msg: 'User logged in successfully' }));
}

async function generateAuthToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: ACCESS_TOKEN_LIFE
    });
    return accessToken;
}

async function verifyAuthToken(token, callback) {
    try {
        callback(null, jwt.verify(token, ACCESS_TOKEN_SECRET));
    } catch (err) {
        console.error(new Date(), 'Invalid token! - ', token);
        return {};
    }
}

module.exports = {
    userRegistration,
    userLogin,
    verifyAuthToken
}