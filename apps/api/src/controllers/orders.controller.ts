import { Response, Request } from "express"
import ordersService from "../services/orders.service.js";
import newOrderDTO from "../types/order.interface.js";
import HttpError from "../errors/httpError.js";
import checkMissingFields from "../utils/checkMissingFields.js";

const ordersController = {

    async getOrders(req: Request, res: Response) {

        const userId = req.user?.id

        if (!userId) throw new HttpError(401, 'Debes autenticarte para ver los pedidos pendientes.')

        const response = await ordersService.getOrders(userId)

        res.status(200).json(response)
    },

    async newOrder(req: Request, res: Response) {

        const newOrder: newOrderDTO = req.body;

        newOrder.storeId = req.params.storeId || "" // atach storeId to the newOrder object

        const REQUIRED: (keyof newOrderDTO)[] = ["clientPhone", "clientName", "paymentMethod", "storeId"]

        const error = checkMissingFields(REQUIRED, newOrder)

        if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

        const response = await ordersService.createNewOrder(newOrder)

        res.status(200).json(response)
    },

    async updateOrderState(req: Request, res: Response) {

        const orderId = req.params.orderId

        const state = req.body.state

        if (!orderId || !state || !req.user) throw new HttpError(400, 'State and orderId are mandatory')

        const response = await ordersService.updateOrderState(orderId, state, req.user)

        res.status(200).json(response)
    }

}

export default ordersController