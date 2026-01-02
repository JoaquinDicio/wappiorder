export interface OrderDTO {
    store_id: string,
    client_phone: string,
    client_name: string,
    payment_method: 'Efectivo' | 'Tarjeta' | 'Mercadopago'
}