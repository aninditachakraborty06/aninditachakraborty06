import { CognitoUserPool } from 'amazon-cognito-identity-js';
// import { CognitoIdentityServiceProvider } from 'aws-sdk';
// import {AWSCognito} from 'amazon-cognito-identity-js'
// import { CognitoIdentityProvider } from 'aws-sdk/clients/cognitoidentity';
const poolData = {
  UserPoolId: 'ap-southeast-2_k3JnookNk',
  ClientId: '3dke5dof4emofoorftt1g7usqf',
};
export default new CognitoUserPool(poolData);
// export default new CognitoUserPool(poolData);