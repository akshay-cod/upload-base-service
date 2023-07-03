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