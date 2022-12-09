// import knexx from '../db/index.js';

// const { v4: uuidv4 } = require('uuid') 
// const generator = require('generate-password') 
// const slugify = require('slugify') 
const {up} = require('../services/TenantInsertService') 
const insertDataTenant = async (req, res) => {   
  const {    
    body: { uuid }   
    } = req   

//   const tenantName = slugify(organization.toLowerCase(), '_')   
//   const password = generator.generate({ length: 12, numbers: true })  
//   const uuid = uuidv4()   
//   const tenant = {     
//     uuid,    
//     db_name: tenantName,     
//     db_username: tenantName,     
//     db_password: password   
//   };
  
  
  
//  await knexx('public.tenants').insert(tenant).returning("tenant_id")  ;
  
  let tenantInsertDone =await up({  uuid }) 
  return res.status(200).json(Object.assign({ success: true }, tenantInsertDone));  
  // return res.formatter.ok({ tenant: { 'gg':"gdg" } }) 
  // return res.formatter.ok({ tenant: { ...tenant } }) 
} 



module.exports = {  
  // index, 
  insertDataTenant 
} 