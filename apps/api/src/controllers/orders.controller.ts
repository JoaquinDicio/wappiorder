import { Response, Request } from "express"

const ordersController = {

    async getOrders(req: Request, res: Response) {
        res.status(200).send({ orders: [] })
    },

    async newOrder(req: Request, res: Response) {
        const { newOrder } = req.body;
        res.status(200).json({ created: newOrder })
    },

    async deleteOrder(req: Request, res: Response) {
        const { orderId } = req.body
        res.status(201).json({ delted: orderId })
    }

}

export default ordersController