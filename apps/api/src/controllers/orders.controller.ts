import { Response, Request } from "express"
import ordersService from "../services/orders.service.js";
import newOrderDTO from "../types/order.interface.js";
import HttpError from "../errors/httpError.js";
import checkMissingFields from "../utils/checkMissingFields.js";

const ordersController = {

    async getOrders(req: Request, res: Response) {

        const userId = req.user!.id

        const response = await ordersService.getOrders(userId)

        res.status(200).json(response)
    },

    async newOrder(req: Request, res: Response) {

        const newOrder: newOrderDTO = req.body;

        const { storeId } = req.params as { storeId: string }

        newOrder.storeId = storeId // atach storeId to the newOrder object

        const REQUIRED: (keyof newOrderDTO)[] = ["clientPhone", "clientName", "paymentMethod", "storeId"]

        const error = checkMissingFields(REQUIRED, newOrder)

        if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

        const response = await ordersService.createNewOrder(newOrder)

        res.status(200).json(response)
    },

    async updateOrderState(req: Request, res: Response) {

        const { orderId } = req.params as { orderId: string }

        const userId = req.user!.id

        const state = req.body.state

        if (state?.trim() === "" || !state) throw new HttpError(400, 'State and orderId are mandatory')

        const response = await ordersService.updateOrderState(orderId, state, userId)

        res.status(200).json(response)
    }

}

export default ordersController