
interface IInputAmountProps {
    onChange: (data: number) => void
    value: string | number
}

const InputAmount = ({ onChange, value }: IInputAmountProps) => {
    return (
        <div className="flex flex-col gap-y-3">
            <label htmlFor="amount" className="font-bold">Amount</label>
            <input onChange={(e) => onChange(parseInt(e.target.value))} value={value} type="number" name="amount" id="amount" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-xl h-[72px]" required />
        </div>
    )
}

export default InputAmount