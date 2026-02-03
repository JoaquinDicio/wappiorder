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

    async updateItem (req:Request, res:Response){
        res.status(200).json({msg:"Endpoint is working"})
    }
}

export default itemsController