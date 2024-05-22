import React, { Fragment, useEffect, useState } from "react";

// Mui
import { Box, Button, Container, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// react-router-dom
import { useNavigate } from "react-router-dom";

//  Formik
import { useFormik } from "formik";

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components and CSS
import Background from './../../assets/background/background.png';
import { registerValidationSchema } from "../../utils/registerValidation";
import { createUser } from "./slice";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            profilePicture: "",
            confirmPassword: ""
        },
        validationSchema: registerValidationSchema,
        onSubmit: (values, action) => {
            delete values.confirmPassword;

            const userData = new FormData();
            userData.append('firstName', values.firstName);
            userData.append('lastName', values.lastName);
            userData.append('email', values.email);
            userData.append('username', values.username);
            userData.append('profilePicture', values.profilePicture);
            userData.append('password', values.password);

            dispatch(createUser(userData));
            navigate('/login');
            action.resetForm();
        },
    });

    return (
        <Fragment>
            <Box sx={{ minHeight: '100vh' }} display={"flex"} alignItems={"center"}>
                <Container>
                    <Grid container spacing={2} alignItems={"center"} my={5}>
                        <Grid item xs={12} md={6}>
                            <Typography component="div" textAlign={"center"}>
                                <Typography variant="h5" className="black-color font-style">Register Account</Typography>
                                <Typography component="p" className="subtitle-color font-style" mt={1}>Get your free Chat account now.</Typography>
                            </Typography>
                            <Box p={3} mt={5}>
                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography component="div">
                                                <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>First Name</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter first name"
                                                    variant="outlined"
                                                    className="font-style subtitle-color"
                                                    name="firstName"
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                                    InputProps={{
                                                        sx: {
                                                            ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                                                padding: "12px 14px",
                                                                color: "#495057",
                                                                fontSize: "15px"
                                                            }
                                                        },
                                                    }}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography component="div">
                                                <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Last Name</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter last name"
                                                    variant="outlined"
                                                    className="font-style subtitle-color"
                                                    name="lastName"
                                                    value={formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                                    InputProps={{
                                                        sx: {
                                                            ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                                                padding: "12px 14px",
                                                                color: "#495057",
                                                                fontSize: "15px"
                                                            }
                                                        },
                                                    }}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="div">
                                                <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Email</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter email"
                                                    variant="outlined"
                                                    className="font-style subtitle-color"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                                    helperText={formik.touched.email && formik.errors.email}
                                                    InputProps={{
                                                        sx: {
                                                            ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                                                padding: "12px 14px",
                                                                color: "#495057",
                                                                fontSize: "15px"
                                                            }
                                                        },
                                                    }}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="div">
                                                <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Username</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter username"
                                                    variant="outlined"
                                                    className="font-style subtitle-color"
                                                    name="username"
                                                    value={formik.values.username}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                                    helperText={formik.touched.username && formik.errors.username}
                                                    InputProps={{
                                                        sx: {
                                                            ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                                                padding: "12px 14px",
                                                                color: "#495057",
                                                                fontSize: "15px"
                                                            }
                                                        },
                                                    }}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="div">
                                                <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Password</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter Password"
                                                    variant="outlined"
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="font-style subtitle-color"
                                                    name="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                                    helperText={formik.touched.password && formik.errors.password}
                                                    InputProps={{
                                                        sx: {
                                                            ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                                                                padding: "12px 14px",
                                                                color: "#495057",
                                                                fontSize: "15px"
                                                            }
                                                        },
                                                        endAdornment: (
                                                            < InputAdornment position="end" >
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="div">
                                                <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Confirm Password</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter Password"
                                                    variant="outlined"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    className="font-style subtitle-color"
                                                    name="confirmPassword"
                                                    value={formik.values.confirmPassword}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                    InputProps={{
                                                        sx: {
                                                            ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                                                                padding: "12px 14px",
                                                                color: "#495057",
                                                                fontSize: "15px"
                                                            }
                                                        },
                                                        endAdornment: (
                                                            <InputAdornment position="end" >
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowConfirmPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            mt: 8,
                                        }}>
                                        Register
                                    </Button>
                                </form>
                            </Box>
                            <Typography component="div" textAlign={"center"}>
                                <Typography component="p" className="subtitle-color font-style" mt={1}>Already have an account ?
                                    <Typography component="span" color="primary" sx={{ cursor: "pointer", fontWeight: 600 }} onClick={() => navigate('/login')}> Login</Typography>
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
                            <Box>
                                <img src={Background} alt="background" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment >
    )
}

export default RegisterPage;