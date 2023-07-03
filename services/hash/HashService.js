const crypto = require("crypto");

const HashService = class HashService {
   
    async genrateOTP(){
        const otp = "09876" || crypto.randomInt(10000,99999);
        return otp;
    }

    async hashData(data){
        try{
            const hashedData = crypto.createHmac('sha256',process.env.HASH_SECREAT).update(data).digest('hex');
            return hashedData
         }
         catch(err){
             console.log(err);
         }
     }
 
     async deHashData(data){
        try{
            const dehashedData = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(data.toString())
            .digest('hex');
            return dehashedData;
        }
        catch(err){

        }
     }

   };

  
 
 module.exports = HashService;