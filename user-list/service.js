const util = require('../common/util');
const dao = require('./dao');
const _ = require('lodash');

async function searchUserList(reqData, callback) {
    const res = await dao.searchUserList(reqData);
    const searchResult = res.rows;
    if (searchResult.length < 1) {
        return callback(util.successResponse('No search result found'));
    }
    callback(util.successResponse(searchResult));
}

module.exports = {
    searchUserList
}