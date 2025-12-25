import { SignUpPayload } from "../types/auth.interface.js"
import supabase from "../db/supabase.js"

const authService = {
    async createNewUser(userData: SignUpPayload) {
        // logic to add user to db
    }
}

export default authService

