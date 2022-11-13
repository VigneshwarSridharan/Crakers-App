import { css } from "@emotion/css"
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, Slider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { theme } from "../../configs/theme"
import CategoriesModel from "../../models/CategoriesModel"
import ProductsModel from "../../models/ProductsModel"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from "@mui/material/colors"
import { StickyContainer, Sticky } from 'react-sticky';


const wrapperCSS = css({
    padding: theme.spacing(8, 4),
    backgroundColor: grey.A100
})

const Products = () => {
    let [categories, setCategories] = useState([])
    let [products, setProducts] = useState([])
    useEffect(() => {
        CategoriesModel.findAll().then(({ isError, data }) => !isError && setCategories(data))
        ProductsModel.findAll().then(({ isError, data }) => !isError && setProducts(data))
    }, [])
    return (
        <section className={wrapperCSS}>

            <Typography variant="h3" className={css({ textAlign: 'center', marginBottom: theme.spacing(4) })}>Products</Typography>
            <StickyContainer>
                <Grid container spacing={4}>
                    <Grid item md={4}>
                        <Sticky>
                            {({ style }) => (
                                <div style={style}>

                                    <Accordion disableGutters defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            id="price"
                                        >
                                            <Typography>Price</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails className={css({ padding: theme.spacing(4) })}>
                                            <Slider
                                                min={0}
                                                max={100}
                                            />

                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion disableGutters defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            id="category"
                                        >
                                            <Typography>Categories</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {categories.map((category, inx) => {
                                                return (
                                                    <FormGroup key={category.id}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox name={category.name} />
                                                            }
                                                            label={category.name}
                                                        />
                                                    </FormGroup>
                                                )
                                            })}

                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            )}
                        </Sticky>

                    </Grid>
                    <Grid item md={8}>
                        <Grid container spacing={4}>
                            {products.map(product => {
                                return (
                                    <Grid item md={4} key={product.id}>
                                        <Card>
                                            <div className={css({
                                                height: 300,
                                                backgroundImage: `url(${product.image})`,
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                            })} />
                                            <CardContent>
                                                <Typography>{product.name}</Typography>
                                                <Typography>{(product.price).toLocaleString('en-IN', { style: "currency", currency: "INR" })}</Typography>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </StickyContainer>

        </section>
    )
}

export default Products