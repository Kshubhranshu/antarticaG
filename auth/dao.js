const { db } = require('../common/dbConfig');

const addUserDetails = ({ user_id, email, password }) => {
    const query = ' INSERT INTO public.users (user_id, email, password) values($1, $2, $3) ';
    return db.query(query, [user_id, email, password]);
}

const addEmployeeDetails = ({ first_name, last_name, employee_id, organization_name }) => {
    const query = ' INSERT INTO public.employees (first_name, last_name, employee_id, organization_name) values($1, $2, $3, $4) ';
    return db.query(query, [first_name, last_name, employee_id, organization_name]);
}

const checkIfEmployeeIdExists = (employeeId) => {
    const query = ' SELECT employee_id from public.employees WHERE employee_id = $1 ';
    return db.query(query, [employeeId]);
}

const checkIfEmailExists = (email) => {
    const query = ' SELECT email FROM public.users WHERE email = $1 ';
    return db.query(query, [email]);
}

const getUserCeredentials = (email) => {
    const query = ' SELECT email, password FROM public.users WHERE email = $1 ';
    return db.query(query, [email]);
}

module.exports = {
    addUserDetails,
    addEmployeeDetails,
    checkIfEmployeeIdExists,
    checkIfEmailExists,
    getUserCeredentials
}