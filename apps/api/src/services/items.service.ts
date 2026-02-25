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

        if (error) throw new HttpError(500, error.message, error)

        if (data.length == 0) throw new HttpError(404, 'No se ha encontrado ningun item perteneciente al usuario.')

        return { deleted: true }
    },

    async updateItem(itemId: string, userId: string, newItemData: Partial<ItemDTO>) {

        const { data, error } = await supabase
            .from('items')
            .update(newItemData)
            .eq('user_id', userId)
            .eq('item_id', itemId)
            .select()

        if (error) throw new HttpError(500, error.message, error)

        if (data.length == 0) throw new HttpError(404, "No se ha encontrado ningun item perteneciente al usuario.")

        return data
    },

    async getItems(storeId: string) {

        const { data, error } = await supabase
            .from('items')
            .select()
            .eq('user_id', storeId)

        if (error) throw new HttpError(500, error.message, error)

        return data
    },

}

export default itemsService;

