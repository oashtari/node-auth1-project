const bcrypt = require('bcryptjs')

const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/register', (req, res) => {

    const userInfo = req.body;
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

    userInfo.password = hash;

    Users.add(userInfo)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.send(err))
})

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    username: user.username
                }
                res.status(200).json({ howdy: user.username })
            } else {
                res.status(401).json({ message: 'bad credentials' })
            }
        })
        .catch(err => res.status(500).json({ message: 'could not find user' }))
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ message: 'do not leave, beucase you cannot' })
            } else {
                res.status(200).json({ message: 'succesfully logged out' })
            }
        })
    } else {
        res.status(200).json({ message: 'we do not know who you are' })
    }
})

module.exports = router;