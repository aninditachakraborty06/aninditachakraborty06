const Queue = require('bull');

import knexx from '../db/index';
const {migrate} = require('../migrations/index') 
const {seed} = require('../seeders/index') 
const { bootstrap, getTenantConnection } = require('./Connection-service') 

const up = async (params) => { 
     
  const job = new Queue(    
    `setting-up-database-${new Date().getTime()}`,             
    `redis://127.0.0.1:6379`   
    )  
   
    job.add({params })   
  
    // job.process(async (job, done) => {   
    // try {    
        // console.log (job, 'jobbb')
        
        await knexx.raw(`CREATE ROLE ${params.tenantName} WITH LOGIN;`) // Postgres requires a role or user for each tenant       
        // await knexx.raw(         
        // `GRANT ${params.tenantName} TO postgres_role;`       
        // ) // you need provide permissions to your admin role in order to allow the database administration       
        await knexx.raw(`CREATE DATABASE ${params.tenantName};`)       
        await knexx.raw(         
        `GRANT ALL PRIVILEGES ON DATABASE ${params.tenantName} TO ${params.tenantName};`
        )      
        await bootstrap() // refresh tenant connections to include the new one as available  
        const tenant = getTenantConnection(params.uuid)  ;
        await migrate(tenant) // create all tables in the current tenant database      
        await seed(tenant);
         // fill tables with dummy data     
    // } catch (e) {      
    //     console.error(e,'error ')    
    // }   
    // }) 
}

const getItem = async (params) => {
  try { 
        await bootstrap() // refresh tenant connections to include the new one as available  
        const tenant = getTenantConnection(params.uuid)  ;
        await migrate(tenant) // create all tables in the current tenant database      
        await getTenantData(tenant);
         // fill tables with dummy data   
    
  } catch (error) {
    console.log (error,'tenant service.js file error on getitem function.')
  }
}

const down = async (params) => {
  await knexx.raw(`DROP ROLE ${params.tenantName} WITH LOGIN;`) // Postgres requires a role or user for each tenant       
  // await knexx.raw(         
  // `GRANT ${params.tenantName} TO postgres_role;`       
  // ) // you need provide permissions to your admin role in order to allow the database administration       
  await knexx.raw(`DROP DATABASE ${params.tenantName};`)       
  // await knexx.raw(         
  // `GRANT ALL PRIVILEGES ON DATABASE ${params.tenantName} TO ${params.tenantName};`
  // )      
  // await bootstrap() // refresh tenant connections to include the new one as available  
  // const tenant = getTenantConnection(params.uuid)  ;
  // await migrate(tenant) // create all tables in the current tenant database      
  // await seed(tenant);
}

module.exports = {up, 
  getItem, 
  down
};
