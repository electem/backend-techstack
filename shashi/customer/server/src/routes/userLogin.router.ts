import express from "express";
import { request } from "http";
import UserRegistrationController from ".././controllers/userlogin.controller";

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new UserRegistrationController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});
router.get("/", async (req, res) => {
  const controller = new UserRegistrationController();
  const response = await controller.getUserAuthentication(
    req.body,
    req.body.userName
  );
  return res.send(response);
});
export default router;
