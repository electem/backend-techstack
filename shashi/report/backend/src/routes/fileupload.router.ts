import express from "express";
import { upload } from "../controllers/fileupload.controller";
import { Request, Response } from "express";
const router = express.Router();
router.post("", async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });
      }
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          status: "failed",
          code: "400",
          message: "Please upload file",
        });
      }
      return res.status(200).send("File uploaded Successfully");
    } catch (err) {
      return res.status(200).json({
        status: "failed",
        code: "500",
        message: "",
      });
    }
  });
});
export default router;

// export class FileDownLoadController {
//   @Post("/postFile")
//   public async fileCreate(
//     @Req() req: Request,
//     @Res() res: Response,
//     @Body() body
//   ): Promise<void> {
//     const filePath = baseUrl + body.fileName
//     body.filePath = filePath
//     const file = {
//       filename: body.fileName,
//       filepath: body.filePath,
//       user_fk: body.user_fk
//     }
//     // Save File in the database
//     fileOp.copyFile(
//       directoryPath + file.filename,
//       directoryPath + file.filename,
//       err => {
//         if (err) {
//           logger.error("file not copied" + err)
//         }
//       }
//     )
//     const data = await files.create(file)
//     try {
//       res.send(data)
//     } catch (err) {
//       err
//     }
//   }
// }
