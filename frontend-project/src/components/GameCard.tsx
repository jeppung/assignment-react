import { useEffect, useState } from 'react'
import { formatCurrency } from '../utils'

interface IGameCardProps {
    id: number
    prize: number
    onClickCard: (prize: number) => void
    isDisabled: boolean,
}

const GameCard = ({ prize, onClickCard, isDisabled }: IGameCardProps) => {

    const [isSelect, setIsSelected] = useState(false)

    return (
        <button className={`h-[150px] w-[150px] border-[1px] border-[#939393] rounded-xl shadow-lg flex justify-center items-center
        ${isSelect && " transition duration-500 -scale-x-100 bg-[#27AE60]"} ${isDisabled && "border-[#EB5757] bg-[#BDBDBD]"}`} onClick={() => {
                setIsSelected(true)
                onClickCard(prize)
            }} disabled={isDisabled}>
            <h1 className={`opacity-0 text-lg font-bold ${isSelect && "transition duration-500 opacity-100 -scale-x-100 text-white"}`}>{formatCurrency(prize, 0)}</h1>
        </button>
    )
}

export default GameCard