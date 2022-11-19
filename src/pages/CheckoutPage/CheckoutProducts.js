import { css } from "@emotion/css"
import { Box, Grid, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { formatCurrency } from "../../utils/functions"
import ProductItem from "../HomePage/ProductItem"


const CheckoutProducts = () => {
    let cartData = sessionStorage.getItem('cart') || '{}'
    let [cart, setCart] = useState(JSON.parse(cartData))
    let products = Object.values(cart)

    const addToCart = (product, quantity) => {
        let newCart = { ...cart };
        if (quantity === 0) {
            delete newCart[product.id]
        }
        else {
            newCart[product.id] = {
                ...product,
                quantity,
                amount: product.price * quantity
            }
        }
        setCart(newCart)
    }

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart))

    }, [cart])

    const totalPrice = useMemo(() => {
        return Object.values(cart).reduce((total, { amount }) => amount + total, 0)
    }, [cart])

    return (
        <section className={css({ padding: 8 })}>
            <Typography variant="h6">Cart</Typography>
            <Grid container mb={4}>
                {products.map(product => {
                    return (
                        <Grid item xs={12} mb={4}>
                            <ProductItem product={product} addToCart={addToCart} quantity={cart[product.id]?.quantity} />
                        </Grid>
                    )
                })}
            </Grid>
            <Paper>
                <Box p={2}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5">Total</Typography>
                        <Typography variant="h5">{formatCurrency(totalPrice)}</Typography>
                    </Stack>
                </Box>
            </Paper>
        </section>
    )
}

export default CheckoutProducts