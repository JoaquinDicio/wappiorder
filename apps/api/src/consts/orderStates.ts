export const ORDER_STATES = {
    PENDING_PAYMENT: 'Pendiente de Pago',
    PREPARING: 'En preparacion',
    READY: 'Preparada',
    COMPLETED: 'Completada',
    CANCELED: 'Cancelada'
} as const

export type OrderStateKey = keyof typeof ORDER_STATES
