const formatResponse = (success, response, errMsg) => {
    let res = { success: success };
    success ? res.data = response : res.errorMessage = errMsg;
    return res;
}

const successResponse = (data) => {
    return formatResponse(true, data, null);
}

const errorResponse = (msg) => {
    return formatResponse(false, {}, msg);
}

const statusCode = {
    OK: 200,
    FOUR_ZERO_FOUR: 404,
    FOUR_ZERO_ONE: 401,
    FIVE_ZERO_ZER0: 500,
    FOUR_ZERO_ZERO: 400
};

module.exports = {
    successResponse,
    errorResponse,
    statusCode
}