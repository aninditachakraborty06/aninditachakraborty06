const Axios = require('axios');
// const config = require('../../config/const_credentials');
import knex from '../../db/index';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, cognitoUserDetails, AdminGetUser } from 'amazon-cognito-identity-js';
import { CognitoIdentityProviderClient, AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
let AWS = require("aws-sdk");
import config from '../../config';


const jwt = require("jsonwebtoken");

module.exports = class auth {

    constructor() {
        return {
            loginUsers: this.loginUsers.bind(this),
            createToken: this.createToken.bind(this),
            signIn: this.signIn.bind(this),
            forgetPassword: this.forgetPassword.bind(this), 
            confirmPassword : this.confirmPassword.bind(this)
        }
    }
    async loginUsers({ email, contact_modile }) {
        try {

            let whereObj = {};
            if (email) {
                whereObj.business_email = email;
            }
            if (contact_modile) {
                whereObj.contact_mobile = contact_modile;
            }

            const user = await knex("user_credentials")
                .first(
                    "user_id",
                    "uuid",
                    "business_email",
                    "password",

                    "user_fname",
                    "user_lname",

                    "is_deleted"
                )
                .where(whereObj);
            console.log(user)
            if (!user) {
                throw {

                    code: 400,
                    message: `Invalid Credentials`,
                };
            }

            if (user.is_deleted == 1) {
                throw {

                    code: 401,
                    message: `Your account has suspended now.`,
                };
            }
            if (user) {
                return user
            }
        } catch (error) {
            throw error;
        }
    }

    async createToken(user) {
        try {


            const jwtKey = "my_secret_key"
            const jwtExpirySeconds = 300
            const token = jwt.sign({ user }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            // console.log("token:", token)

            return token;

        } catch (error) {
            throw error;
        }

    }

    // authenticate user using user pool or cognito 
    async signIn(req) {
        try {

            // AWS.config = new AWS.Config();
            // // console.log (AWS.config,'confir')
            // AWS.config.update({
            //     region: 'ap-southeast-2',
            //     apiVersion: 'latest',
            //     // endpoint: "http://localhost:1010",

            //     credentials: {
            //       accessKeyId: 'ASIATBPKAA432ZJKHHWF',
            //       secretAccessKey: 'rM4TuWmbRsPP2Feca/YIi0pBCm7Xk63QKx9aliVg'
            //     }
            //   })
            // AWS.config.getCredentials(function(err) {
            //     if (err) console.log(err.stack);
            //     // credentials not loaded
            //     else {
            //       console.log("Access key:", AWS.config.credentials.accessKeyId);
            //     }
            // });


            let email = req.body.email;
            let password = req.body.password;
            var authenticationData = {
                Username: email, // your username here
                Password: password, // your password here,

            };


            var authenticationDetails = new AuthenticationDetails(authenticationData);


            // console.log(config.userpool)
            var userData = {
                Username: req.body.email, // your username here
                Pool: config.userpool
            };
            var cognitoUser = new CognitoUser(userData);
            var getUser =
            {
                //     Username : req.body.email,
                UserPoolId: 'ap-southeast-2_k3JnookNk',
                AttributesToGet: ["email", "email_verified"]
            };

            // const cognitoidentityserviceprovider =  new AWS.CognitoIdentityServiceProvider();
            // // console.log (cognitoidentityserviceprovider.adminGetUser({
            // //     Username : 'anindita.c',
            // //     UserPoolId : 'ap-southeast-2_k3JnookNk',
            // // } ), 'cognitoidentityserviceprovider')
            // cognitoidentityserviceprovider.adminGetUser({
            //     Username: 'anindita.c',
            //     UserPoolId: 'ap-southeast-2_k3JnookNk'
            // }, (err, data) => {
            //     if (err) {
            //         console.log(err, err.stack, 'cognito');
            //         // here is the error return
            //     } else {
            //         console.log(data);
            //         // here is the success return
            //     }
            // });

            // cognitoidentityserviceprovider.listUsers(getUser, (err, data) => {
            //     if (err) {
            //       console.log(err, err.stack);
            //             // here is the error return
            //     } else {
            //       console.log(data);
            //      // here is the success return
            //     }
            //   });

            // // console.log (getUser);
            // let client = new AWS.CognitoIdentityServiceProvider();
            // // console.log(client)
            // // var getUserAuth = new client.adminGetUser (getUser);
            // // console.log (getUserAuth)
            // // const clo = new CognitoIdentityProviderClient({ region: "ap-southeast-2" });
            // // console.log (clo, 'clo')
            // const command = new AdminGetUserCommand(getUser);
            // // // console.log (command)
            // const response = await client.send(command);

            //  console.log(response, 'rs')

            // cognitoUser.getDetails(authenticationData, {
            //     onSuccess: function (result) {
            //         console.log(result, 'result')
            //         // console.log('access token + ' + result.getAccessToken().getJwtToken());

            //         return {
            //             message: result.getAccessToken().getJwtToken()
            //         }

            //     },

            //     onFailure: function (err) {
            //         console.log(err, 'error on')
            //     }
            // })
            let message;
            message = cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    // let     mDetails = result.getAttributes();
                    // console.log (mDetails)
                    //   let name = mDetails.get("custom:details").toString();
                    //   console.log (name)
                    console.log(result.getIdToken().payload.email, '....user email')
                    let data = result.getIdToken().payload
                    let customAttributes = {
                        details: data['custom:details'],
                        details1: data['custom:details1'],
                        details2: data['custom:details2'],
                        details3: data['custom:details3'],
                        details4: data['custom:details4'],
                        company: data['custom:company'],

                    };
                    console.log(customAttributes);

                    // console.log(result.getIdToken().decodePayload.toString(), '....user email')
                    //   var jwtToken = result.getIdToken().getJwtToken();
                    //         var payload = jwtToken.split('.')[1];
                    //  console.log (payload, 'oayload')
                    //  return new Promise((resolve, reject) => {

                    //  / })
                    //           console.log (JSON.parse(_buffer.Buffer.from(payload, 'base64').toString('utf8')))


                    // console.log('access token + ' + result.getAccessToken().getJwtToken());

                    message = result.getAccessToken().getJwtToken();


                },

                onFailure: function (err) {
                    //console.log(err, 'error on sign in login authenticateuser.');
                    console.log(err.code);
                    message = err


                }
            });
            // setTimeout(() => {
            // console.log (message, 'messgae') 
            return {

                message: message,
                data: "dat"
            }
            // }, 2000);





        } catch (error) {
            console.log(error, 'login error on sign in function login.js file service.')
        }
    }
    async forgetPassword(req) {
        try {

            var userData = {
                Username: req.body.email, // your username here
                Pool: config.userpool
            };
            var cognitoUser = new CognitoUser(userData);

            cognitoUser.forgotPassword(
                {
                    onSuccess: (data) => {
                        console.log(data)
                    },
                    onFailure: (err) => {
                        console.log('ERR:', err)
                    },
                    // inputVerificationCode() {
                    //     var verificationCode = prompt('Please input verification code ' ,'');
                    //     var newPassword = prompt('Enter new password ' ,'');
                    //     cognitoUser.confirmPassword(verificationCode, newPassword, this);
                    // }
                }
            )
        } catch (e) {
            console.log(e)
        }
    }
    async confirmPassword(req) {
        try {
            let verificationCode = req.body.verificationCode;
            let newPassword = req.body.newPassword;
            console.log 
            (verificationCode);
            console.log (newPassword);
            var userData = {
                Username: req.body.email, // your username here
                Pool: config.userpool
            };
            var cognitoUser = new CognitoUser(userData);

            cognitoUser.confirmPassword(
                verificationCode, 
                newPassword,
                {
                    onSuccess: (data) => {
                        console.log(data)
                    },
                    onFailure: (err) => {
                        console.log('ERR:', err)
                    },
                }
            )
        } catch (error) {

        }
    }
}