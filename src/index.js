import express from 'express'; 
let app = express();
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const path = require('path');
//const socketio = require('socket.io');
import config from './config/index.js';
import knexx from './db/index.js';
// const PORT = config.app.port;
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
const PORT = config.app.port;
import bodyParser from 'body-parser';
let server = require('http').Server(app);
// import  knexx  from './db/index.js';

// app.use(cookieParser('metricspos', {
//     httpOnly: true
// }));


// app.use(function (err, req, res, next) {
//     if (err.code !== 'EBADCSRFTOKEN') {
//         return next(err)
//     } else {

//         res.status(403).send({
//             status: -2,
//             message: 'Unauthorized'
//         });
//         res.end();
//     }
// })

// app.use(cors())
//to  get request body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// use it before all route definitions
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, token");
    next();
});

app.use('/api', require('./routes/index.js'));
// // app.use('/api/customer', Sanatize, require('./routes/user'));
// app.use(logErrors);
// app.use(clientErrorHandler);
knexx.raw('SELECT NOW() as connected_at').then(
    (data) => {
     
          console.log(`Database Connected at : ${data}`);
          server.listen(PORT, function (err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('Server started at : ' + PORT);
              }
          });
      }
  )
  .catch(
  //     err => {
  //         console.log (err)
  //         console.log('Error Occured connecting database', err);
  //         process.exit(1);
  //     }
  )