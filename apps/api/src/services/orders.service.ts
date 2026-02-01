import newOrderDTO from "../types/order.interface.js"
import HttpError from "../errors/httpError.js"
import supabase from "../db/supabase.js"
import { ORDER_STATES, OrderStateKey } from "../consts/orderStates.js"

const ordersService = {

    async createNewOrder(newOrder: newOrderDTO) {

        const { clientName, clientPhone, paymentMethod, storeId } = newOrder

        newOrder.state = ORDER_STATES.PREPARING

        // TODO>> Buscar una mejor forma de evitar que ingrese cualquier cosa a la DB
        const { data, error } = await supabase
            .from("orders")
            .insert({ clientName, clientPhone, paymentMethod, state: newOrder.state, store_id: storeId, subtotal: 0 })
            .select();

        if (error) throw new HttpError(500, error.message, error)

        return data
    },

    async updateOrderState(orderId: string, newState: OrderStateKey, userId: string) {

        if (!ORDER_STATES[newState]) throw new HttpError(400, 'El estado especificado no existe.')

        const { data, error } = await supabase
            .from('orders')
            .update({ state: ORDER_STATES[newState] })
            .eq('order_id', orderId)
            .eq('store_id', userId) // the 'owner' is the one who updates order state. Other way anyone with the ID could do it
            .select()

        if (error) throw new HttpError(500, error.message, error)

        if (data.length === 0) throw new HttpError(404, 'No se ha encontrado ninguna orden perteneciente al usuario.')

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