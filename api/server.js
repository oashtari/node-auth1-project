const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('../users/users-router')
const authRouter = require('../auth/router')
const restricted = require('../auth/restricted-middleware')

const server = express();

const sessionConfig = {
    name: "gunner",
    secret: "puppy secrete",
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use('/api/users', restricted, userRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.json({ api: "UP" })
})

module.exports = server;