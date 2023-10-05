import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import Modal from "../components/Modal"
import { IAPIResponse, ITopupResponse } from "../interfaces/apiResponse"
import { ITopupForm, ITopupState } from "../interfaces/topupForm"

import toast, { Toaster } from 'react-hot-toast';
import InputAmount from "../components/InputAmount"

const Topup = () => {
    const [selectedFrom, setSelectedFrom] = useState(1)
    const [amount, setAmount] = useState<number | string>("")
    const [topup, setTopup] = useState<ITopupState>({
        status: false,
        data: {}
    })

    const { userData, setUserData } = useUserDataStore()
    const { token } = useAuthStore()

    useEffect(() => {
        document.title = "DigiWallet | Topup"
    }, [])

    const topupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let data: ITopupForm = {
            amount: amount as number,
            source_of_fund_id: selectedFrom
        }

        try {
            const response = await axios.post("http://localhost:8080/transactions/top-up", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTopup({ ...topup, status: true, data: (response.data as IAPIResponse).data })
            setUserData({ ...userData, wallet: { ...userData.wallet!, balance: userData.wallet!.balance + ((response.data as IAPIResponse).data as ITopupResponse).amount } })

        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast.error("Top Up minimum 50.000, maximum 10.000.000")
            }
        }
    }

    return (
        <div className="font-montserrat flex flex-col h-screen ">
            <Toaster />
            {topup.status && <Modal title="Top Up" onClose={() => {
                setTopup({ ...topup, status: false, data: {} })
                setAmount("")
                setSelectedFrom(1)
            }} data={topup.data as ITopupResponse} />}
            <Navbar />
            <main className="flex justify-center items-center flex-1">
                <div>
                    <h1 className="text-4xl font-bold text-center">Top Up</h1>
                    <form action="#" className=" w-[450px] flex flex-col gap-y-5 mt-10" onSubmit={((e) => topupHandler(e))}>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="from" className="font-bold">From</label>
                            <select onChange={(e) => setSelectedFrom(parseInt(e.target.value))} value={selectedFrom} name="from" id="from" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm bg-white" required>
                                <option value="1">Bank Transfer</option>
                                <option value="2">Credit Card</option>
                                <option value="3">Cash</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="to" className="font-bold">To</label>
                            <input value={userData.wallet_id} type="number" name="to" id="to" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required disabled />
                        </div>
                        <InputAmount value={amount} onChange={(data) => setAmount(data)} />
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Topup