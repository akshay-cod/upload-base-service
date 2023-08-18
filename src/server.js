const cluster = require('cluster');
require("dotenv").config();
cluster.schedulingPolicy = cluster.SCHED_RR;
if (cluster.isMaster) {
    // console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    console.log(process.env.ENV)
    // Fork workers.
    for (let i = 0; i < (process.env.ENV == "prod" ? 2 : 1); i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  
  } else {
const express = require("express");
const morgan = require("morgan")
const { connectToMongodb } = require("../config/database/dataBaseConnection");
const { configureCommonMiddleWares } = require("../config/common/middlewares/middlewares");
const { startServer } = require("../config/server/startServer");
const { serveStaticFiles } = require("../config/common/static/serveStaicFiles")

const app = express();

const userRoutes  = require('./User/auth/upload.route');

serveStaticFiles(app);
configureCommonMiddleWares(app);
app.use(morgan(':status :method :url :response-time :req[body]'))
connectToMongodb();

app.use('/upload', userRoutes);

startServer(app);
  }