// Create Table 
// import knexx from "../db/index";
// // import knex  from "knex";
// const Knex = require('knex')
const migrate  = async (tenant) => {
// console.log (tenant, 'tenant');
// console.log (knexx, 'dgf')
    
    // console.log(knexx, 'knexx');
    // console.log(Knex(tenant), 'tenant')
    // let kne = Knex((tenant))
    let knex = tenant.connection;
   let tableCreate =  
   await knex.raw(`CREATE TABLE user_details (
        id SERIAL PRIMARY KEY,
        uuid VARCHAR(255) UNIQUE NOT NULL, 
        user_name VARCHAR(100) NOT NULL,  
        user_address VARCHAR(100),  
        created_at TIMESTAMP DEFAULT NOW(),  
        updated_at TIMESTAMP DEFAULT NOW()
    )`
    );
    console.log (tableCreate, 'tableCreate');
    
    // return tableCreate || false
}
module.exports = {migrate};