import { Router } from "express";
import itemsController from "../controllers/items.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const itemsRouter = Router()

itemsRouter.get('/:userId', itemsController.getItems)

itemsRouter.delete('/:itemId', authMiddleware, itemsController.deleteItem)

itemsRouter.post('/',authMiddleware, itemsController.createItem)

itemsRouter.put('/',authMiddleware, itemsController.updateItem)

export default itemsRouter