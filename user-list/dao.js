const { db } = require('../common/dbConfig');

let searchUserList = (searchData) => {
    let params = [];
    let query = ' SELECT e.first_name, e.last_name, u.email, e.employee_id, e.organization_name '
        + ' FROM public.users u '
        + ' JOIN public.employees e '
        + ' ON u.user_id = e.user_id '
    if (searchData.query) {
        query += ' WHERE '
        if (searchData.query.first_name) {
            params.push('%' + searchData.query.first_name + '%');
            query += ` e.first_name ILIKE $${params.length} `
        }
        if (searchData.query.last_name) {
            if (params.length == 1) query += ' AND '
            params.push('%' + searchData.query.last_name + '%');
            query += ` e.last_name ILIKE $${params.length} `
        }
        if (searchData.query.employee_id) {
            if (params.length == 2) query += ' AND '
            params.push(searchData.query.employee_id);
            query += ` e.employee_id = $${params.length} `
        }

        if (searchData.query.sort) {
            if (searchData.query.sort == 'email')
                query += ' ORDER BY u.email '
        } else {
            query += ` ORDER BY e.${searchData.query.sort}`
        }

        if (searchData.query.limit) {
            query += ' LIMIT ' + searchData.query.limit
        }
        if (searchData.query.hasOwnProperty('offset')) {
            query += ' OFFSET ' + searchData.query.offset
        }
    }

    return db.query(query, params);
}

module.exports = {
    searchUserList
}