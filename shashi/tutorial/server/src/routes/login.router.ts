import express from "express";
import UserloginController from "../controllers/login.controller";
import { Userlogin } from "src/models";
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
router.use("/", async (req, res, next) => {
  const controller = new UserloginController();
  const response = await controller.getAuth(req.body, req.body.userName);
  next();
});

router.get("/", async (req, res, next) => {
  const controller = new UserloginController();
  const response = await controller.getAuth(req.body, req.body.userName);
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new UserloginController();
  const response = await controller.createLogin(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UserloginController();
  const response = await controller.getLogin(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});
export default router;
