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

    async updateOrderState(orderId: string, newState: OrderState) {

        // TODO -> needs to compare store_id from JWT against order one

        const values = ['Completada', 'En preparacion', 'Pendiente de Pago', "Preparada"]

        if (!values.includes(newState)) {
            throw new HttpError(400, 'Specified state is not allowed', { values })
        }

        const { error } = await supabase
            .from('orders')
            .update({ state: newState })
            .eq('order_id', orderId)

        if (error) throw new HttpError(500, error.message, error)

        return { ok: true }
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