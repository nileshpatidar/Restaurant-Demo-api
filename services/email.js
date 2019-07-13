var nodemailer = require('nodemailer');
// var hbs = require('nodemailer-express-handlebars');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pandeygoh@gmail.com',
        pass: 'Nilu.@0886'
    }
});

var data = {
    generateVerification: function (cb) {
        return new Promise((resolve, reject) => {
            length = 6;
            var result = '';
            var characters = '0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            resolve(result);
        });
    },

    sendverificaionmail: function (to, subect, parameters, callback) {
        return new Promise((resolve, reject) => {
            //   transporter.use('compile',hbs({
            //     viewEngine: {
            //       extName: '.hbs',
            //       partialsDir: path,
            //       layoutsDir: path,
            //       defaultLayout: template_name+'.hbs',
            //     },
            //     viewPath:path,
            //     extName: '.hbs'
            //   }))
            var mailOptions = {
                from: 'pandeygoh@gmail.com',
                to: to,
                subject: subect,
                html: `Hello <b>${parameters.Username}</b> your verification code is <b>${parameters.verification_code}<b>`,
                // template: template_name,
                // context: parameters
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    resolve(error);
                } else {
                    resolve(info);
                }
            });
        })
    },
    //   ipdetails: function (ret, callback) {
    //     return new Promise((resolve, reject) => {
    //       request("https://api.ipapi.com/api/" + ret + "?access_key=6910b3ac8efdbe59198800806a38e5b7", function (error, response, body) {
    //         resolve(response.body);
    //       });
    //     })
    //   },

}

module.exports = data;