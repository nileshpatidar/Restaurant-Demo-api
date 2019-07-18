// const userModel = require('../db/models/member')
const validation = require('../services/loginvalidation')
const mailer = require('../services/email')
const UserModel = require('../db/model/UserModel')
const dateFormat = require('dateformat');
const crudController = require('./commonfunction/crud')
const multer = require('multer')
var Joi = require('joi');
var md5 = require('md5');


const register = (req, res) => {
    var valid = { email: req.body.email, ContactNo: req.body.ContactNo, Name: req.body.Name, role: req.body.role, password: req.body.password }
    valid = Joi.validate(valid, validation.register)
    if (valid.error) {
        return res.status(422).send({ status: false, error: valid.error.details })
    }
    crudController.getBy(UserModel, { email: req.body.email, role: req.body.role })
        .then(async (resData) => {
            if (resData) {
                return res.status(401).send({ status: false, error: 'Already have account' })
            } else {
                var code = await mailer.generateVerification();
                req.body.verification_code = code
                var member = new UserModel(req.body);
                member.save()
                    .then(userData => {
                        var param = { verification_code: code, Username: `${member.Name}` };
                        mailer.sendverificaionmail(userData.email, `Your ${userData.role} Account Verification code`, param);
                        let result = {
                            id: userData._id, email: userData.email, type: userData.role, Name: userData.Name
                        }
                        return res.status(200).send({ status: true, data: result })
                    })
                    .catch(error => {
                        return res.status(500).send({ status: false, error: error })
                    });
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).send({ status: false, error: err })
        })
}

const verification = async (req, res) => {
    try {
        var valid = {
            email: req.body.email,
            verification_code: req.body.verification_code,
            role: req.body.role
        }
        valid = Joi.validate(valid, validation.verification)
        if (valid.error) {
            console.error(valid.error)
            return res.status(422).send({ status: false, error: valid.error.details })
        }
        var query = { email: req.body.email, role: req.body.role }
        const ifFound = await UserModel.findOne(query)
        if (!ifFound) {
            return res.status(404).send({ status: false, message: `Account with mail-id ${req.body.email} is not found` })
        }
        if (req.body.verification_code != ifFound.verification_code) {
            return res.status(422).send({ status: false, message: `verification code is not valid` })
        }
        var updateMember = await UserModel.findByIdAndUpdate(ifFound._id, { $set: { isVerified: true, verification_code: null } }, { new: true })
        if (!updateMember) {
            return res.status(500).send({
                status: false,
                message: `something went wrong while verifing user`
            })
        }
        res.status(200).send({
            status: true,
            message: `User verified with ${req.body.email}`,
            userid: updateMember._id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            error: error
        })
    }
}

