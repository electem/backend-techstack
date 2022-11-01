import express from "express";
import ReportpaneltestController from "../controllers/reportpaneltest.controller";

const router = express.Router();
// router.post("/", async (req, res) => {
//     const controller = new ReportpaneltestController();
//     const response = await controller.createReportpaneltest(req.body);
//     return res.send(response);
//   });

  router.get("/", async (_req, res) => {
    const controller = new ReportpaneltestController();
    const response = await controller.getReportpaneltest();
    return res.send(response);
  });


  export default router;  