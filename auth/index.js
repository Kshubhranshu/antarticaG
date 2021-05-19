let express = require('express'),
    router = express.Router(),
    service = require('./service'),
    models = require('../dto/models'),
    { validateDto } = require('../middleware/validate-dto');

router.post('/', (req, res) => {
    res.send('Hola! Welcome to antarcticaG server. :-)');
});

router.post('/register', validateDto(models.registerSchema), (req, res, next) => {
    service.userRegistration(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in authenticate, with reqData - ', req.body, err);
        return next(err);
    });
});

router.post('/login', validateDto(models.loginSchema), (req, res, next) => {
    service.userLogin(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in userLogin, with reqData - ', req.body, err);
        return next(err);
    });
});

module.exports = router;