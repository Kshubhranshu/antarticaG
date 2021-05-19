const util = require('../common/util');

function validateDto(schema) {
    return async (req, res, next) => {
        try {
            const options = {
                abortEarly: false
            }
            await schema.validate(req.body, options);
            next();
        } catch (error) {
            res.status(util.statusCode.FOUR_ZERO_ZERO).json(error.errors);
        }
    }
}

module.exports = {
    validateDto
}