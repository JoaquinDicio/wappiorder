import { Router } from 'express'
import ordersController from '../controllers/orders.controller.js'

const ordersRouter = Router()

ordersRouter.get("", ordersController.getOrders);

ordersRouter.post("", ordersController.newOrder)

ordersRouter.delete("", ordersController.deleteOrder)

export default ordersRouter