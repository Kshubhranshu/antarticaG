let express = require('express'),
    router = express.Router(),
    service = require('./service'),
    { validateDto } = require('../middleware/validate-dto'),
    { searchUserListSchema } = require('../dto/models');
    
router.post('/search-user-list', validateDto(searchUserListSchema), (req, res, next) => {
    service.searchUserList(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in searchUserList, with reqData - ', req.body, err);
        return next(err);
    });
});

module.exports = router;