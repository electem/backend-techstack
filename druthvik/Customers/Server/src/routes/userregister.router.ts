import express from 'express';
import UserRegisterController from '../controllers/userregister.controller';

const router = express.Router();

router.post('/', async (req, res) => {
  const controller = new UserRegisterController();
  const response = await controller.registerUser(req.body);
  return res.send(response);
});

export default router;
