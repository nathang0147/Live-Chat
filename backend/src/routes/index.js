const authRouter = require('./auth');
const messagesRouter = require('./messages');
function routes(app){
    app.use('/api/auth', authRouter);
    app.use('/api/messages',messagesRouter)
    app.use('/', (req, res) => res.json({mssg: 'Home'}))
}

module.exports = routes;