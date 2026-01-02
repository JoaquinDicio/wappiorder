import { Response, Request } from "express"
import ordersService from "../services/orders.service.js";

const ordersController = {

    async getOrders(req: Request, res: Response) {

        const response = await ordersService.getOrders()

    },

    async newOrder(req: Request, res: Response) {

        const { newOrder } = req.body;

        const userId = req.user?.id

        const response = await ordersService.createNewOrder({ ...newOrder, userId })

        res.status(200).json(response)
    },

    async deleteOrder(req: Request, res: Response) {

        const { orderId } = req.body

        res.status(201).json({ delted: orderId })

    }

}

export default ordersController