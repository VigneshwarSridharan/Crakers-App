import { css } from "@emotion/css"
import { Box, Card, CardContent, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { theme } from "../../configs/theme"
import CategoriesModel from "../../models/CategoriesModel"
import ProductsModel from "../../models/ProductsModel"
import { grey } from "@mui/material/colors"
import Counter from "../../compoents/Counter"
import { paramCase } from "change-case"
import countries from "./Countries.json"
import * as Yup from 'yup';
import {
    Form,
    FormikProvider,
    useFormik,
} from 'formik';


const wrapperCSS = css({
    padding: theme.spacing(8, 4),
    backgroundColor: grey.A100
})
const phoneRegExp = /^[0-9]{6,14}$/

const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required('Name is required'),
    last_name: Yup.string().required('Name is required'),
    // contact_mobile: Yup.string().required('Mobile number is required').matches(/^[0-9\s]+$/, 'Only numbers are allowed for this field '),
    contact_mobile: Yup.string()
        .required('Phone number is required')
        .max(18, 'Phone number is not valid')
        .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    address: Yup.mixed().required('address is required'),
    address1: Yup.mixed(),
    pin: Yup.string().required('ZipCode is required').matches(/^[0-9\s]+$/, 'Only numbers are allowed for this field '),
    country: Yup.string().required('country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),

});






const formatCurrency = amount => {
    return amount.toLocaleString('en-IN', { style: "currency", currency: "INR" })
}

const getPreviewCss = (name, size = 150,) => css({
    width: size,
    height: size,
    backgroundImage: `url(/assets/images/uploads/${paramCase(name)}.jpg)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
})

const Products = () => {
    console.log(countries);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: '',
            last_name: '',
            contact_mobile: '',
            address: null,
            address1: null,
            state: '',
            city: '',
            pin: '',
        },
        validationSchema: NewUserSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            setSubmitting(true);
            //   try {
            //     let data = JSON.parse(JSON.stringify(values));
            //     data['company_id'] = company.id;
            //     data['created_by'] = user.id;
            //     data['holiday'] = holiday;
            //     data['c_code'] = data['c_code']['phone'];
            //     dispatch(postBranch(data));
            //     setSubmitting(false);
            //   } catch (error) {
            //     console.error(error);
            //     if (isMountedRef.current) {
            //       setErrors({ afterSubmit: error.message || err_msg });
            //       setSubmitting(false);
            //     }
            //   }
        },
    });
    const {
        errors,
        values,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        getFieldProps,
        setFieldTouched,
        setValues,
    } = formik;


    console.log(errors)
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

    let cartTotalInfo = useMemo(() => {
        return Object.values(cart).reduce((final, item) => {
            final.quantity += item.quantity
            final.price += item.price
            final.total += item.quantity * item.price
            return final
        }, { quantity: 0, price: 0, total: 0 })
    }, [cart])

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
                            <Grid container key={category.id} spacing={1} mb={8}>
                                {products.map(product => {
                                    return (
                                        <Grid item md={3} xs={12} key={product.id}>
                                            <Paper className={css({
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: 4
                                            })}>
                                                <div className={css({ marginRight: theme.spacing(2) })}>
                                                    <div className={getPreviewCss(product.name, 80)} />
                                                </div>
                                                <div>
                                                    <Typography variant="body1">{product.name}</Typography>
                                                    <Typography variant="body2" color={theme.palette.primary.main} mb={2}>{formatCurrency(product.price)} / {product.content}</Typography>
                                                    <Counter value={cart[product.id]?.quantity} onChange={(quantity) => addToCart(product, quantity)} />
                                                </div>
                                            </Paper>
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

                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
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
                                                    <div className={getPreviewCss(product.name, 40)} />
                                                </TableCell>
                                                <TableCell align="left">{product.name}</TableCell>
                                                <TableCell align="center">{product.quantity}</TableCell>
                                                <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                                                <TableCell align="right">{formatCurrency(product.quantity * product.price)}</TableCell>
                                            </TableRow>

                                        )
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell align="left" colSpan={2}>Total</TableCell>
                                        <TableCell align="center">{cartTotalInfo.quantity}</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">{formatCurrency(cartTotalInfo.total)}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={6}>
                        <Paper>
                            <Box p={4}>
                                <Typography variant="h6" mb={4}>Address</Typography>
                                <Stack spacing={4}>
                                    <Grid container spacing={4}>
                                        <Grid item md={6} sm={12}>
                                            <TextField
                                                label="First Name"
                                                value={values.first_name}
                                                fullWidth
                                                {...getFieldProps('first_name')}
                                                error={Boolean(touched.first_name && errors.first_name)}
                                                helperText={touched.first_name && errors.first_name}
                                            />

                                        </Grid>
                                        <Grid item md={6} sm={12}>
                                            <TextField
                                                label="Last Name"
                                                value={values.last_name}
                                                fullWidth
                                                {...getFieldProps('last_name')}
                                                error={Boolean(touched.last_name && errors.last_name)}
                                                helperText={touched.last_name && errors.last_name}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        label="Phone Number"
                                        value={values.contact_mobile}
                                        {...getFieldProps('contact_mobile')}
                                        error={Boolean(touched.contact_mobile && errors.contact_mobile)}
                                        helperText={touched.contact_mobile && errors.contact_mobile}

                                    />
                                    <TextField
                                        label="Email Address"
                                        value={values.email}
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <TextField
                                        label="Address Line 1"
                                        value={values.address}
                                        {...getFieldProps('address')}
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                    <TextField
                                        label="Address Line 2"
                                        value={values.address1}
                                        {...getFieldProps('address1')}
                                        error={Boolean(touched.address1 && errors.address1)}
                                        helperText={touched.address1 && errors.address1}
                                    />
                                    <TextField
                                        label="Pin Code"
                                        value={values.pin}
                                        {...getFieldProps('pin')}
                                        error={Boolean(touched.pin && errors.pin)}
                                        helperText={touched.pin && errors.pin}
                                    />
                                    <Stack spacing={4} direction={"row"} sx={{ direction: 'column' }}>
                                        <TextField
                                            label="City"
                                            value={values.city}
                                            fullWidth
                                            {...getFieldProps('city')}
                                            error={Boolean(touched.city && errors.city)}
                                            helperText={touched.city && errors.city}
                                        />

                                        <TextField
                                            label="State"
                                            fullWidth
                                            value={values.state}
                                            {...getFieldProps('state')}
                                            error={Boolean(touched.state && errors.state)}
                                            helperText={touched.state && errors.state}
                                        />
                                    </Stack>
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

            </section>
        </>
    )
}

export default Products