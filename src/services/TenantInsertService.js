
const { migrate } = require('../migrations/index')
const { seed } = require('../seeders/index')
const { bootstrap, getTenantConnection } = require('./Connection-service')

const up = async (params) => {


    // job.process(async (job, done) => {   
    try {    
    // console.log (job, 'jobbb')


    await bootstrap() // refresh tenant connections to include the new one as available  
    const tenant = getTenantConnection(params.uuid);
     // create all tables in the current tenant database      
    const insertDummyData =await seed(tenant);
    return {
        message : "Data is inserted",
        data : insertDummyData
    }
    // fill tables with dummy data     
    } catch (e) {      
        console.error(e,'error ')    
    }   
    // }) 
}
// const down = async (params) => {

// }
module.exports = { up };
