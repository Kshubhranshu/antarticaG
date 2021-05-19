let express = require('express'),
    router = express.Router(),
    service = require('./service');
    
router.post('/search-user-list', (req, res, next) => {
    service.searchUserList(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in searchUserList, with reqData - ', req.body, err);
        return next(err);
    });
});

module.exports = router;