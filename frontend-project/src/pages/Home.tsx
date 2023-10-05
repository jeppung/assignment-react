import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import { IAPIResponse, ISourceFundResponse, ITransactionsResponse, IUserDataResponse } from "../interfaces/apiResponse"
import { useUserDataStore } from "../store/userData"
import { formatCurrency } from "../utils"
import moment from 'moment';
import { useTransactionsStore } from "../store/transactionsStore"

const Home = () => {
    const { token } = useAuthStore();
    const { userData, setUserData } = useUserDataStore();
    const [tempData, setTempData] = useState<Partial<ITransactionsResponse>>({})
    const [sourceFunds, setSourceFunds] = useState<ISourceFundResponse[]>([])
    const [sortBy, setSortBy] = useState("date")
    const [sortDir, setSortDir] = useState("desc")
    const [search, setSearch] = useState("")
    const { transactions, setTransactions } = useTransactionsStore()

    useEffect(() => {
        getUserData()
        getSourceofFunds()
    }, [])

    useEffect(() => {
        getTransactionList()
    }, [sortBy, sortDir, search])

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

    const getTransactionList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/transactions?page=1&size=10&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTransactions((response.data as IAPIResponse).data as ITransactionsResponse)
            setTempData((response.data as IAPIResponse).data as ITransactionsResponse)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }

    const getSourceofFunds = async () => {
        try {
            const response = await axios.get("http://localhost:8080/transactions/source-of-funds", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setSourceFunds((response.data as IAPIResponse).data as ISourceFundResponse[])
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }


    const filterByThisMonth = (data: string) => {
        switch (data) {
            case "1": {
                setSortBy("date")
                setSortBy("desc")
                break
            }
            case "2": {
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("M") == moment(moment.now()).format("M"))
                console.log(newTransactions)
                setTempData({ ...tempData, data: newTransactions, count: newTransactions?.length })
                break
            }
            case "3": {
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("M") == moment().subtract(1, "month").format("M"))
                console.log(newTransactions)
                setTempData({ ...tempData, data: newTransactions, count: newTransactions?.length })
                break
            }
            case "4": {
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("YYYY") == moment(moment.now()).format("YYYY"))
                console.log(newTransactions)
                setTempData({ ...tempData, data: newTransactions, count: newTransactions?.length })
                break
            }
            case "5": {
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("YYYY") == moment().subtract(1, "year").format("YYYY"))
                console.log(newTransactions)
                setTempData({ ...tempData, data: newTransactions, count: newTransactions?.length, })
                break
            }
        }
    }






    return (
        <div className="font-montserrat">
            <Navbar />
            <main className="max-w-5xl mx-auto pb-20">
                <section className="flex flex-col mt-[48px]">
                    <div>
                        <h1 className="text-4xl font-bold">Good Morning, {userData.first_name}</h1>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p className="text-xl">Account: {userData.id}</p>
                        <p className="text-xl">Balance:</p>
                    </div>
                    <div className="self-end mt-2">
                        <h1 className="text-5xl font-[500]">IDR {formatCurrency(userData.wallet?.balance as number, 2)}</h1>
                    </div>
                </section>
                <section className="mt-[100px]">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-x-3">
                            <p>Show</p>
                            <select name="last_transaction" id="last_transaction" className="px-4 py-3 border-2 rounded-md" onChange={(e) => filterByThisMonth(e.target.value)}>
                                <option value="1">Last 10 transaction</option>
                                <option value="2">This month</option>
                                <option value="3">Last month</option>
                                <option value="4">This year</option>
                                <option value="5">Last year</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p>Sort by</p>
                            <select name="sortBy" id="sortBy" className="px-4 py-3 border-2 rounded-md" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                            </select>
                            <select name="sortDir" id="sortDir" className="px-4 py-3 border-2 rounded-md" onChange={(e) => setSortDir(e.target.value)} value={sortDir}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                            <div className="h-full relative flex items-center">
                                <i className="fa-solid fa-magnifying-glass absolute left-4"></i>
                                <input onChange={(e) => setSearch(e.target.value)} type="text" name="search" id="search" placeholder="Search" className="h-full w-full pl-12 pr-4 border-2 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className="table w-full mt-5 text-[16px] border font-[500]">
                            <thead>
                                <th className="text-start py-[10px] px-[20px]">Date & Time</th>
                                <th className="text-start py-[10px] px-[20px]">Type</th>
                                <th className="text-start py-[10px] px-[20px]">From / To</th>
                                <th className="text-start py-[10px] px-[20px]">Description</th>
                                <th className="text-start py-[10px] px-[20px]">Amount</th>
                            </thead>
                            <tbody>
                                {tempData.data?.map((transaction, i) => {
                                    return (
                                        <tr key={i} className={i % 2 == 0 ? "bg-[#EDEDED]" : "bg-white"}>
                                            <td className="py-[10px] px-[20px]">{moment(transaction.created_at).format("HH:mm - DD MMMM YYYY")}</td>
                                            <td className="py-[10px] px-[20px]">{
                                                transaction.source_of_fund_id === null ? "DEBIT" : "CREDIT"
                                            }</td>
                                            <td className="py-[10px] px-[20px]">{transaction.to_wallet_id === null ? transaction.wallet_id : transaction.to_wallet_id}</td>
                                            <td className="py-[10px] px-[20px]">{transaction.description}</td>
                                            {
                                                transaction.to_wallet_id !== null ? <td className="text-red-500 py-[10px] px-[20px]">
                                                    - {formatCurrency(transaction.amount, 2)}
                                                </td> : <td className="text-green-500 py-[10px] px-[20px]">
                                                    + {formatCurrency(transaction.amount, 2)}
                                                </td>
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="mt-5 flex">
                            <button className="border py-2 px-5 rounded-tl-lg rounded-bl-lg border-[#BDBDBD]">
                                First
                            </button>
                            <div className="flex">
                                <div className="border py-2 px-5 border-[#BDBDBD]">1</div>
                                <div className="border py-2 px-5 border-[#BDBDBD]">2</div>
                                <div className="border py-2 px-5 border-[#BDBDBD]">3</div>
                            </div>
                            <button className="border py-2 px-5 rounded-tr-lg rounded-br-lg border-[#BDBDBD]">
                                Next
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home