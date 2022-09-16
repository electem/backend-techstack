import express from "express";
import PanelRouter from "./panel.router";
import TestRouter from "./test.router";
import ReportRouter from "./report.router";

const router = express.Router();
router.use("/panels", PanelRouter);
router.use("/tests", TestRouter);
router.use("/reports", ReportRouter);


export default router;
