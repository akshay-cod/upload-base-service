const AWS = require("aws-sdk");

const SmsService = class SmsService {
   
    async sendOTP(otp, phoneNumber){
       try{
   console.log(process.env.AWS_ACCESS_KEY_ID)
        AWS.config.update({
            region: "ap-south-1",
            accessKeyId:process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
          });
          var sns = new AWS.SNS();
        sns.setSMSAttributes({
            attributes: { DefaultSMSType: "Transactional" }
        },
        function (error) {
            if (error) {
                console.log(error);
            }
        });
        var params = {
            Message:`your OTP from sell-pixel ${otp}`,
            PhoneNumber:phoneNumber,
            MessageStructure: 'string',
              };
              console.log(params)
        const res = await sns.publish(params).promise()
        return true   
    }
       catch(err){
        console.log(err)
       }
    }

};

// async function send(){
//     const sms = new SmsService();
//     let nn = await sms.sendOTP(45345,"+917975674439")
//     return nn
// }

// async function wait(){
//     let data = await send()
//    console.log(data)
// }
// console.log(wait()) 

module.exports = SmsService;