import { Request, response, Response } from 'express'
import checkMissingFields from '../utils/checkMissingFields.js'
import HttpError from '../errors/httpError.js'
import itemsService from '../services/items.service.js'
import ItemDTO from '../types/item.interface.js'

const itemsController = {
    
    async getItems (req: Request, res: Response) {

        const { userId } = req.params as { userId: string }

        const response = await itemsService.getItems(userId)

        res.status(200).json(response)
    },

    async deleteItem(req: Request, res: Response) {

        const { itemId } = req.params as { itemId: string }

        const userId = req.user!.id

        const response = await itemsService.deleteItem(itemId, userId)

        res.status(200).json(response)
    },

    async createItem (req:Request, res: Response) {

        const newItem: ItemDTO = req.body

        const userId = req.user!.id

        const REQUIRED: (keyof ItemDTO)[] = ['name', 'price', 'description']

        const error = checkMissingFields(REQUIRED, newItem)

        if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

        const response = await itemsService.createItem(newItem, userId)

        res.status(200).json(response)
    },

    async updateItem(req: Request, res: Response) {

        const { newItemData } = req.body

        // CASE-> invalid newItemData
        if (!newItemData || typeof newItemData !== "object")
            throw new HttpError(400, "Datos inválidos")

        const itemId = req.params.id

        // CASE-> invalid itemId
        if (!itemId)
            throw new HttpError(400, "itemId requerido")

        const userId = req.user!.id

        // CASE -> not allowed fields/
        const allowedFields = ["name", "price", "description"]

        const sanitized = Object.fromEntries(
            Object.entries(newItemData).filter(([k]) => allowedFields.includes(k))
        )

        const response = await itemsService.updateItem(itemId, userId, sanitized)

        res.status(200).json(response)
    }
}

export default itemsController