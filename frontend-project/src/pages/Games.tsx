import { useEffect, useState } from "react"
import GameCard from "../components/GameCard"
import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"
import { formatCurrency } from "../utils"
import { ITopupForm } from "../interfaces/topupForm"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import { IAPIResponse, ITopupResponse } from "../interfaces/apiResponse"

const Games = () => {
    const { userData, setUserData } = useUserDataStore()
    const { token } = useAuthStore()
    const [interaction, setInteraction] = useState({
        status: true
    })
    const [chance, setChance] = useState(3)


    const topupHandler = async (amount: number) => {
        let data: ITopupForm = {
            amount: amount,
            source_of_fund_id: 3
        }

        try {
            const response = await axios.post("http://localhost:8080/transactions/top-up", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserData({ ...userData, wallet: { ...userData.wallet!, balance: userData.wallet!.balance + ((response.data as IAPIResponse).data as ITopupResponse).amount } })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }

    const displayGameCard = () => {
        let gameCards: JSX.Element[] = []
        for (let i = 0; i < 9; i++) {
            let prize = Math.floor(Math.random() * 1000001)
            const key = Math.floor(Math.random() * 1000001)
            gameCards.push(
                <GameCard id={key} key={key} prize={prize} onClickCard={(prize) => {
                    setTimeout(() => {
                        topupHandler(prize)
                        setChance(chance - 1)
                    }, 2000)
                }} isDisabled={chance === 0} />
            )
        }
        return gameCards
    }


    return (
        <div className="font-montserrat flex flex-col h-screen ">
            <Navbar />
            <main className="max-w-5xl mx-auto py-[40px] w-full">
                <section className="flex flex-col gap-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl">Good morning, {userData.first_name}</h1>
                        <p className="text-lg">Balance:</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg">Account: {userData.wallet_id}</p>
                        <h1 className="text-3xl">IDR {formatCurrency(userData.wallet?.balance as number, 2)}</h1>
                    </div>
                </section>
                <section className="mt-[48px]  w-fit mx-auto">
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        <h1 className="text-[40px] font-bold">Games</h1>
                        <p className="text-[18px]">Choose random box to get reward!</p>
                        <p className="text-[18px]">Chance: {chance}</p>
                    </div>
                    <div className={`grid grid-cols-3 grid-rows-3 mt-[48px] gap-[50px] ${!interaction.status && "pointer-events-none"}`}>
                        {
                            displayGameCard()
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Games