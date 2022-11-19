import { css } from "@emotion/css"
import { Button, FormControl, Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useNavigate } from "react-router"
import * as yup from 'yup'
import OrderModel from "../../models/OrderModel"
import { PAGES } from "../../utils/constants"

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.number().required()
})


const CheckoutForm = () => {
    let navigate = useNavigate()
    const { getFieldProps, handleSubmit, errors, touched ,isSubmitting} = useFormik({
        initialValues: {
            name: '',
            phone: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            try {
                let cartData = sessionStorage.getItem('cart') || '{}'
                let products = JSON.parse(cartData)
                products = Object.values(products)
                const totalPrice = products.reduce((total, { amount }) => amount + total, 0)
                let orderDetails = {
                    products,
                    userDetails: values,
                    totalPrice
                }
                await OrderModel.create({
                    data: orderDetails
                })
                resetForm()
                alert('Order placed successfully')
                sessionStorage.clear()
                navigate(PAGES.HOME_PAGE)

            }
            catch (err) {
                alert('Something went wrong')
            }
            setSubmitting(false)
        }
    })
    return (
        <section className={css({ padding: 4 })}>
            <Stack component={'form'} spacing={4} onSubmit={handleSubmit}>
                <FormControl>
                    <TextField
                        label={'Full Name'}
                        {...getFieldProps('name')}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label={'Mobile Number'}
                        {...getFieldProps('phone')}
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                    />
                </FormControl>
                <Button disabled={isSubmitting} variant="contained" type="submit" size="large">Submit</Button>
            </Stack>
        </section>
    )
}


export default CheckoutForm