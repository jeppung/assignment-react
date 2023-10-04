import { useState } from "react"
import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import Modal from "../components/Modal"
import { IAPIResponse, ITopupResponse } from "../interfaces/apiResponse"
import { ITopupForm, ITopupState } from "../interfaces/topupForm"


const Topup = () => {
    const [selectedFrom, setSelectedFrom] = useState(1)
    const [amount, setAmount] = useState<number | string>(0)
    const [topup, setTopup] = useState<ITopupState>({
        status: false,
        data: {}
    })

    const { userData } = useUserDataStore()
    const { token } = useAuthStore()

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
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }

    return (
        <div className="font-montserrat flex flex-col h-screen ">
            {topup.status && <Modal onClose={() => {
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
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="amount" className="font-bold">Amount</label>
                            <input onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type="number" name="amount" id="amount" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Topup