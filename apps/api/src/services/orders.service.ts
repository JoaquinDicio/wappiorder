import newOrderDTO from "../types/order.interface.js"
import HttpError from "../errors/httpError.js"
import supabase from "../db/supabase.js"

const ordersService = {

    async createNewOrder(newOrder: newOrderDTO) {

        newOrder.state = "En preparacion"

        const { data, error } = await supabase
            .from("orders")
            .insert(newOrder)
            .select();

        if (error) {
            throw new HttpError(500, error.message, error)
        }

        return data
    },

    async deleteOrder() {
        return
    },

    async getOrders() {
        return
    }

}

export default ordersService