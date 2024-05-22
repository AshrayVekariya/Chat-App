import React, { Fragment } from "react";

// Mui
import { ThemeProvider, createTheme } from "@mui/material";

// react-router-dom
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

// Components and CSS
import { privateRoutes, publicRoutes } from "../routing";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5eb1c1",
            light: '#89c5d0',
            dark: '#588e99',
            contrastText: '#fff',
        }
    },
});

const IndexRouter = () => {

    const RequireAuth = () => {
        const location = useLocation();
        const token = localStorage.getItem('chatAppToken');
        if (!token) {
            return <Navigate to='/login' replace />;
        } if (token && (location.pathname === '/login' || location.pathname === '/')) {
            return <Navigate to='/dashboard' replace />;
        } return <Outlet />
    };

    const RedirectIfLoggedIn = ({ element }) => {
        const location = useLocation();
        const token = localStorage.getItem('chatAppToken');
        if (!token) {
            return element;
        } if (token && (location.pathname === '/login' || location.pathname === '/')) {
            return <Navigate to='/dashboard' replace />;
        } return <Outlet />
    };

    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        {
                            publicRoutes.map((routes) => {
                                return (
                                    <Route
                                        key={routes.to}
                                        element={<RedirectIfLoggedIn element={routes.element} />}
                                        path={routes.to}
                                    />
                                );
                            })
                        }
                        <Route element={<RequireAuth />} path='/'>
                            {
                                privateRoutes.map((route) => {
                                    return (
                                        <Route
                                            key={route.to}
                                            element={route.element}
                                            path={route.to}
                                        />
                                    );
                                })
                            }
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Fragment >
    )
}

export default IndexRouter;