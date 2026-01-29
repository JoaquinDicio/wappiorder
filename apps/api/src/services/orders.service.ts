import newOrderDTO from "../types/order.interface.js"
import HttpError from "../errors/httpError.js"
import supabase from "../db/supabase.js"

type OrderState = 'Completada' | 'En preparacion' | 'Pendiente de Pago' | "Preparada" | "Cancelada"

const ordersService = {

    async createNewOrder(newOrder: newOrderDTO) {

        newOrder.state = "En preparacion"

        const { data, error } = await supabase
            .from("orders")
            .insert(newOrder)
            .select();

        if (error) throw new HttpError(500, error.message, error)

        return data
    },

    async updateOrderState(orderId: string, newState: OrderState, user: { id: string }) {

        const values = ['Completada', 'En preparacion', 'Pendiente de Pago', "Preparada"]

        if (!values.includes(newState)) {
            throw new HttpError(400, 'Specified state is not allowed', { values })
        }

        const { data, error } = await supabase
            .from('orders')
            .update({ state: newState })
            .eq('order_id', orderId)
            .eq('store_id', user.id)
            .select()
        //.eq('store_id', user.id) // the 'owner' is the one who updates order state. Other way anyone with the ID could do it


        if (error) throw new HttpError(500, error.message, error)

        return { data }
    },

    async getOrders(userId: string) {

        const { data, error } = await supabase
            .from("orders")
            .select("clientPhone,clientName,paymentMethod,state")
            .eq("storeId", userId.trim());

        if (error) throw new HttpError(500, error.message, error)

        return data
    }

}

export default ordersService