import { IModal } from "../interfaces/modal"
import { formatCurrency } from "../utils"

const Modal = ({ data, onClose, title }: IModal) => {

    return (
        <div className="absolute bg-black/20 h-full w-full flex justify-center items-center">
            <div>
                <h1 className="text-4xl font-bold text-black/20 text-center">{title}</h1>
                <div className="bg-white w-[488px] rounded-xl flex justify-center mt-5 p-[40px]">
                    <div className="flex flex-col justify-center items-center w-full">
                        <div>
                            <img src="./assets/icon_success.svg" className="w-16 h-16" alt="" />
                        </div>
                        <h1 className="text-3xl text-[#2DC071] font-bold p-[40px]">{title} Success</h1>
                        <div className="w-full flex flex-col gap-y-3">
                            <div className="flex justify-between items-baseline">
                                <p>Amount</p>
                                <h1 className="font-bold text-3xl">{formatCurrency(data.amount, 0)}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Transaction Id</p>
                                <h1>338899318231301</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>From</p>
                                <h1>{data.source_of_fund_id !== null ? `100${data.source_of_fund_id}` : data.wallet_id}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>To</p>
                                <h1>{data.to_wallet_id !== null ? data.to_wallet_id : data.wallet_id}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Description</p>
                                <h1>{data.description}</h1>
                            </div>
                            <div className="flex justify-center gap-x-5 mt-[40px]">
                                <button className="border-2 rounded-md px-[20px] py-[10px] border-[#23A6F0] text-[#23A6F0] font-bold">Print</button>
                                <button onClick={() => onClose()} className="border-2 rounded-md px-[20px] py-[10px] border-[#23A6F0] text-[#23A6F0] font-bold">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal