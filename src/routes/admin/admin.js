// /**
//     @Author Anindita Chakraborty
//     @everycomment added by @author
//     @to documented code
// **/
// // to define routes 
var express = require('express')
    , router = express.Router()


// // imported the class 
import { store, destroy } from '../../controllers/Tenant.js';
import  users  from '../../controllers/users/index';
import {insertDataTenant } from '../../controllers/TenantInsert.js';
import {limitLessInsert} from '../../controllers/limitLessDataInsert';
// //to get all functions from the imported class users declare class here then get all function, it can be done on the files where classes are exported;
const allUsers  = new users();

// // setting of routes 
// // users crud operation code 

router.post('/admin/tenants', store);
router.get('/admin/users/:uuid?', destroy);
router.post ('/admin/tenants/user-details-insert', insertDataTenant);
router.post('/users/users-login/add', allUsers.addUsers);
router.put('/users/users-login/update/:id', allUsers.updateUsers);
router.delete('/users/users-login/delete/:id', allUsers.deleteUsers);

router.post ('/limitLessInsert', limitLessInsert)

// /** 
// app is listening for the requests(not the Router) while your index.js is just a separate js file with some codes.

// In module.export ,module is a variable that represents the current module and export is an object. Anything you assign to the module.exports will be expose as a module.

// copied: Module in Node.js is a simple or complex functionality organized in single or multiple JavaScript files which can be reused throughout the Node.js application.

// Once you do module.export = Router Now you have a newly created module. In nodeJs 

// **/ 
module.exports = router;