import { css } from "@emotion/css"
import { Grid, Typography } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react"
import { theme } from "../../configs/theme"
import CategoriesModel from "../../models/CategoriesModel"
import ProductsModel from "../../models/ProductsModel"
import { grey } from "@mui/material/colors"
import ProductItem from "./ProductItem"


const wrapperCSS = css({
    padding: theme.spacing(8, 4),
    backgroundColor: grey.A100
})

const Products = ({ openCart }) => {
    let cartData = sessionStorage.getItem('cart') || '{}'
    let [categories, setCategories] = useState([])
    let [products, setProducts] = useState([])
    let [cart, setCart] = useState(JSON.parse(cartData))

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

    useEffect(() => {
        CategoriesModel.findAll().then(({ isError, data }) => !isError && setCategories(data))
        ProductsModel.findAll().then(({ isError, data }) => !isError && setProducts(data))
    }, [])

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
        openCart(!!Object.keys(cart).length)
    }, [cart]) // eslint-disable-line

    return (
        <>
            <section className={wrapperCSS}>

                <Typography variant="h5" className={css({ textAlign: 'center', marginBottom: theme.spacing(4) })}>Products</Typography>

                {categories.map(category => {
                    let products = productsByCategory[category.id] || []
                    return (
                        <>
                            <Grid container key={category.id} spacing={1} mb={1}>
                                {products.map(product => {
                                    product.category = category.name
                                    return (
                                        <Grid item md={3} xs={12} key={product.id}>
                                            <ProductItem product={product} addToCart={addToCart} quantity={cart[product.id]?.quantity} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </>
                    )
                })}

            </section>
        </>
    )
}

export default React.memo(Products)