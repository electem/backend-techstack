import express from "express";
import PingController from "../controllers/ping.controller";
import PostRouter from "./post.router";
import UserRouter from "./user.router";
import CommentRouter from "./comment.router";
import ProductRouter from "./product.router";
import ResourceRouter from "./resource.router";
import TutorialsRouter from "./tutorials.router";
import CategoryRouter from "./category.router";
import QuestionRouter from "./question.router";
import CompanyRouter from "./company.router";
import EmployeeRouter from "./employee.router";
import GamesRouter from "./game.router";
import PlayerRouter from "./player.router"


const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", UserRouter)
router.use("/posts", PostRouter)
router.use("/comments", CommentRouter)
router.use("/products", ProductRouter)
router.use("/resources", ResourceRouter)
router.use("/tutorials", TutorialsRouter)
router.use("/category", CategoryRouter)
router.use("/question", QuestionRouter)
router.use("/company", CompanyRouter)
router.use("/employee", EmployeeRouter)
router.use("/games", GamesRouter)
router.use("/players", PlayerRouter)



export default router;
