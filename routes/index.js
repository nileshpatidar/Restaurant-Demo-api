const router = require('express').Router()
const { register, login, verification, resendVerification, profileUpdate, forgetPassword, changePassword, getprofile, logout } = require('../controller/authentication')
// const { addResturant } = require('../controller/rest')

const checksecretMiddelware = require('./../middelware/checkauthtoken')
const { localupload } = require('./../middelware/imageuploads/imageupload')

router.route('/register')
    .post(register)
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/login')
    .post(login)
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/checkverification')
    .post(verification)
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/resendverificationcode')
    .post(resendVerification)
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/profileupdate')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(localupload.single('image'), profileUpdate)

router.route('/forgetpassword')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalidrequest' }) })
    .post(forgetPassword)

router.route('/changepasswordreset')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(changePassword)

// router.route('/change_password')
//     .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
//     .post(authMiddelware, change_password)

router.route('/getuserprofile')
    .get(checksecretMiddelware, getprofile)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })


router.route('/logout')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .delete(logout)

//rest

// router.route('/addrest')
//     .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
//     .post(checksecretMiddelware, addResturant)










module.exports = router