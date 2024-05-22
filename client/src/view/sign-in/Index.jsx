import React, { Fragment, useState } from "react";

// Mui
import { Box, Button, Container, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// react-router-dom
import { useNavigate } from "react-router-dom";

// Formik
import { useFormik } from 'formik';

// Axios
import axios from './../../axios/interceptor';

// Components and CSS
import Toast from "../../components/tostify/Index";
import Background from './../../assets/background/background.png';
import { loginValidationSchema } from "../../utils/signInValidation";

const SignInPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values, action) => {
            axios.post(`/authentication/sign-in`, values)
                .then(response => {
                    localStorage.setItem("chatAppToken", response?.data?.token);
                    Toast(response?.data?.message, "success");
                    navigate('/dashboard');
                    action.resetForm();
                })
                .catch(err => {
                    Toast(err?.response?.data?.message, 'error');
                })
        },
    });

    return (
        <Fragment>
            <Box sx={{ minHeight: '100vh' }} display={"flex"} alignItems={"center"}>
                <Container>
                    <Grid container spacing={2} alignItems={"center"} my={5}>
                        <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
                            <Box>
                                <img src={Background} alt="background" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography component="div" textAlign={"center"}>
                                <Typography variant="h5" className="black-color font-style">Welcome Back!</Typography>
                                <Typography component="p" className="subtitle-color font-style" mt={1}>Sign in to contionue to Chat.</Typography>
                            </Typography>
                            <Box p={3} mt={5}>
                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <Typography component="div" mb={2}>
                                        <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Username</InputLabel>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter username or email"
                                            name="username"
                                            variant="outlined"
                                            className="font-style subtitle-color"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                            InputProps={{
                                                sx: {
                                                    ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
                                                        padding: "12px 14px",
                                                        color: "#495057",
                                                        fontSize: "15px"
                                                    }
                                                },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon height="20px" width="20px" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Typography>
                                    <Typography variant="div" mb={1}>
                                        <Typography component="div" display={"flex"} justifyContent={"space-between"}>
                                            <InputLabel className="font-style black-color" sx={{ fontWeight: 600, mb: 1 }}>Password</InputLabel>
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            placeholder="Enter Password"
                                            variant="outlined"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="font-style subtitle-color"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            InputProps={{
                                                sx: {
                                                    ".css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
                                                        padding: "12px 14px",
                                                        color: "#495057",
                                                        fontSize: "15px"
                                                    }
                                                },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HttpsIcon height="20px" width="20px" />
                                                    </InputAdornment>
                                                ),

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
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        sx={{
                                            mt: 8,
                                        }}>
                                        Log In
                                    </Button>
                                </form>
                            </Box>
                            <Typography component="div" textAlign={"center"}>
                                <Typography component="p" className="subtitle-color font-style" mt={1}>Don't have an account ?
                                    <Typography component="span" color="primary" sx={{ cursor: "pointer", fontWeight: 600 }} onClick={() => navigate('/register')}> Register</Typography>
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment >
    )
}

export default SignInPage;