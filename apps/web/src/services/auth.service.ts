import type { AuthError } from "@supabase/supabase-js";
import supabase from "../db/supabase"

interface UserRegisterDTO {
    email: string,
    phone: string,
    password: string
}

type signUpResponse = { ok: true, data: any } | { ok: false, error: string }



const authService = {

    async signUp(authForm: UserRegisterDTO): Promise<signUpResponse> {

        const { email, password } = authForm;

        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            return { ok: false, error: this.translateError(error) }
        }

        return { ok: true, data }
    },

    translateError(error: AuthError) {

        switch (error.message) {

            case 'User already registered':
                return 'Ya existe un usuario con ese email'

            case 'Signup requires a valid password':
                return "La calve es un campo obligatorio"

            default:
                return "Ha ocurido un error inesperado"
        }

    }

}


export default authService