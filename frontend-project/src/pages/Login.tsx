import { useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { IAPIResponse, ILoginResponse } from "../interfaces/apiResponse"
import { useAuthStore } from "../store/userAuth"
import { useNavigate } from "react-router-dom"

interface ILoginForm {
    email: string,
    password: string
}

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { setToken } = useAuthStore()
    const navigate = useNavigate()


    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setError("")
        e.preventDefault()

        let data: ILoginForm = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:8080/login", data)
            const token = ((response.data as IAPIResponse).data as ILoginResponse).token
            setToken(token)
            navigate("/")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setError((e.response?.data as IAPIResponse).message)
            }
        }
    }

    return (
        <div className="font-montserrat  flex flex-col h-screen relative">
            <Navbar />
            <main className="flex-1 flex items-center max-w-5xl mx-auto w-full">
                <div className="flex flex-col gap-y-10 w-[450px]">
                    <h1 className="text-4xl font-bold">Login</h1>
                    <form action="#" className="flex flex-col gap-y-5" onSubmit={(e) => loginHandler(e)}>
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="email" className="font-bold">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="asep.bc@gmail.com" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="password" className="font-bold">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="***************" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                        {
                            error !== "" && <p className="text-red-500">{error}</p>
                        }
                    </form>
                    <p className="text-[#252B42]">Forget password? <span className="font-[500]">Click here</span></p>
                </div>
            </main>
            <div className="bg-[#23A6F0] h-screen absolute right-0 flex items-center w-[480px] justify-center px-10">
                <img src="./assets/login.svg" alt="" />
            </div>
        </div>
    )
}

export default Login