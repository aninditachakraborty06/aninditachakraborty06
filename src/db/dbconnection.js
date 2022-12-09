import DBCONFIG from '../config/database.js';
const knex = require('knex') 
const config = {   
  client: "postgres",  
  connection: {   
    host: DBCONFIG.host,
    user: DBCONFIG.user,
    password: DBCONFIG.password,
    database: DBCONFIG.database,
    port: DBCONFIG.port 
   } 
 } 
 const db = knex(config) 
 module.exports = { db, config } 


