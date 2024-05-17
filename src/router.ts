import { Router } from 'express';
import UserController from './controller/UserController';
import ProductController from './controller/ProductController';

const router = Router();

router.post('/users', UserController.create);
router.post('/login', UserController.login);

router.post('/products', ProductController.create);

export default router;