import express from "express";
import PanelRouter from "./panel.router";
import TestRouter from "./test.router";
import ReportRouter from "./report.router";
import ReportpaneltestRouter from "./reportpaneltest.router"
import PanelDataRouter from "./paneldata.router"
import TestDataRouter from "./testdata.router"
import EmployeeRouter from "./employee.router"
import EmployeeDetailRouter from "./employee.router"



const router = express.Router();
router.use("/panels", PanelRouter);
router.use("/tests", TestRouter);
router.use("/reports", ReportRouter);
router.use("/reportpaneltest", ReportpaneltestRouter);
router.use("/paneldata", PanelDataRouter);
router.use("/testdata", TestDataRouter);
router.use("/employees", EmployeeRouter);
router.use("/employee", EmployeeDetailRouter);


export default router;
