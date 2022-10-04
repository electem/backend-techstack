import fs from 'fs';
import db from '../models';
import { Request, Response } from 'express';

const Image = db.images;

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
export default uploadFiles;
