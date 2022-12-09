import DBCONFIG from '../config/database.js';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
//var moment = require('moment');
// var po = require ('pg');
// console.log (DBCONFIG);
import knex from 'knex';
var knexx = knex({
  client: "mysql",
  // debug: true,
  connection: {
    host: DBCONFIG.host,
    user: DBCONFIG.user,
    password: DBCONFIG.password,
    database: DBCONFIG.database,
    // port: DBCONFIG.port
  },
});

export default knexx;



