const yup = require('yup');

const registerSchema = yup.object().shape(
    {
        first_name: yup.string().trim().required(),
        last_name: yup.string().trim().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
        employee_id: yup.number().required(),
        organization_name: yup.string().trim().required()
    });

const loginSchema = yup.object().shape({
    email: yup.string().trim().required().email(),
    password: yup.string().required()
});

const searchUserListSchema = yup.object().shape({
    query: yup.object({
        first_name: yup.string().trim().min(1),
        last_name: yup.string().trim().min(1),
        employee_id: yup.number().positive(),
        sort: yup.string().matches(/(first_name|last_name|email|employee_id|organization_name)/),
        offset: yup.number().min(0),
        limit: yup.number().positive()
    })
});

module.exports = {
    registerSchema,
    loginSchema,
    searchUserListSchema
}
