import express from 'express';
import { upload } from '../middlewear/upload';
import { Request, Response } from 'express';
const router = express.Router();

router.post('', async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'Image Upload Error', detail: err.message }],
        });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({
          status: 'failed',
          code: '400',
          message: 'Please upload file',
        });
      }

      return res.status(200).send('File uploaded Successfully');
    } catch (err) {
      return res.status(200).json({
        status: 'failed',
        code: '500',
        message: '',
      });
    }
  });
});

export default router;
