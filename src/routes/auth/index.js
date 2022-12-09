// /**
//     @Author Anindita Chakraborty
//     @everycomment added by @author
//     @to documented code
// **/
// // to define routes 
var express = require('express')
    , router = express.Router();
import {signUpController} from '../../controllers/auth/register' ;   
import authController from '../../controllers/auth/login';
const auth =  new authController ();

router.post('/register-here', signUpController)
router.post('/auth/login-users', auth.login);
router.post('/sign-in-here', auth.signIn);
router.post('/forgotpassword', auth.forgotPassword)
router.post('/confirmyourpassword', auth.confirmPassword)



// /** 
// app is listening for the requests(not the Router) while your index.js is just a separate js file with some codes.

// In module.export ,module is a variable that represents the current module and export is an object. Anything you assign to the module.exports will be expose as a module.

// copied: Module in Node.js is a simple or complex functionality organized in single or multiple JavaScript files which can be reused throughout the Node.js application.

// Once you do module.export = Router Now you have a newly created module. In nodeJs 

// **/ 
module.exports = router;