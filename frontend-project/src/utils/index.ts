import moment from "moment";

export const formatCurrency = (data: number, maxFracDigit: number) => {
    return data.toLocaleString('id-ID', { minimumFractionDigits: maxFracDigit });
}

export const displayCurrentTime = () => {
    let hour = parseInt(moment(moment.now()).format("H"))
    if (hour >= 0 && hour <= 11) {
        return "Good Morning"
    } else if (hour >= 12 && hour <= 17) {
        return "Good Afternoon"
    } else {
        return "Good Evening"
    }
}