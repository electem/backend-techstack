import express from 'express';

import { uploadFiles } from '../controllers/file.controller';
import { upload } from '../middlewear/upload';
const router = express.Router();

router.post('/upload', upload, uploadFiles);

export default router;
