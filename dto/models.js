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



module.exports = {
    registerSchema,
    loginSchema
}
