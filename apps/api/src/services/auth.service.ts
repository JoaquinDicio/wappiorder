import supabase from "../db/supabase.js"
import { SignUpDTO } from "../types/auth.interface.js"

const authService = {
    async createNewUser(userData: SignUpDTO) {
        // logic to add user to db
        return userData
    }
}

export default authService

