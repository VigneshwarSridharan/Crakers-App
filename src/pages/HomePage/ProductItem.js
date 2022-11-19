import { css } from "@emotion/css"
import { Paper, Typography } from "@mui/material"
import { paramCase } from "change-case"
import Counter from "../../compoents/Counter"
import { theme } from "../../configs/theme"
import { formatCurrency } from "../../utils/functions"

const getPreviewCss = (name, size = 150,) => css({
    width: size,
    height: size,
    backgroundImage: `url(/assets/images/uploads/${paramCase(name)}.jpg)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
})


const ProductItem = ({product = {},addToCart=() => {},quantity=0}) => {
    return (
        <Paper className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 4
        })}>
            <div className={css({ marginRight: 8 })}>
                <div className={getPreviewCss(product.name, 80)} />
            </div>
            <div className={css({width:'100%'})}>
                <Typography variant="body1"><b>{product.name}</b></Typography>
                <div className={css({ display: 'flex', alignItems:'center', justifyContent:'space-between' })}>
                    <div>
                        <Typography color={"gray"} >{product.category}</Typography>
                        <Typography variant="body2" color={theme.palette.primary.main} mb={2}>{formatCurrency(product.price)} / {product.content}</Typography>
                    </div>
                    <div className={css({marginRight:8})}>
                        <Counter value={quantity} onChange={(quantity) => addToCart(product, quantity)} />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default ProductItem