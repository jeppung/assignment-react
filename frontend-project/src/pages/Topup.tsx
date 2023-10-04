import { useState } from "react"
import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"

const Topup = () => {
    const [selectedFrom, setSelectedFrom] = useState(1)
    const [amount, setAmount] = useState(0)

    const { userData } = useUserDataStore()

    return (
        <div className="font-montserrat flex flex-col h-screen ">
            <Navbar />
            <main className="flex justify-center items-center flex-1">
                <div>
                    <h1 className="text-4xl font-bold text-center">Top Up</h1>
                    <form action="#" className=" w-[450px] flex flex-col gap-y-5 mt-10">
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="from" className="font-bold">From</label>
                            <select onChange={(e) => setSelectedFrom(parseInt(e.target.value))} name="from" id="from" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm bg-white" required>
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
                            <input onChange={(e) => setAmount(parseInt(e.target.value))} type="number" name="amount" id="amount" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Topup