const login = (req, res) => {
    var valid = { email: req.body.email, password: req.body.password, role: req.body.role }
    valid = Joi.validate(valid, validation.login)
    if (valid.error) {
        return res.status(422).send({ status: false, error: valid.error.details })
    }
    crudController.getBy(UserModel, { email: req.body.email, role: req.body.role })
        .then(async (userData) => {

            if (!userData.isVerified) {
                var param = { verification_code: userData.verification_code, Username: `${userData.Name}` };
                mailer.sendverificaionmail(userData.email, `Your ${userData.role} Account Verification code`, param);
                let result = {
                    id: userData._id, email: userData.email, type: userData.role, Name: userData.Name
                }
                return res.status(403).send({ status: true, error: "Please verify Your account check mail" })
            }
            if (userData.password === md5(req.body.password)) {
                const date = new Date();
                const timestamp = date.getTime();
                const secretKey = md5(userData.id + timestamp);
                var upda = await crudController.updateData(UserModel, { email: req.body.email, role: req.body.role }, { $set: { secretKey } });
                if (secretKey) {
                    let result = {
                        _id: userData._id,
                        Name: userData.Name,
                        role: userData.role,
                        email: userData.email,
                        ContactNo: userData.ContactNo,
                        key: upda.secretKey
                    }
                    return res.status(200).send({ status: true, result: result })
                } else {
                    return res.status(400).send({ status: false, error: 'please try again' })
                }

            } else {
                return res.status(500).send({ status: false, error: 'Invalid email or Passard' })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send({ status: false, error: error })
        });
}

const resendVerification = async (req, res) => {
    try {
        var valid = { email: req.body.email, role: req.body.role }
        valid = Joi.validate(valid, validation.resend_verification)
        if (valid.error) {
            return res.status(422).send({ status: false, error: valid.error.details })
        }
        var userFound = await UserModel.findOne({ email: req.body.email, role: req.body.role })
        if (!userFound) {
            return res.status(404).send({ status: false, message: `Account with mail-id ${req.body.email} is not found` })
        }
        var code = await mailer.generateVerification();
        crudController.updateDataByid(UserModel, userFound._id, { $set: { verification_code: code } }).then((userFound) => {
            res.send({ status: true, message: `verification code sended to associated mail-id` })
        }).catch(err => {
            res.status(500).send({ status: false, error: err, message: 'Soemthing went wrong while generating code' })
        })
        // userFound = await UserModel.findByIdAndUpdate(userFound._id, { $set: { verification_code: code } }, { new: true })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: false, error: error })
    }
}

const profileUpdate = async (req, res) => {
    try {
        let data = JSON.parse(req.body.data)
        if (req.file.location) {
            data.profile_image = req.file.location
        } else if (req.file.path) {
            data.profile_image = req.file.path
        }
        let updatedData = await UserModel.updateOne({ _id: data.id }, { $set: { data } }, { upsert: false, new: true })
        if (!updatedData) {
            res.status(500).send({
                status: false,
                error: 'Details update failed'
            })
        }
        res.send({ status: true, message: 'profile details updated' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: false, error: { ...error } })
    }
}

const forgetPassword = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).send({ message: 'Email-ID required' })
        }
        if (!req.body.role) {
            return res.status(400).send({ message: 'Email-ID Not match With Login Role' })
        }
        let Ifuser = await UserModel.findOne({ email: req.body.email, role: req.body.role }).select({ password: false, ContactNo: false })
        if (!Ifuser) {
            return res.status(404).send({ message: 'Email-ID not found' })
        }
        var v_code = await mailer.generateVerification();
        Ifuser = await crudController.updateDataByid(UserModel, Ifuser._id, { $set: { verification_code: v_code } })
        var param = { verification_code: Ifuser.verification_code, Username: `${Ifuser.Name}` };

        mailer.sendverificaionmail(Ifuser.email, Ifuser.role + ' Account Verification Code', param)
        return res.send({ status: true, message: `Code sended to associated mail-id`, id: Ifuser._id });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: { ...error } })
    }
}
const changePassword = async (req, res) => {
    try {
        if (!req.body.password || !req.body.userid) {
            return res.status(400).send({
                message: 'password and userid is required'
            })
        }
        let updatepassword = await crudController.updateDataByid(UserModel, req.body.userid, { $set: { password: md5(req.body.password) } })
        if (!updatepassword) {
            return res.status(422).send({
                message: 'Something went wrong'
            })
        }
        res.send({ message: 'password Successfully chenged' })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            status: false,
            error: { ...error }
        })
    }
}

const getprofile = async (req, res) => {
    try {
        if (req.query._id) {
            delete req.query._id
        }
        var userProfile = await UserModel.findOne({ _id: req.isAuth }).select({ password: false, verification_code: false, isVerified: false, secretKey: false })
        if (!userProfile) {
            return res.status(404).send({
                status: false,
                message: `Profile Data not found`
            })
        }
        res.send({
            status: true,
            result: userProfile
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            error: error
        })
    }
}
const logout = async (req, res) => {
    try {
        if (req.headers.key && req.headers.id) {
            await crudController.updateData(UserModel, { secretKey: req.headers.key, _id: req.headers.id }, { $set: { secretKey: null } }).then(logut => {
                res.send({ message: 'logout' })
            }).catch(err => {
                return res.status(500).send({
                    status: false,
                    error: err
                })
            })

        } else {
            return res.status(401).send({
                status: false,
                error: 'Invalid arguments'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            error: { ...error }
        })
    }
}


module.exports = {
    register, verification, login, resendVerification, profileUpdate,
    forgetPassword, changePassword, getprofile, logout
}