const express = require("express");
const cors = require("cors");

exports.configureCommonMiddleWares = async (app) =>
{ 
   require("dotenv").config();
    app.use(cors());
   app.use(express.json());
}