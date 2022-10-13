import express from "express";
import UserRegistrationController from ".././controllers/userlogin.controller";

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new UserRegistrationController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

export default router;
