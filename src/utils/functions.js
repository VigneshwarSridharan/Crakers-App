

export const formatCurrency = (amount = 0) => {
    let formatAmount = amount.toLocaleString('en-IN', { style: "currency", currency: "INR" })
    return formatAmount.replace('.00', '')
}