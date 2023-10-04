
export const formatCurrency = (data: number, maxFracDigit: number) => {
    return data.toLocaleString('id-ID', { minimumFractionDigits: maxFracDigit });
}