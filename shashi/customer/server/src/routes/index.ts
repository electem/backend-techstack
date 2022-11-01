import express from "express";
import PingController from "../controllers/ping.controller";
import UserLogin from "./userLogin.router";
import CustomerRouter from "./customer.route";
import CustomerGroupRouter from "./customerGroup.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/userregistration", UserLogin);
router.use("/customer", CustomerRouter);
router.use("/customergroup", CustomerGroupRouter);
export default router;
