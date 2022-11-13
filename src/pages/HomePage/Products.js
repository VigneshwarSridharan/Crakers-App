import { css } from "@emotion/css"
import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import { theme } from "../../configs/theme"

const wrapperCSS = css({
    padding: theme.spacing(8, 0)
})

const Products = () => {
    return (
        <section className={wrapperCSS}>
            <Container fixed>
                <Typography variant="h3" className={css({ textAlign: 'center' })}>Products</Typography>
                <Grid container spacing={4}>
                    <Grid item md={4}>
                        <Paper className={css({ padding: theme.spacing(4) })}>
                            dsdfsdf
                        </Paper>
                    </Grid>
                    <Grid item md={8}></Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default Products