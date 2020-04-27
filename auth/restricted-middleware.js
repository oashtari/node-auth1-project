const bcrypt = require('bcryptjs') // SEE IF THIS IS NECESSARY, OR JUST BAD NOTES

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ message: 'get lost, access denied' })
    }
}