const knex = require('knex')
const { getNamespace } = require('continuation-local-storage') 
// const { config } = require('../config/index') 
// import config from '../config/index';
import knexx from '../db/index.js';
const { db, config } = require('../db/dbconnection') 
let tenantMapping = [];

const getConfig = (tenant) => {   
  const { db_username: user, db_name: database, db_password: password } = tenant 
  let connection = config.connection;
return {     
    client: "postgres",    
    connection: { 
      host : connection.host,
      port :  connection.port,
      user : connection.user,       
      database,    
      password :  connection.password    
    }  
  }
} 

const getConnection = () => getNamespace('tenants').get('connection') || null 

const bootstrap = async () => { 
  try {     
    const tenants = await knexx       
      .select('uuid', 'db_name', 'db_username', 'db_password')     
      .from('tenants')    
    // console.log (tenants)
    tenantMapping = tenants.map((tenant) => ({                       
      uuid: tenant.uuid,       
      connection: knex(getConfig(tenant))   
    }))  
   
 } catch (e) {     
   console.error(e)   
 } 
} 

const getTenantConnection = (uuid) => {  
  // console.log(tenantMapping,'tenantMapping')
  const tenant = tenantMapping.find((tenant) => tenant.uuid === uuid)  
  if (!tenant) return null  
   
   return  tenant
 

} 
module.exports = {
  getTenantConnection, 
  bootstrap, 
  getConnection,
  getConfig

}