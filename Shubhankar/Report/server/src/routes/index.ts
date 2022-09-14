import express from "express";
import PanelRouter from "./panel.router";
import TestRouter from "./test.router";

const router = express.Router();
router.use("/panels", PanelRouter);
router.use("/tests", TestRouter);

export default router;
