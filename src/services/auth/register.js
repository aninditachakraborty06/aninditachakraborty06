import config from "../../config";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import knexx from "../../db";
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from "aws-sdk";

const signUp = (request) => {

    let password = request.body.password;
    let email = request.body.email;
    // console.log (request);
    var attributeList = [];

    var dataCompany = {
        Name: 'custom:company',
        Value: request.body.company // your email here
    };
    var dataDetails = {
        Name: 'custom:details',
        Value: request.body.details // your phone number here with +country code and no delimiters in front
    };
    var dataDetails1 = {
        Name: 'custom:details1',
        Value: request.body.details1
    };
    var dataDetails2 = {
        Name: 'custom:details2',
        Value: request.body.details2
    };
    var dataDetails3 = {
        Name: 'custom:details3',
        Value: request.body.details3
    };
    var dataDetails4 = {
        Name: 'custom:details4',
        Value: request.body.details4
    };
    var data = {
        TemporaryPassword: password,
        DesiredDeliveryMediums: ['EMAIL'],
        ForceAliasCreation: false,
    }

    // var attributeEmail = new CognitoUserAttribute(dataCompany);
    // var attributePhoneNumber = new CognitoUserAttribute(dataDetails);
    // var attributeDetails1 = new CognitoUserAttribute(dataDetails1);
    // var attributeDetails2 = new CognitoUserAttribute(dataDetails2);
    // var attributeDetails3 = new CognitoUserAttribute(dataDetails3);
    // var attributeDetails4 = new CognitoUserAttribute(dataDetails4);
    // var attributeDetails5 = new CognitoUserAttribute(data);

    // attributeList.push(attributeEmail);
    // attributeList.push(attributePhoneNumber);
    // attributeList.push(attributeDetails1);
    // attributeList.push(attributeDetails2);
    // attributeList.push(attributeDetails3);
    // attributeList.push(attributeDetails4);
    // attributeList.push(attributeDetails5)
    console.log(attributeList);

    // let params = {
    //     TemporaryPassword: password,
    //     DesiredDeliveryMediums: ['EMAIL'],
    //     ForceAliasCreation: false,
    // }

    // import { CognitoIdentityServiceProvider } from 'aws-sdk';
    // import {AWSCognito} from 'amazon-cognito-identity-js'
    // import { CognitoIdentityProvider } from 'aws-sdk/clients/cognitoidentity';
    const poolData = {
        UserPoolId: 'ap-southeast-2_k3JnookNk',
        ClientId: '3dke5dof4emofoorftt1g7usqf',
        TemporaryPassword: password,
        DesiredDeliveryMediums: ['EMAIL'],
    };
    let userpool = new CognitoUserPool(poolData)
    // config.userpool.push(params)
    let TemporaryPassword = password;

    var cognitoUser;
    config.userpool.signUp(email, TemporaryPassword, attributeList, null, (err, data) => {
        console.log(err)
        console.log(data)
        // if (err) return console.log (err, 'error from user pool sign up usage');
        if (data) {

            console.log(data)
            return {
                message: `${data.user} Registraion is done.`
            }

        } else if (err) {
            return {
                message: 'Registration cant be done now.'
            }
        }
        // cognitoUser = data.user;
        // cognitoUser.confirmRegistration('123456', true, function(err, result) {
        //     if (err) {
        //         alert(err);
        //         return;
        //     }
        //     console.log('call result: ' + result);
        // });



    })


    const params = {
        UserPoolId: 'ap-southeast-2_k3JnookNk',
        // ClientId: '3dke5dof4emofoorftt1g7usqf',
        Username: email /* required */,
        TemporaryPassword: password,
        DesiredDeliveryMediums: ['EMAIL'],
        ForceAliasCreation: false,
        UserAttributes: [
          
          {
            Name: 'email' /* required */,
            Value: email,
          },
          { Name: 'custom:details3',
          Value: request.body.details3},
          {
            Name: 'custom:details2',
            Value: request.body.details2
          },
          {
            Name: 'custom:details4',
            Value: request.body.details4
          }
        ],
      };

    //   CognitoIdentityServiceProvider.adminCreateUser(
    //     params,
    //     (err, data) => {
    //       console.log(data);
    //       if (err) {
    //         console.log(err);
    //         // reject(err);
    //         // throw new BadRequestException(err);
    //       }else {}
    //       // an error occurred
        //   else resolve(data); // successful response
    //     },
    //   );
}
module.exports = {
    signUp
}