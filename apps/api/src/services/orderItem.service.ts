import OrderItemDTO from "../types/orderItem.interface.js"
import supabase from "../db/supabase.js"
import HttpError from "../errors/httpError.js"

const orderItemService = {

    async saveItems(items: OrderItemDTO[], orderId: string) {

        //STEP 1: Get items data from supabase
        const ids = items.map(i => i.item_id)

        const { data: products, error } = await supabase
            .from("items")
            .select("item_id, price")
            .in("item_id", ids)

        if (error) throw new HttpError(500, error.message, error)

        if (!products || products.length === 0) {
            throw new HttpError(400, "Items not found")
        }

        const pricesMap = Object.fromEntries(
            products.map(p => [p.item_id, p.price])
        )

        // STEP 2: Prepare rows for insert
        const orderItems = items.map(i => ({
            order_id: orderId,
            item_id: i.item_id,
            quantity: i.quantity,
            price: pricesMap[i.item_id]
        }))

        // STEP 3: Insert batch
        const { error: insertError } = await supabase
            .from("order_items")
            .insert(orderItems)

        if (insertError) throw new HttpError(500, insertError.message, insertError)

        return orderItems
    }
}

export default orderItemService

//PRINCIPAL TASKS -> calcular el subtotal de cada item, guardarse en DB