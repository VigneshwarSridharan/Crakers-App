import { css } from "@emotion/css"
import { Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import bannerImage from '../../assets/images/diwali-2022.jpg'
import { PAGES } from "../../utils/constants"
import Products from "./Products"

const HomePage = () => {
    let [open, setOpen] = useState(false)
    let navigate = useNavigate()
    return (
        <div className={css({ display: 'flex', flexDirection: 'column', height: '100%' })}>
            <div className={css({ overflow: 'auto' })}>
                <img src={bannerImage} alt="Banner" className={css({ width: '100%' })} />
                <Products openCart={setOpen} />
            </div>
            {
                open && (
                    <div className={css({ padding: 4 })}>
                        <Button variant="contained" fullWidth onClick={() => navigate(PAGES.CHECKOUT_PAGE)}>Open Cart</Button>
                    </div>
                )
            }
        </div>
    )
}

export default HomePage