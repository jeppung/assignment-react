import { useState } from "react";
import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"
import { IAPIResponse, ITopupResponse } from "../interfaces/apiResponse";
import Modal from "../components/Modal";
import axios from "axios";
import { useAuthStore } from "../store/userAuth";
import toast, { Toaster } from "react-hot-toast";
import { ITransferForm, ITransferState } from "../interfaces/transferForm";



const Transfer = () => {
    const { userData, setUserData } = useUserDataStore();
    const { token } = useAuthStore();
    const [amount, setAmount] = useState<number | string>("")
    const [description, setDescription] = useState("")
    const [to, setTo] = useState<number | string>("")

    const [transfer, setTransfer] = useState<ITransferState>({
        status: false,
        data: {}
    })


    const transferHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let data: ITransferForm = {
            amount: amount as number,
            description: description,
            to: to as number
        }

        try {
            const response = await axios.post("http://localhost:8080/transactions/transfer", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTransfer({ ...transfer, status: true, data: ((response.data as IAPIResponse).data) })
            setUserData({ ...userData, wallet: { ...userData.wallet!, balance: userData.wallet!.balance - ((response.data as IAPIResponse).data as ITopupResponse).amount } })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast.error("Transfer minimum 1.000, maximum 50.000.000")
            }
        }
    }

    return (
        <div className="font-montserrat flex flex-col h-screen ">
            <Toaster />
            {transfer.status && <Modal title="Transfer" onClose={() => {
                setTransfer({ ...transfer, status: false, data: {} })
                setAmount("")
                setDescription("")
                setTo("")
            }} data={transfer.data as ITopupResponse} />}
            <Navbar />
            <main className="flex justify-center items-center flex-1">
                <div>
                    <h1 className="text-4xl font-bold text-center">Transfer</h1>
                    <form action="#" className=" w-[450px] flex flex-col gap-y-5 mt-10" onSubmit={(e) => transferHandler(e)} data-testid="transfer-form">
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="from" className="font-bold">From</label>
                            <input value={userData.wallet_id} type="number" name="from" id="from" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required disabled />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="to" className="font-bold">To</label>
                            <input onChange={(e) => setTo(parseInt(e.target.value))} value={to} type="number" name="to" id="to" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="amount" className="font-bold">Amount</label>
                            <input onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type="number" name="amount" id="amount" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-xl h-[72px]" required />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="description" className="font-bold">Description</label>
                            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" id="description" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required maxLength={35} />
                        </div>
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Transfer