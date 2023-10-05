import { useState } from 'react'
import { formatCurrency } from '../utils'

interface IGameCardProps {
    id: number
    prize: number
    onClickCard: (prize: number) => void
    setDisabledInteraction: React.Dispatch<React.SetStateAction<boolean>>
    isDisabled: boolean,
}

const GameCard = ({ id, prize, onClickCard, isDisabled, setDisabledInteraction }: IGameCardProps) => {

    const [isSelected, setIsSelected] = useState<number | null>(null)

    return (
        <button className={`h-[150px] w-[150px] border-[1px] border-[#939393] rounded-xl shadow-lg flex justify-center items-center transition ${id === isSelected && "-scale-x-100 bg-green-500"} ${isDisabled && "bg-[#BDBDBD] border-[#EB5757]"}`} onClick={() => {
            setDisabledInteraction(true)
            setIsSelected(id)
            setTimeout(() => {
                setIsSelected(null)
                onClickCard(prize)
                setDisabledInteraction(false)
            }, 2000)
        }} disabled={isDisabled}>
            <h1 className={`opacity-0 text-lg font-bold transition ${id === isSelected && "-scale-x-100 opacity-100 text-white"}`}>{formatCurrency(prize, 0)}</h1>
        </button>
    )
}

export default GameCard