import React, { Fragment, useEffect, useState } from "react";

// Mui
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

// react-router-dom
import { useNavigate } from "react-router-dom";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// Jwt-decode
import { jwtDecode } from "jwt-decode";

// Components and CSS
import ProfileImage from './../../assets/profile/blanck-profile-image.png';
import { getUserById } from "../../view/register/slice";

const NavigationBar = ({ drawerWidth, selectedUser, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const dropDown = Boolean(anchorEl);

    useEffect(() => {
        const token = localStorage.getItem('chatAppToken');
        if (token) {
            const decode = jwtDecode(token);
            dispatch(getUserById(decode.id));
        }
    }, []);

    useEffect(() => {
        setCurrentUser(selector?.user?.getUser)
    }, [selector?.user])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        localStorage.removeItem('chatAppToken');
        navigate('/login');
    }

    return (
        <Fragment>
            <AppBar
                position="fixed"
                className='header'
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    py: 1,
                    background: { xs: "#f0f4f9", md: "#fff" }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' }, color: "#495057" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="div" display={'flex'} alignItems={"center"} gap={2} sx={{ flexGrow: 1 }}>
                        {
                            selectedUser && <>
                                <Avatar alt="Travis Howard" sizes='small' src={selectedUser?.profilePicture ? `${process.env.REACT_APP_BASE_URI}/${selectedUser?.profilePicture}` : ProfileImage} />
                                <Typography component="p" className='font-style' color={"#000"}>{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</Typography>
                            </>
                        }
                    </Typography>
                    <Avatar
                        alt="Travis Howard"
                        src={currentUser?.profilePicture ? `${process.env.REACT_APP_BASE_URI}/${currentUser?.profilePicture}` : ProfileImage}
                        sx={{ width: 35, height: 35, cursor: 'pointer' }}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={dropDown}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default NavigationBar;