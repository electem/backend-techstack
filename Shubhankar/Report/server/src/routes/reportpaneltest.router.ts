import express from "express";
import ReportpaneltestController from "../controllers/reportpaneltest.controller";

const router = express.Router();

    router.get("/", async (_req, res) => {
    const controller = new ReportpaneltestController();
    const response = await controller.getReportpaneltest();
    return res.send(response);
  });


  export default router;  