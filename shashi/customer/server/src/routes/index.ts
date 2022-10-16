import express from "express";
import PingController from "../controllers/ping.controller";
import UserLogin from "./userLogin.router";
import CustomerRouter from "./customer.route";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/userregistration", UserLogin);
router.use("/customer", CustomerRouter);
export default router;
