import newOrderDTO from "../types/order.interface.js"
import HttpError from "../errors/httpError.js"
import supabase from "../db/supabase.js"
import { ORDER_STATES, OrderStateKey } from "../consts/orderStates.js"

const ordersService = {

    async createNewOrder(newOrder: newOrderDTO) {

        newOrder.state = ORDER_STATES.PREPARING

        const { data, error } = await supabase
            .from("orders")
            .insert(newOrder)
            .select();

        if (error) throw new HttpError(500, error.message, error)

        return data
    },

    async updateOrderState(orderId: string, newState: OrderStateKey, user: { id: string }) {

        if (!ORDER_STATES[newState]) throw new HttpError(400, 'El estado especificado no existe.')

        const { data, error } = await supabase
            .from('orders')
            .update({ state: ORDER_STATES[newState] })
            .eq('order_id', orderId)
            .eq('store_id', user.id) // the 'owner' is the one who updates order state. Other way anyone with the ID could do it
            .select()

        if (error) throw new HttpError(500, error.message, error)

        if (data.length < 1) throw new HttpError(403, 'No tienes permisos para modificar esta orden.')

        return { data }
    },

    async getOrders(userId: string) {

        const { data, error } = await supabase
            .from("orders")
            .select("clientPhone,clientName,paymentMethod,state")
            .eq("store_id", userId.trim());

        if (error) throw new HttpError(500, error.message, error)

        return data
    }

}

export default ordersService