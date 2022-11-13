import { css } from "@emotion/css"
import { paramCase } from "change-case"
import { useEffect } from "react"
import bannerImage from '../../assets/images/diwali-2022.jpg'
import CategoriesModel from "../../models/CategoriesModel"
import ProductsModel from "../../models/ProductsModel"
import Products from "./Products"

const HomePage = () => {
    useEffect(() => {
        (async () => {
            // 

            let { isError, data: products } = await ProductsModel.findAll()


            for (const product of products) {
                product.image = paramCase(product.name)
                let result = await ProductsModel.update({
                    where: { id: product.id },
                    data: product
                })
                console.log(result)
            }


        })();
    }, [])
    return (
        <>
            <img src={bannerImage} alt="Banner" className={css({ width: '100%' })} />
            <Products />
        </>
    )
}

export default HomePage