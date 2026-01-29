import { Router } from 'express'
import ordersController from '../controllers/orders.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const ordersRouter = Router()

ordersRouter.get("/", authMiddleware, ordersController.getOrders);

ordersRouter.post("/new/:storeId", ordersController.newOrder)

ordersRouter.put("/:orderId", authMiddleware, ordersController.updateOrderState)

export default ordersRouter