import multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
// const documentsFilter = (req: any, file: any, cb: any) => {
//   if (!file.originalname.match(/\.(pdf|docx)$/)) {
//     return cb(new Error('Only documents files are allowed!'), false);
//   }
//   cb(null, true);
// };

export const upload = multer({
  fileFilter: imageFilter,

  storage,
}).single('file');
