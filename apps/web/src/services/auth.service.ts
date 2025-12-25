import { type SignUpDTO } from "../types/auth.interface"

type signUpResponse = { ok: true, data: any } | { ok: false, error: Error }


const authService = {

    async signUp(formData: SignUpDTO): Promise<signUpResponse> {

        const { password, email, phone } = formData

        return { ok: true, data: { password, email, phone } }
    },

}


export default authService