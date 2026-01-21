interface newOrderDTO {
    storeId: string, // this is the store owner userId
    clientPhone: string,
    clientName: string,
    paymentMethod: 'Efectivo' | 'Transferencia',
    state: OrderState
}

type OrderState = 'Completada' | 'En preparacion' | 'Pendiente de Pago' | "Preparada"

export default newOrderDTO
