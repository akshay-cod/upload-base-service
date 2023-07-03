const Razorpay = require('razorpay');


const PaymentService = class HashService {
   
    async createPaymentOrder(amount){

        const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
          };
       const createdOrder = await instance.orders.create(options);
       console.log(createdOrder)
       return createdOrder;
    }

    async hashData(data){
        try{
        }
         catch(err){
             console.log(err);
         }
     }
 
   };
 
 module.exports = PaymentService;