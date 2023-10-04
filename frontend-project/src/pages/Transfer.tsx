import Navbar from "../components/Navbar"
import { useUserDataStore } from "../store/userData"

const Transfer = () => {
    const { userData } = useUserDataStore();

    return (
        <div className="font-montserrat flex flex-col h-screen ">
            <Navbar />
            <main className="flex justify-center items-center flex-1">
                <div>
                    <h1 className="text-4xl font-bold text-center">Transfer</h1>
                    <form action="#" className=" w-[450px] flex flex-col gap-y-5 mt-10">
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="from" className="font-bold">From</label>
                            <input value={userData.wallet_id} type="number" name="from" id="from" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required disabled />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="to" className="font-bold">To</label>
                            <input type="number" name="to" id="to" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="amount" className="font-bold">Amount</label>
                            <input type="number" name="amount" id="amount" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label htmlFor="description" className="font-bold">Description</label>
                            <input type="text" name="description" id="description" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Transfer