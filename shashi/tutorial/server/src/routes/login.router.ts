import express from "express";
import UserloginController from "../controllers/login.controller";
const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new UserloginController();
  const response = await controller.getAuth();
  return res.send(response);
});
router.post("/", async (req, res) => {
  const controller = new UserloginController();
  const response = await controller.createLogin(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UserloginController();
  const response = await controller.getLogin(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});
export default router;
