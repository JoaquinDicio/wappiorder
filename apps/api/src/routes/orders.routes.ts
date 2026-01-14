import { Router } from 'express'
import ordersController from '../controllers/orders.controller.js'

const ordersRouter = Router()

ordersRouter.get("/", ordersController.getOrders);

ordersRouter.post("/new/:storeId", ordersController.newOrder)

ordersRouter.delete("/:orderId", ordersController.deleteOrder)

export default ordersRouter