// import jwt from 'jsonwebtoken';
// import config from '../config';

// // const aes256 = require('aes256');
// // let logApiCalls = require('./logApiCalls');
// class checkToken {
//     constructor (){
//         return {
//         verificationJwtVerify : this.verificationJwtVerify.bind(this),
//         jwtVerifyForAdmin : this.jwtVerifyForAdmin.bind(this)
//     }
//     }

    
//     async jwtVerifyForAdmin(req, res, next) {
//         try {
//             const token = req.headers.authorization.split('Bearer ')[1];
           
//             jwt.verify(token, '_QNxOvsAiEWoMnSGuxs66uFDjIRiZSfdmQ', async (err, encoded) => {
//                 console.log(encoded, 'en', err, 'err')
                
//                 if (err) {
//                     return res.status(401).json({ success: false, type: 'Error', message: 'Invalid Token' });
//                 } else {
                 

//                     req.admin = {
//                         id: encoded.user_id,
//                         email: encoded.user_business_email,
                       
//                         user_fname : encoded.user_fname,
//                         user_lname : encoded.user_lname,
                       
//                     }
//                     next();
//                 }
//             });
//         } catch (e) {
           
//             return res.status(401).json({ success: false, type: 'Erroro', message: 'Invalid Token' });
//         }
//     };
//     async verificationJwtVerify(req, res, next) {
//         try {
//             jwt.verify(req.body.token, config.app.verificationSecret, async (err, decoded) => {
//                 if (err) {
//                     return res.status(400).json({ type: 'Error', message: 'Invalid or Link Expired' });
//                 } else {
//                     next();
//                 }
//             })
//         } catch (e) {
//             return res.status(400).json({ type: 'Error', message: 'Invalid or Link Expired' });
//         }
//     }

// }
// module.exports = checkToken;