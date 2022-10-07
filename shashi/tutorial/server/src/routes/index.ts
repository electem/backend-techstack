import express from "express";
import PingController from "../controllers/ping.controller";
import PostRouter from "./post.router";
import UserRouter from "./user.router";
import CommentRouter from "./comment.router";
import TutorialRouter from "./tutorials.router";
import CategoryRouter from "./category.router";
import SampleRouter from "./sample.router";
import UserloginRouter from "./login.router";
import UserloginController from "src/controllers/login.controller";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", UserRouter);
router.use("/posts", PostRouter);
router.use("/comments", CommentRouter);
router.use("/tutorials", TutorialRouter);
router.use("/category", CategoryRouter);
router.use("/sample", SampleRouter);
router.use(("/login"), UserloginRouter);
export default router;

// router.get(`/login`).get(UserloginController.getAuth())
