const UserModel = require('../db/model/UserModel')
module.exports = async (req, res, next) => {
    try {
        if (req.headers.key && req.headers.id) {
            const auth = await UserModel.findOne({ secretKey: req.headers.key, _id: req.headers.id })
            if (!auth) {
                console.error(`UnAuthorized access in ${req.route.path}`)
                return res.status(401).send({
                    status: false,
                    error: 'Unauthorized access key'
                })
            }
            req.isAuth = req.headers.id
            return next()
        } else {
            console.error(`UnAuthorized access in ${req.route.path}`)
            return res.status(401).send({
                status: false,
                error: 'Unauthorized access key '
            })
        }
    } catch (error) {
        return res.status(401).send({
            status: false,
            error: 'authorization failed'
        })
    }
}