import React, { Fragment } from "react";

// Mui
import { Box, Typography } from "@mui/material";

// Components and CSS
import Background from './../../assets/background/background.png';

const Welcome = ({drawerWidth}) => {
    return (
        <Fragment>
            <Typography variant='div' justifyContent={'center'} display={'flex'} alignItems={'center'} sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                minHeight: "100vh",
                py: 2
            }}>
                <Box textAlign={'center'}>
                    <Typography variant="h5" className='black-color font-style'>Welcome to Chat App</Typography>
                    <img src={Background} alt="background" />
                </Box>
            </Typography>
        </Fragment>
    )
}

export default Welcome;