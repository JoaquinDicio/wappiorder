interface newOrderDTO {
    storeId: string, // this is the store owner userId
    clientPhone: string,
    clientName: string,
    paymentMethod: 'Efectivo' | 'Transferencia',
    state: 'Completada' | 'En preparacion' | 'Pendiente de Pago'
}

export default newOrderDTO