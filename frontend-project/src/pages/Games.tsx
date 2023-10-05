import { useEffect, useState } from "react"
import GameCard from "../components/GameCard"
import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"
import { displayCurrentTime, formatCurrency } from "../utils"
import { ITopupForm } from "../interfaces/topupForm"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import { IAPIResponse, ITopupResponse } from "../interfaces/apiResponse"
import toast, { Toaster } from "react-hot-toast"

const Games = () => {
    const { userData, setUserData } = useUserDataStore()
    const { token } = useAuthStore()
    const [chance, setChance] = useState<number>(3)
    const [prizes, setPrizes] = useState<number[]>([])
    const [disabledInteraction, setDisabledInteraction] = useState(false)

    useEffect(() => {
        preparingPrizes()
    }, [chance])

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

    const preparingPrizes = () => {
        let temp = []
        for (let i = 0; i < 9; i++) {
            let prize = Math.floor(Math.random() * (1000000 - 50000 + 1)) + 50000;
            temp.push(prize)
        }
        setPrizes(temp)
    }


    return (
        <div className="font-montserrat flex flex-col h-screen ">
            <Toaster />
            <Navbar />
            <main className="max-w-5xl mx-auto py-[40px] w-full">
                <section className="flex flex-col gap-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl">{displayCurrentTime()}, {userData.first_name}</h1>
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
                    <div className={`grid grid-cols-3 grid-rows-3 mt-[48px] gap-[50px] ${disabledInteraction && "pointer-events-none"}`}>
                        {
                            prizes.map((prize, i) => {
                                return (
                                    <GameCard setDisabledInteraction={setDisabledInteraction} key={i} id={i} prize={prize} isDisabled={chance === 0} onClickCard={(prize) => {
                                        toast((_) => (
                                            <div>
                                                <h1>Congratulation</h1>
                                                <p>You Win, <span className="font-bold text-xl">{formatCurrency(prize, 0)}</span></p>
                                            </div>
                                        ), {
                                            icon: "🎉"
                                        })
                                        topupHandler(prize)
                                        setChance(chance - 1)
                                    }} />
                                )
                            })
                        }
                    </div>
                </section >
            </main >
        </div >
    )
}

export default Games