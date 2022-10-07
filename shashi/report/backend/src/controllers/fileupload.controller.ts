// const { File } = require("../models/fileupload");

import multer from "multer";
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});
const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
// const documentsFilter = (req: any, file: any, cb: any) => {
//   if (!file.originalname.match(/\.(pdf|docx)$/)) {
//     return cb(new Error("Only documents files are allowed!"), false);
//   }
//   cb(null, true);
// };
export const upload = multer({
  fileFilter: imageFilter,
  storage,
}).single("file");

// //file to byte
// // var fileByteArray: any = [];

// // function uploadFile1(){
// //   var files = myInput.files[0];
// //   var reader = new FileReader();
// //   reader.onload = processFile(files);
// //   reader.readAsText(files);
// // }

// // function uploadFile2(){
// //   var files = document.querySelector('input').files[0];
// //   var reader = new FileReader();
// //   reader.onload = processFile(files);
// //   reader.readAsDataURL(files);
// // }

// // function uploadFile3(){
// //   var files = myInput.files[0];
// //   var reader = new FileReader();
// //   reader.onload = processFile(files);
// //   reader.readAsArrayBuffer(files);
// // }

// // function processFile(theFile){
// //   return function(e) {
// //     var theBytes = e.target.result; //.split('base64,')[1]; // use with uploadFile2
// //     fileByteArray.push(theBytes);
// //     document.getElementById('file').innerText = '';
// //     for (var i=0; i<fileByteArray.length; i++) {
// //         document.getElementById('file').innerText += fileByteArray[i];
// //     }
// //   }
// // }
