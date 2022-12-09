import knexx from "../db";
import moment from "moment/moment";
const { JSDOM } = require("jsdom");

const { window } = new JSDOM()
const seed = async (tenant) => {

    try {
        let knex = tenant.connection;
        let insertDummyData = {
            uuid: tenant.uuid,
            user_name: "Anindita",
            user_address: "Habra",
            created_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss")
        }
        const start = window.performance.now();
        // // let id  = '11111';
        // // let searchData =  await knex.select('*')     
        // .where('id', id)    
        // .from('user_details')   
        const stop = window.performance.now()
        let user_id = await knex('user_details').update(insertDummyData).where({ uuid: tenant.uuid });
        return {
            message: `Time Taken to execute = ${(stop - start) / 1000} seconds`,

            details: user_id
        }
    } catch (e) {
        console.log(e, 'data is not inserted');
    }

}
const getTenantData = async (tenant) => {
    try {
    let tenantDbConnection = tenant.connection;
    let uuid = tenant.uuid ? tenant.uuid : '';
    let where = {};
    if (uuid) return where.uuid = uuid;
    let allData = await tenantDbConnection.select ("user_name, user_address").from ("user_details");
    return {
        message :  "User Details data",
        data :  allData
    };

    } catch (e) {
        console.log(e, 'error')
    }
}

module.exports = {
    seed,
    getTenantData
};