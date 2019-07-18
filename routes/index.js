const router = require('express').Router()
const { register, login, verification, resendVerification, profileUpdate, forgetPassword, changePassword, getprofile, logout } = require('../controller/authentication')
const { addResturant, getRestorant, getRestorantWithCity, addProducts, getAllProductsOfResturant, AllProductsForUser } = require('../controller/rest')
const { placeorder, UpdateOrderStatus, MyOrderList, UserOrdersList } = require('../controller/order')

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

//resturant

router.route('/addrest')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(checksecretMiddelware, localupload.single('image'), addResturant)

router.route('/getrestorant')
    .get(checksecretMiddelware, getRestorant)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/getRestorantWithCity')
    .get(checksecretMiddelware, getRestorantWithCity)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/addProducts')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(checksecretMiddelware, localupload.single('image'), addProducts)

router.route('/getallproductswithresturant/:id')
    .get(checksecretMiddelware, getAllProductsOfResturant)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

//************Order********** */
router.route('/placeorder')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(checksecretMiddelware, placeorder)

// start for owner and deliveryboy
router.route('/updateorderstatus')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(checksecretMiddelware, UpdateOrderStatus)
//end for owner and deliveryboy

router.route('/getmyorderforresturant/:id')
    .get(checksecretMiddelware, MyOrderList)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

///*********users******************* */
router.route('/placeorder')
    .get((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })
    .post(checksecretMiddelware, placeorder)

router.route('/allproductsforuser')
    .get(checksecretMiddelware, AllProductsForUser)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })

router.route('/getUserOrdersList')
    .get(checksecretMiddelware, UserOrdersList)
    .post((req, res) => { res.status(400).send({ status: false, message: 'invalid request' }) })


module.exports = router