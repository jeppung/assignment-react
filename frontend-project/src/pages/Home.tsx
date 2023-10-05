import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useAuthStore } from "../store/userAuth"
import { IAPIResponse, ITransactionsResponse } from "../interfaces/apiResponse"
import { useUserDataStore } from "../store/userData"
import { displayCurrentTime, formatCurrency } from "../utils"
import moment from 'moment';
import { useTransactionsStore } from "../store/transactionsStore"

const Home = () => {
    const { token } = useAuthStore();
    const { userData } = useUserDataStore();
    const [tempData, setTempData] = useState<Partial<ITransactionsResponse>>({})
    const [size, setSize] = useState(10)
    const [sortBy, setSortBy] = useState("date")
    const [sortDir, setSortDir] = useState("desc")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const { transactions, setTransactions } = useTransactionsStore()
    const [initialCount, setInitialCount] = useState(0)


    useEffect(() => {
        getTransactionList()
    }, [sortBy, sortDir, search, page, size])


    const getTransactionList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/transactions?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTransactions((response.data as IAPIResponse).data as ITransactionsResponse)
            setInitialCount(((response.data as IAPIResponse).data as ITransactionsResponse).count)
            setTempData((response.data as IAPIResponse).data as ITransactionsResponse)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }

    const getAnotherTransactionList = async (size: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/transactions?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return (response.data as IAPIResponse).data as ITransactionsResponse
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e)
            }
        }
    }

    const filterByThisMonth = async (data: string) => {
        switch (data) {
            case "1": {
                setSize(10)
                setSortBy("date")
                setSortBy("desc")
                break
            }
            case "2": {
                let response = await getAnotherTransactionList(initialCount)
                setSize(response!.count)
                let newTransactions = response?.data.filter((data) => moment(data.created_at).format("M") == moment(moment.now()).format("M"))
                response!.data = newTransactions!
                setTempData(response!)
                break
            }
            case "3": {
                let response = await getAnotherTransactionList(initialCount)
                setSize(response!.count)
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("M") == moment().subtract(1, "month").format("M"))
                console.log(newTransactions)
                response!.data = newTransactions!
                setTempData(response!)
                break
            }
            case "4": {
                let response = await getAnotherTransactionList(initialCount)
                setSize(response!.count)
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("YYYY") == moment(moment.now()).format("YYYY"))
                console.log(newTransactions)
                response!.data = newTransactions!
                setTempData(response!)
                break
            }
            case "5": {
                let response = await getAnotherTransactionList(initialCount)
                setSize(response!.count)
                let newTransactions = transactions.data?.filter((data) => moment(data.created_at).format("YYYY") == moment().subtract(1, "year").format("YYYY"))
                console.log(newTransactions)
                response!.data = newTransactions!
                setTempData(response!)
                break
            }
        }
    }

    const renderPageNumber = () => {
        let pages: JSX.Element[] = []
        let maxPage: number = Math.ceil(tempData.count! / size)

        for (let i = 1; i <= maxPage; i++) {
            pages.push(
                <button key={i} className={`border py-2 px-5 border-[#BDBDBD] font-bold ${page == i ? "bg-[#23A6F0] text-white" : "text-[#23A6F0]"}`} onClick={() => setPage(i)}>{i}</button>
            )
        }
        return pages
    }

    return (
        <div className="font-montserrat">
            <Navbar />
            <main className="max-w-5xl mx-auto pb-20">
                <section className="flex flex-col mt-[48px]">
                    <div>
                        <h1 className="text-4xl font-bold">{displayCurrentTime()}, {userData.first_name}</h1>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p className="text-xl">Account: {userData.wallet_id}</p>
                        <p className="text-xl">Balance:</p>
                    </div>
                    <div className="self-end mt-2">
                        <h1 className="text-5xl font-[500]">IDR {
                            userData.wallet?.balance != undefined && formatCurrency(userData.wallet.balance, 2)
                        }</h1>
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
                            <button className={`border py-2 px-5 rounded-tl-lg rounded-bl-lg border-[#BDBDBD] text-[#23A6F0]  font-bold ${page === 1 && "bg-[#F3F3F3] text-[#BDBDBD]"}`} onClick={() => {
                                setPage(1)
                            }} disabled={page === 1}>
                                First
                            </button>
                            <div className="flex">
                                {
                                    renderPageNumber()
                                }
                            </div>
                            <button className={`border py-2 px-5 rounded-tr-lg rounded-br-lg border-[#BDBDBD] text-[#23A6F0] font-bold ${page === Math.ceil(tempData.count! / size) && "bg-[#F3F3F3] text-[#BDBDBD]"}`} onClick={() => {
                                setPage(page + 1)
                            }} disabled={page === Math.ceil(tempData.count! / size) || Math.ceil(tempData.count! / size) === 0}>
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