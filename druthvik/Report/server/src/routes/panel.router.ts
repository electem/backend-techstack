import express from 'express';
import PanelController from '../controllers/panel.controller';

const router = express.Router();

router.get('/', async (_req, res) => {
  const controller = new PanelController();
  const response = await controller.getPanel();
  return res.send(response);
});

router.post('/', async (req, res) => {
  const controller = new PanelController();
  const response = await controller.createPanel(req.body);
  return res.send(response);
});

router.get('/:id', async (req, res) => {
  const controller = new PanelController();
  const response = await controller.getPanelByID(req.params.id);
  if (!response) res.status(404).send({ message: 'No user found' });
  return res.send(response);
});
export default router;
