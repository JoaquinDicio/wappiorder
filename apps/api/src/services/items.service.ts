import ItemDTO from "../types/item.interface.js";
import supabase from "../db/supabase.js";
import HttpError from "../errors/httpError.js";

const itemsService = {

    async createItem(newItem: ItemDTO, userId: string) {

        const { name, price, description } = newItem

        const { data, error } = await supabase
            .from('items')
            .insert({ user_id: userId, name, price, description })
            .select()

        if (error) throw new HttpError(500, 'Se produjo un error creando el item.', error)

        return data
    },

    async deleteItem(itemId: string, userId: string) {

        const { data, error } = await supabase
            .from('items')
            .delete()
            .eq('user_id', userId)
            .eq('item_id', itemId)
            .select()

        if (error) throw new HttpError(500, 'Ha ocurrido un error borrando el articulo.', error)

        if (data.length == 0) throw new HttpError(404, 'No se ha encontrado ningun item perteneciente al usuario.')

        return data
    },

    async updateItem(itemId: string, userId: string) { },

    async getItems(storeId: string) { }

}

export default itemsService;

