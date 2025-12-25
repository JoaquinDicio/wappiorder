import { useState } from "react"
import { type FormEvent, type ChangeEvent } from "react"
import authService from "../services/auth.service"

interface UserRegisterDTO {
    email: string,
    phone: string,
    password: string
}


export default function RegisterForm() {

    const [authForm, setAuthForm] = useState<UserRegisterDTO>({ email: "", password: "", phone: "" })

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setAuthForm((prev) => ({ ...prev, [name]: value }))
    }


    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const response = await authService.signUp(authForm);

        if (!response.ok) {
            console.log(response.error)
            return
        }

        console.log("Registrado correctamente")
    }

    return <form className="p-10 flex gap-2 flex-col" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-xl mb-5">Registrarse</h1>
        <input type="email" className="px-2 py-1 rounded-sm bg-gray-100 border" name="email" value={authForm.email} onChange={(e) => { handleInputChange(e) }} placeholder="Email" />
        <input type="text" className="px-2 py-1 rounded-sm bg-gray-100 border" name="phone" value={authForm.phone} onChange={(e) => { handleInputChange(e) }} />
        <input type="password" className="px-2 py-1 rounded-sm bg-gray-100 border" name="password" value={authForm.password} onChange={(e) => { handleInputChange(e) }} placeholder="Clave" />
        <input type="submit" className="w-fit px-2 py-1 bg-blue-500 rounded-sm text-white cursor-pointer" value={'Registrarse'} />
    </form>
}