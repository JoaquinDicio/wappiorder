import { OrderDTO } from "../types/order.interface.js"
import checkMissingFields from "../utils/checkMissingFields.js"
import HttpError from "../errors/httpError.js"

const ordersService = {

    async createNewOrder(newOrder: OrderDTO) {

        const REQUIRED: (keyof OrderDTO)[] = ["client_phone", "client_name", "payment_method"]

        const error = checkMissingFields(REQUIRED, newOrder)

        if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)



    },

    async deleteOrder() {
        return
    },

    async getOrders() {
        return
    }

}

export default ordersService