// const VideoSnapshot = require('video-snapshot').default;
// const fs = require('fs');

// const VideoService = class HashService {
   
//     async createAnThumbnailFromVideo(inputVideoPath, seekTime, outputThumbnailPath){
//         try{
//         //     const videoSnapshot = new VideoSnapshot(inputVideoPath);
           
//         //   const snapshotBuffer = await videoSnapshot.takeSnapshot({
//         //     offset: seekTime,
//         //     width: 1920, // Width of the thumbnail
//         //     height: 1080, // Height of the thumbnail
//         //     format: 'png', // Output format (png, jpg, etc.)
//         //   });
//         //   const bufferData = Buffer.from(snapshotBuffer);
//         //   console.log(bufferData,"data")
//         //   fs.writeFileSync(outputThumbnailPath, bufferData);
//         //   console.log('Thumbnail generated:', outputThumbnailPath);

//           const snapshot = VideoSnapshot(inputVideoPath);

//         // Capture a thumbnail at the specified seek time
//         const snapshotBuffer = await snapshot(snapshot.getDuration(), "00:00:02");

//         // Ensure snapshotBuffer is a Buffer
//         const bufferData = Buffer.from(snapshotBuffer);

//         fs.writeFileSync(outputThumbnailPath, bufferData);
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
 
//    };
 
//  module.exports = VideoService;