import { useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { IAPIResponse } from "../interfaces/apiResponse"
import { IRegisterForm } from "../interfaces/registerForm"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const splitName = () => {
        let nameSplit = name.split(" ")
        let lastName = nameSplit[nameSplit.length - 1]
        nameSplit.pop()
        let firstName = nameSplit.join(" ")

        return [firstName, lastName]
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setError("")
        e.preventDefault()

        const [firstName, lastName] = splitName()

        let data: IRegisterForm = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password
        }

        try {
            await axios.post("http://localhost:8080/register", data)
            navigate("/login")
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
                    <h1 className="text-4xl font-bold">Register</h1>
                    <form action="#" className="flex flex-col gap-y-5" onSubmit={(e) => submitHandler(e)}>
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="name" className="font-bold">Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="Asep Budiantoro Chandradiman" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="email" className="font-bold">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="asep.bc@gmail.com" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                            <p className="text-[12px] text-[#737373]">We'll never share your email with anyone else.</p>
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
                </div>
            </main>
            <div className="bg-[#23A6F0] w-[480px] justify-center h-screen absolute right-0 flex items-center px-10">
                <img src="./assets/register.svg" alt="" />
            </div>
        </div>
    )
}

export default Register