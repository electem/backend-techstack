import express from 'express';
import UserLoginController from '../controllers/userlogin.controller';
import { userLogin } from '../models/userlogin';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.use('/', async (req, res, next) => {
  const controller = new UserLoginController();
  const response = await controller.getAuth(req.body, req.body.userName);
  next();
});
router.post('/', async (req, res) => {
  const controller = new UserLoginController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get('/:id', async (req, res) => {
  const controller = new UserLoginController();
  const response = await controller.getUser(req.params.id);
  if (!response) res.status(404).send({ message: 'No user found' });
  return res.send(response);
});

router.get('/', async (req, res) => {
  const controller = new UserLoginController();
  const response = await controller.getAuth(req.body, req.body.userName);
  return res.send(response);
});

//

export default router;
