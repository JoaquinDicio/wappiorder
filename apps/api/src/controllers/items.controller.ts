import {Request, Response} from 'express'

const itemsController = {
    
    async getItems (req: Request, res: Response) {
        res.status(200).json({msg:"Endpoint is working"})
    },

    async deleteItem (req: Request, res: Response) {
        res.status(200).json({msg:"Endpoint is working"})
    },

    async createItem (req:Request, res: Response) {
        res.status(200).json({msg:"Endpoint is working"})
    },

    async updateItem (req:Request, res:Response){
        res.status(200).json({msg:"Endpoint is working"})
    }
}

export default itemsController