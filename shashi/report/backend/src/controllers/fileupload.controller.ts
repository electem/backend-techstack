import multer from "multer";
const storage = multer.diskStorage({
  destination: (cb: any) => {
    cb(null, "uploads");
  },
  filename: (file: any, cb: any) => {
    cb(null, file.originalname);
  },
});
const imageFilter = (file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

export const upload = multer({
  fileFilter: imageFilter,
  storage,
}).single("file");