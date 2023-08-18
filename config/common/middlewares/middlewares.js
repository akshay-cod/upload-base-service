const express = require("express");
const cors = require("cors");

exports.configureCommonMiddleWares = async (app) =>
{ 
   if(process.env.ENV == "prod"){
      app.use(cors(
         {
            origin:['http://localhost:3000','http://62.72.31.73']
         }
      ));
   }
   else{
      app.use(cors());
   }
   app.use(express.json());
}