/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//import { FileSaverService } from './file.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { multerOptions } from './file.service';
@Controller('photos')
export class FileController {
  constructor() {}
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile() file) {
    console.log(file);
    return 'file uploaded successfully';
  }

  @Get(filename)
  @UseInterceptors()
  async download(@Res() res) {
    const filename = 'asyn1.png';
    return res.download(
      'E:/New Clone/backend-techstack/shashi/company-department/nestjs-server/uploads/' +
        filename,
    );
    console.log();
    return 'file downloaded successfully';
  }
}
// @Get("/fetchTrayFile/")
// public async fetchTrayFile(
//   @Req() req: Request,
//   @Res() res: Response
// ): Promise<void> {
//   const data = await multerOptions.findAll()
//   try {
//     res.send(data)
//   } catch (err) {
//     res.status(500).send({
//       message: "Error retrieving while fetching File with tray_fk=" + err
//     })
//   }
// }
