const authRouter = require('./auth');
function routes(app){
    app.use('/api/auth', authRouter);
    app.use('/', (req, res) => res.json({mssg: 'Home'}))
}

module.exports = routes;