import { css } from "@emotion/css"
import bannerImage from '../../assets/images/diwali-2022.jpg'
import Products from "./Products"

const HomePage = () => {
    return (
        <>
            <img src={bannerImage} alt="Banner" className={css({ width: '100%' })} />
            <Products />
        </>
    )
}

export default HomePage