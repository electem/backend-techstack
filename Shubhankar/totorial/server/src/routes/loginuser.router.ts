import express from "express";
import loginUserController from "../controllers/loginuser.controller";

const router = express.Router();
router.post("/", async (req, res) => {
    const controller = new loginUserController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  export default router
