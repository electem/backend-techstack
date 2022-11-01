import express from "express";
import UserRouter from "./user.router";
import CustomerGroupRouter from "./customergroup.router";
import CustomerRouter from "./customer.router";

const router = express.Router();

router.use("/loginusers", UserRouter);
router.use("/customergroup", CustomerGroupRouter);
router.use("/customer", CustomerRouter);
export default router;
