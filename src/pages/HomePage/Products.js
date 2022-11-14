import { css } from "@emotion/css"
import { Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { theme } from "../../configs/theme"
import CategoriesModel from "../../models/CategoriesModel"
import ProductsModel from "../../models/ProductsModel"
import { grey } from "@mui/material/colors"
import Counter from "../../compoents/Counter"


const wrapperCSS = css({
    padding: theme.spacing(8, 4),
    backgroundColor: grey.A100
})

const formatCurrency = amount => {
    return amount.toLocaleString('en-IN', { style: "currency", currency: "INR" })
}

const getPreviewCss = (image, size = 150,) => css({
    width: size,
    height: size,
    backgroundImage: `url(${image})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
})

const Products = () => {
    let [categories, setCategories] = useState([])
    let [products, setProducts] = useState([])
    let [cart, setCart] = useState({})

    let productsByCategory = useMemo(() => {
        return products.reduce((final, item) => {
            const categoryId = item.categoryRef.replace('categories/', '')
            if (final[categoryId]) {
                final[categoryId].push(item)
            }
            else {
                final[categoryId] = [item]
            }
            return final
        }, {})
    }, [products])
    console.log({ productsByCategory })
    useEffect(() => {
        CategoriesModel.findAll().then(({ isError, data }) => !isError && setCategories(data))
        ProductsModel.findAll().then(({ isError, data }) => !isError && setProducts(data))
    }, [])

    const addToCart = (product, quantity) => {
        setCart(cart => ({
            ...cart,
            [product.id]: {
                ...product,
                quantity
            }
        }))
    }

    console.log(cart)

    return (
        <>
            <section className={wrapperCSS}>

                <Typography variant="h3" className={css({ textAlign: 'center', marginBottom: theme.spacing(4) })}>Products</Typography>

                {categories.map(category => {
                    let products = productsByCategory[category.id] || []
                    return (
                        <>
                            <Typography variant="h5" mb={4} p={3} >{category.name}</Typography>
                            <Grid container key={category.id} spacing={4} mb={8}>
                                {products.map(product => {
                                    return (
                                        <Grid item md={3} xs={12} key={product.id}>
                                            <Card >
                                                <CardContent className={css({
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                })}>
                                                    <div className={css({ marginRight: theme.spacing(2) })}>
                                                        <div className={getPreviewCss(product.image, 150)} />
                                                    </div>
                                                    <Typography variant="h6">{product.name}</Typography>
                                                    <Typography variant="h5" color={theme.palette.primary.main} mb={2}>{formatCurrency(product.price)} / {product.content}</Typography>
                                                    <Counter value={cart[product.id]?.quantity} onChange={(quantity) => addToCart(product, quantity)} />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </>
                    )
                })}

            </section>
            <section className={wrapperCSS}>
                <Typography variant="h3" className={css({ textAlign: 'center', marginBottom: theme.spacing(4) })} p={3} mb={8}>Cart</Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Item</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(cart).map(product => {
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell align="left">
                                            <div className={getPreviewCss(product.image, 40)} />
                                        </TableCell>
                                        <TableCell align="left">{product.name}</TableCell>
                                        <TableCell align="center">{product.quantity}</TableCell>
                                        <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                                        <TableCell align="right">{formatCurrency(product.quantity * product.price)}</TableCell>
                                    </TableRow>

                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </section>
        </>
    )
}

export default Products