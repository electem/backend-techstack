import express from 'express';
import PingController from '../controllers/ping.controller';
import PostRouter from './post.router';
import UserRouter from './user.router';
import CommentRouter from './comment.router';
import ChocolateRouter from '../controllers/chocolate/chocolate_lists/chocolate.router';
import RankRouter from '../controllers/studentmanagement/studentsranking/rankallotment.router';
import ProductRouter from '../controllers/canbrowser/product.router';
import ResourcesRouter from '../controllers/canbrowser/resource.router';
import TutorialRouter from '../routes/tutorial.router';
import CategoryRouter from '../routes/category.router';

const router = express.Router();

router.get('/ping', async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use('/users', UserRouter);
router.use('/posts', PostRouter);
router.use('/comments', CommentRouter);
router.use('/students', RankRouter);
router.use('/chocolates', ChocolateRouter);
router.use('/products', ProductRouter);
router.use('/resources', ResourcesRouter);
router.use('/tutorial', TutorialRouter);
router.use('/category', CategoryRouter);
export default router;
