import knexx from '../db/index.js';
import moment from 'moment';
const { JSDOM } = require("jsdom");

const { window } = new JSDOM()
const servicelimitLess = async () =>{
    try {

    
    let json = {
        user_name : "Anindita",
        user_address  : "Habra",
        created_at : moment().utc().format("YYYY-MM-DD HH:mm:ss")
    };
    let length = 821113;
    const start = window.performance.now()
    for (let index = 0; index < length; index++) {
          await knexx("user_details").insert (json);
        
    } 
    const stop = window.performance.now()

    console.log(`Time Taken to execute = ${(stop - start)/1000} seconds`);
        return {
            message : 'data inserting'
        }
   

}catch(e ){
    console.log (e)
        
}

}   
module.exports = {
    servicelimitLess
}