import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import { IAPIResponse, IUserDataResponse } from "../interfaces/apiResponse"
import { useUserDataStore } from "../store/userData"


const Home = () => {

    const { token } = useAuthStore();
    const { userData, setUserData } = useUserDataStore();

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/details", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserData((response.data as IAPIResponse).data as IUserDataResponse)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }

    return (
        <div className="font-montserrat">
            <Navbar />
            <main className="max-w-5xl mx-auto">
                <section className="flex flex-col mt-[48px]">
                    <div>
                        <h1 className="text-4xl font-bold">Good Morning, {userData.first_name}</h1>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xl">Account: {userData.id}</p>
                        <p className="text-xl">Balance:</p>
                    </div>
                    <div className="self-end">
                        <h1 className="text-5xl">{userData.wallet?.balance}</h1>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home