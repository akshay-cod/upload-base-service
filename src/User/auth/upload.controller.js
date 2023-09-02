const { uploadFileToS3, getPreSignedContentUrl, deleteFileFromS3 } = require("../../../services/upload/upload.service");
const sharp = require('sharp');
//const VideoService = require("../../../services/video/videoService");

exports.uploadAFile = async (req,res) => {
  try{
   // console.log(req.file)
      const fileName = req.file.filename;
      let uploaded;
      let urlList={};
      if(req.file.mimetype.startsWith("image")){
       await sharp( `./uploads/${fileName}`)
        .withMetadata()
        .resize(200,200)
        .jpeg({quality : 50}).toFile(
             `./uploads/avatar_${fileName}`)
     
     
       await sharp(`./uploads/${fileName}`)
        .withMetadata()
        .resize(640,480)
        .jpeg({quality : 80}).toFile(
          `./uploads/thumb_${fileName}`);

        await sharp(`./uploads/${fileName}`)
        .withMetadata()
        .resize(1000,1000)
        .jpeg({quality : 100}).toFile(
          `./uploads/preview_${fileName}`);
      //  console.log(__dirname)
        
        const preview = await uploadFileToS3(`uploads/preview_${fileName}`,`preview_${fileName}`)
        const thumb = await uploadFileToS3(`uploads/thumb_${fileName}`,`thumb_${fileName}`)
        const avatar = await uploadFileToS3(`uploads/avatar_${fileName}`,`avatar_${fileName}`)
        const original = await uploadFileToS3(`uploads/${fileName}`,`${fileName}`)
        uploaded = original;
        urlList.thumb = thumb.location;
        urlList.avatar = avatar.location;
        urlList.original = original.location;
        urlList.preview = preview.location;
      }
      // else if(req.file.mimetype.startsWith("video"))
      // {
      //   console.log(req.file)
      //   const videoService = new VideoService();
      //   const createdThumbnail = await videoService.createAnThumbnailFromVideo(`uploads/${fileName}`, "25%", `uploads/${fileName}_thumb.png`)
      //   //  uploaded = await uploadFileToS3(`uploads/${fileName}`,fileName)
      // }
      else{
         uploaded = await uploadFileToS3(`uploads/${fileName}`,fileName)
      }
     
     // const preSignedUrl = await getPreSignedContentUrl(fileName)
    //  console.log(preSignedUrl)
     return res.status(200).json({
          url:uploaded?.location,
          url_object:{...urlList},
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

exports.removeAfile = async (req,res) => {
  try{
    const {key} = req.body;
    const deletedFile = await deleteFileFromS3(key);
 
    if(deletedFile){
      return res.status(200).json({ status:true })
    }
    else{
      return res.status(200).json({ status:false })
    }
  }
  catch(err){

  }
}