const authRouter = require('./auth');
const messagesRouter = require('./messages');
const userRouter = require('./user');
function routes(app){
    app.use('/api/auth', authRouter);
    app.use('/api/messages',messagesRouter)
    app.use('/api/user', userRouter)
    app.use('/', (req, res) => res.json({mssg: 'Home'}))
}

module.exports = routes;