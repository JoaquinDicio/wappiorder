import ItemDTO from "../types/item.interface.js";

const itemsService = {

    async createItem(newItem: ItemDTO, userId: string) {
    },

    async deleteItem(itemId: string, userId: string) { },

    async updateItem(itemId: string, userId: string) { },

    async getItems(storeId: string) { }

}

export default itemsService;

