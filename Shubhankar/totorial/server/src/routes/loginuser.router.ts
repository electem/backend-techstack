import express from "express"
import loginUserController from "../controllers/loginuser.controller";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new loginUserController();
  const response = await controller.getAuth(req);
  return res.send(response);
});

router.post("/", async (req, res) => {
    const controller = new loginUserController();
    const response = await controller.createUser(req.body);
    return res.send(response);
  });
  router.get("/:id", async (req, res) => {
    const controller = new loginUserController();
    const response = await controller.getUsers(req.params.id);
    if (!response) res.status(404).send({message: "No user found"})
    return res.send(response);
  });
  export default router