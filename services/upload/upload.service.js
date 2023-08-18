const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

exports.uploadFileToS3 = (filePath,fileName) => {
  return new Promise((resolve, reject)=>{
    fs.readFile(filePath, (err, data) => {
        if (err) {
           reject({
               status:false
           })
        }
        const params = {
            Bucket:process.env.ENV == "prod" ? 'content-finscre' :'test-content-finscre', // pass your bucket name
            Key: fileName, // file will be saved as testBucket/contacts.csv
            Body: data
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
            console.log(data,process.env.ENV)
            fs.unlinkSync(filePath)
            resolve({
               status:true,
               location:data.Location
            })
        });
     });
  }) 
};

exports.getPreSignedContentUrl = async(fileName) => {
    try{
        const params = {
            Bucket: 'test-content-finscre', // pass your bucket name
            Key: fileName, // file will be saved as testBucket/contacts.csv
            Expires:  60 * 5
        };

        const url = await s3.getSignedUrlPromise('getObject',params)
        return { url:url }
    }
    catch(err){

    }
  
}