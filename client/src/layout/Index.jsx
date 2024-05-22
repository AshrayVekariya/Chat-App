import React, { useEffect, useState } from 'react';

// Mui
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

// react-redux
import { useDispatch, useSelector } from 'react-redux';

// Jwt-decode
import { jwtDecode } from "jwt-decode";

// Components and CSS
import './../style/layout.css';
import { getAllUser, getUserById } from '../view/register/slice';
import { Avatar, InputAdornment, List, ListItem, ListItemButton, TextField } from '@mui/material';
import Welcome from './welcome/Welcome';
import Dashboard from '../view/dashboard/Index';
import NavigationBar from './Header/Index';
import ProfileImage from './../assets/profile/blanck-profile-image.png';
import { readAllMessage, unSeenMessageCount } from '../view/dashboard/slice/dashboardSlice';
import { socket } from '../utils/socket';

const drawerWidth = 340;

const Layout = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelctedUser] = useState(null);
    const [readMessage, setReadMessage] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const getAllUserList = () => {
        const token = localStorage.getItem('chatAppToken');
        if (token) {
            const decode = jwtDecode(token);
            dispatch(getAllUser({ userId: decode.id }));
        }
    }

    const getCurrentUser = () => {
        const token = localStorage.getItem('chatAppToken');
        if (token) {
            const decode = jwtDecode(token);
            dispatch(getUserById(decode.id))
        }
    }

    useEffect(() => {
        getAllUserList();
        getCurrentUser();
    }, [])

    useEffect(() => {
        (async () => {
            if (currentUser) {
                await dispatch(readAllMessage({ senderId: selectedUser?._id, reciverId: currentUser?._id }));
                await dispatch(unSeenMessageCount({ reciverId: currentUser?._id }));
            }
        })()
    }, [selectedUser, currentUser])

    useEffect(() => {
        setUserList(selector?.user?.allUserList);
        setCurrentUser(selector?.user?.getUser);
    }, [selector?.user])

    useEffect(() => {
        setReadMessage(selector?.message?.notRedableMessage)
    }, [selector?.message])

    useEffect(() => {
        if (currentUser) {
            getAllUserList();
            socket.off("readResponse");
            socket.on('readResponse', (data) => {
                const select = JSON.parse(localStorage.getItem("selectedUser"));
                if (data?.reciverId === currentUser?._id) {
                    if (data.senderId !== select?._id) {
                        setReadMessage([...readMessage || [], data]);
                        dispatch(unSeenMessageCount({ reciverId: currentUser._id }))
                    }
                }
            });
        }
    }, [socket, readMessage, selectedUser, currentUser])

    useEffect(() => {
        if (currentUser) {
            dispatch(unSeenMessageCount({ reciverId: currentUser._id }))
        }
    }, [currentUser])

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const selecteChatUser = (text) => {
        setSelctedUser(text)
        localStorage.setItem("selectedUser", JSON.stringify(text));
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100%", backgroundColor: "#f0f4f9" },
                    }}
                >
                    <Box m={2}>
                        <Box>
                            <Typography variant='h6'>Chat</Typography>
                            <Box mt={2}>
                                <TextField
                                    fullWidth
                                    placeholder="Search here..."
                                    variant="outlined"
                                    className="font-style subtitle-color"
                                    InputProps={{
                                        sx: {
                                            ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: "10px 14px",
                                                color: "#495057",
                                                fontSize: "15px",
                                                fontFamily: '"Reddit Sans", sans-serif',
                                                background: "#fff"
                                            },
                                            background: "#fff"
                                        },
                                        endAdornment: (
                                            < InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box mt={5}>
                            <List>
                                {userList.map((text, index) => (
                                    <ListItem key={index} disablePadding sx={{ mb: 1 }} onClick={() => { selecteChatUser(text); handleDrawerClose() }}>
                                        <ListItemButton
                                            sx={{
                                                py: 2,
                                                borderRadius: 2,
                                                backgroundColor: selectedUser?._id === text._id ? "#c3c9df" : null,
                                            }}
                                        >
                                            <Typography component="div" key={index}>
                                                <Typography component="div" display={'flex'} gap={2}>
                                                    <Avatar alt="Travis Howard" src={text?.profilePicture ? `${process.env.REACT_APP_BASE_URI}/${text?.profilePicture}` : ProfileImage} />
                                                    <Typography component="p" className='font-style'>{`${text.firstName} ${text.lastName}`}</Typography>
                                                </Typography>
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#f0f4f9" },
                    }}
                    open
                >
                    <Box m={2}>
                        <Box>
                            <Typography variant='h6'>Chat</Typography>
                            <Box mt={2}>
                                <TextField
                                    fullWidth
                                    placeholder="Search here..."
                                    variant="outlined"
                                    className="font-style subtitle-color"
                                    InputProps={{
                                        sx: {
                                            ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: "10px 14px",
                                                color: "#495057",
                                                fontSize: "15px",
                                                fontFamily: '"Reddit Sans", sans-serif',
                                                background: "#fff"
                                            },
                                            background: "#fff"
                                        },
                                        endAdornment: (
                                            < InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box mt={5}>
                            <List>
                                {userList.map((text, index) => {
                                    const unReadmessage = readMessage.filter(i => i.senderId === text._id).length;
                                    return (
                                        (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                                sx={{ mb: 1 }}
                                                secondaryAction={
                                                    unReadmessage > 0 ?
                                                        <IconButton edge="end" aria-label="delete">
                                                            <Typography
                                                                component="span"
                                                                bgcolor={"#444e75"}
                                                                color={"#fff"}
                                                                p={1}
                                                                height={"20px"}
                                                                width={"20px"}
                                                                display={'flex'}
                                                                fontSize={10}
                                                                alignItems={'center'}
                                                                justifyContent={"center"}
                                                                borderRadius={"50%"}>{unReadmessage}</Typography>
                                                        </IconButton> : null}
                                                onClick={() => selecteChatUser(text)}>
                                                <ListItemButton
                                                    sx={{
                                                        py: 2,
                                                        borderRadius: 2,
                                                        backgroundColor: selectedUser?._id === text._id ? "#c3c9df" : null,
                                                    }}
                                                >
                                                    <Typography component="div" key={index}>
                                                        <Typography component="div" display={'flex'} gap={2}>
                                                            <Avatar alt="Travis Howard" src={text?.profilePicture ? `${process.env.REACT_APP_BASE_URI}/${text?.profilePicture}` : ProfileImage} />
                                                            <div>
                                                                <Typography component="p" className='font-style' whiteSpace={'nowrap'} overflow={'hidden'} width={"110px"} textOverflow={"ellipsis"}>{`${text.firstName} ${text.lastName}`}</Typography>
                                                                <Typography component="p" className='font-style subtitle-color' fontSize={12} whiteSpace={'nowrap'} width={"160px"} overflow={'hidden'} textOverflow={"ellipsis"}>{text?.lastMessage?.message}</Typography>
                                                            </div>
                                                        </Typography>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    )
                                })}
                            </List>
                        </Box>
                    </Box>
                </Drawer>
            </Box >

            {/* navigation bar */}
            < NavigationBar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
                selectedUser={selectedUser} />

            {/* Chats */}
            {
                selectedUser ? <>
                    <Dashboard selectedUser={selectedUser} drawerWidth={drawerWidth} getAllUserList={getAllUserList} />
                </> : <>
                    <Welcome drawerWidth={drawerWidth} />
                </>
            }
        </Box>
    );
}

export default Layout;