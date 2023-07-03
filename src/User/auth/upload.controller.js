const { uploadFileToS3, getPreSignedContentUrl } = require("../../../services/upload/upload.service");

exports.uploadAFile = async (req,res) => {
  try{
      const fileName = req.file.filename;
      const uploaded = await uploadFileToS3(`uploads/${fileName}`,fileName)
     // const preSignedUrl = await getPreSignedContentUrl(fileName)
    //  console.log(preSignedUrl)
     return res.status(200).json({
          url:uploaded.location,
          type:req.file.mimetype,
          size:req.file.size
       });
      }
  catch(err){
  return res.status(400).json({
    message:"something went wrong"
 });
  }
}