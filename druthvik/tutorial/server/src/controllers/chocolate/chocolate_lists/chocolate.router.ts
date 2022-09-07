import express from 'express';
import ChocolateController from '../chocolate_lists/chocolate.controller';

const router = express.Router();

// router.get('/', async (_req, res) => {
//     const controller = new ChocolateController();
//     const response = await controller.getChocolates();
//     return res.send(response);
//   });

router.post('/', async (req, res) => {
  const controller = new ChocolateController();
  const response = await controller.createChocolate(req.body);
  return res.send(response);
});

// router.get('/', async (_req, res) => {
//          const controller = new ChocolateController();
//          const response = await controller.getChocolatesQuantity();
//          return res.send(response);
//        });

export default router;
