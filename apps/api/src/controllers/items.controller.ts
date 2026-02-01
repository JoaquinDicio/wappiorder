import { Request, response, Response } from 'express'
import checkMissingFields from '../utils/checkMissingFields.js'
import HttpError from '../errors/httpError.js'
import itemsService from '../services/items.service.js'

interface ItemDTO {
    userId: string,
    name: string,
    price: number,
    img_url: string,
    description: string
}

const itemsController = {
    
    async getItems (req: Request, res: Response) {
        res.status(200).json({msg:"Endpoint is working"})
    },

    async deleteItem (req: Request, res: Response) {
        const itemId = req.params.itemId

        const userId = req.user?.id

        if (!itemId) throw new HttpError(400, 'Debe especificar un itemId')

        if (!userId) throw new HttpError(401, 'No autenticado')

        const response = await itemsService.deleteItem(itemId, userId)

        res.status(200).json({ response })
    },

    async createItem (req:Request, res: Response) {

        const newItem: ItemDTO = req.body

        const userId = req.user?.id

        if (!userId) {
            throw new HttpError(401, 'No autenticado');
        }

        const REQUIRED: (keyof ItemDTO)[] = ['name', 'price', 'description']

        const error = checkMissingFields(REQUIRED, newItem)

        if (Object.keys(error).length > 0) throw new HttpError(400, 'Hay campos faltantes', error)

        const response = await itemsService.createItem(newItem, userId)

        res.status(200).json({ response })
    },

    async updateItem (req:Request, res:Response){
        res.status(200).json({msg:"Endpoint is working"})
    }
}

export default itemsController