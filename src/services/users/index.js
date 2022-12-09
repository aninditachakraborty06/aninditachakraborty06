const Axios = require('axios');
// const config = require('../../config/const_credentials');
import  knex  from '../../db/index';

module.exports = class usersServices {
    constructor() {
        return {
            getaddress: this.getaddress.bind(this),
            updateUsers :  this.updateUsers.bind(this),
            addUsers : this.addUsers.bind(this),
            deleteUsers : this.deleteUsers.bind(this)
        }
    }

    /**
     * @Route get address
     * @description get address from addressfinder.io
     * @params {address}
     * @author Anindita Chakraborty
    */
        async getaddress(req) {
            try {
                console.log ( req.params,'reqreqreq');
                let userId = req.params.id ?  parseInt(req.params.id) : ""
                let whereObj = {
                    "users.is_deleted" : 0,
                   
                }
                if (userId){
                    whereObj.user_id =  userId;
                }
            let users  =  await knex('users').select('*').where (whereObj)
               
                return {
                    data : users
                }
              
            } catch (error) {
                throw error;
            }
        }

    /**
     * @Route update users
     * @description update users
     * @params {users}
     * @author Anindita Chakraborty
    */
    async  updateUsers (req) {
        let userDetailsUpdate = req.body;
        let id = req.params.id;
        let whereObj = {
            "users.is_deleted" :  0,
            "users.user_id" : id
        }
        if (req.params.id){
            await knex ('users').where (whereObj).update(userDetailsUpdate);
            return {
                message : "User has been updated successfully;"

            }
        }
    }
    /**
     * @Route add users
     * @description add users
     * @params {users}
     * @author Anindita Chakraborty
    */  
    async addUsers (req) {
        console.log (req.body)
        let insertData = req.body;
        let added = await knex ("user_credentials").insert(insertData).returning('user_id');
       
        return  {
            message: "Users inserted successfully.",
            user_id : added
        }
    }
    /**
     * @Route delete users
     * @description delete users
     * @params {user_id}
     * @author Anindita Chakraborty
    */ 
   async deleteUsers (req){
        let isDeleted = {is_deleted : 1}
        let userId = req.params.id;
        let whereObj = {
            "users.is_deleted" : 0,
            "users.usersId" :  userId
        }
         await knex ("users").where(whereObj).update (isDeleted);
        return {
            message : "Users details has been deleted successfully;"
            
        }
   }
   
}

//  new usersServices();