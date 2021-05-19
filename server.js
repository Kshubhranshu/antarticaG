let app = require('express')(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    noAuthRoutes = require('./routesWithoutAuth'),
    routes = require('./routes'),
    config = require('./common/appConfig'),
    util = require('./common/util'),
    authService = require('./auth/service'),
    _ = require('lodash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
    if (_.isEmpty(req.body)) {
        return res.status(util.statusCode.FOUR_ZERO_ZERO)
            .send({ "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": 'Bad Request' });
    }
    next();
});

const tokenChecker = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.sendStatus(util.statusCode.FOUR_ZERO_ONE);
        return;
    }

    authService.verifyAuthToken(token, (err, authData) => {
        if (err) {
            console.error(new Date(), 'Error in verifyToken -', authData);
            res.sendStatus(util.statusCode.FOUR_ZERO_ONE);
            return;
        }
        req.body['username'] = authData['username'];
        next();
    })
}

app.use('/api/v1', noAuthRoutes);

app.use('/api/v1', tokenChecker, routes);

app.use((req, res, next) => {
    return res.status(util.statusCode.FOUR_ZERO_FOUR)
        .send({ "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": 'Not Found' });
});

app.use(function (err, req, res, next) {
    return res.status(util.statusCode.FIVE_ZERO_ZER0)
        .send({ "statusCode": util.statusCode.FIVE_ZERO_ZER0, "statusMessage": 'Internal Server Error' });
});

const PORT = config.APP_PORT;

app.listen(PORT, () => {
    console.log((new Date).toUTCString() + ' App listening on port: ' + PORT);
});
