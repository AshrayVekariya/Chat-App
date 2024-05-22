import React, { Fragment, useEffect, useRef, useState } from "react";

// Mui
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

// Jwt-decode
import { jwtDecode } from "jwt-decode";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// Components and CSS
import "./../../style/dashboard.css";
import { getUserById } from "../register/slice";
import { createMessage, getAllMessage, readAllMessage, unSeenMessageCount } from "./slice/dashboardSlice";
import { socket } from "../../utils/socket";

const Dashboard = ({ selectedUser, drawerWidth, getAllUserList }) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const chatbox = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [messageDetail, setMessageDetail] = useState({
        message: ""
    })

    const scrollBottom = () => {
        if (chatbox) {
            chatbox.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('chatAppToken');
        if (token) {
            const decode = jwtDecode(token);
            dispatch(getUserById(decode.id))
            scrollBottom();
        }
    }, []);

    useEffect(() => {
        setCurrentUser(selector?.user?.getUser)
    }, [selector?.user])

    useEffect(() => {
        if (currentUser) {
            getAllUserList();
            socket.off("messageResponse")
            socket.on('messageResponse', (data) => {
                const select = JSON.parse(localStorage.getItem("selectedUser"))
                if (data.senderId === select?._id) {
                    setMessagesList([...messagesList || [], data]);
                    dispatch(readAllMessage({ senderId: select?._id, reciverId: currentUser?._id }))
                }
            });
        }
    }, [socket, messagesList, selectedUser, currentUser])

    useEffect(() => {
        if (currentUser) {
            dispatch(getAllMessage({ senderId: currentUser._id, reciverId: selectedUser._id }))
            socket.emit('join', { userId: currentUser?._id });
        }
    }, [selectedUser, currentUser])

    useEffect(() => {
        setMessagesList(selector?.message?.messageList)
    }, [selector?.message])

    const handleChange = (e) => {
        setMessageDetail({ ...messageDetail, [e.target.name]: e.target.value, senderId: currentUser?._id, reciverId: selectedUser?._id })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createMessage(messageDetail))

        const token = localStorage.getItem('chatAppToken');
        if (token) {
            socket.emit('message', messageDetail);
        }

        setMessageDetail({ message: "" })
    }

    return (
        <Fragment>
            < Box sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - ${drawerWidth}px)` }
            }}>
                <Box
                    component="main"
                    ref={chatbox}
                    sx={{
                        p: 3,
                        height: 'calc(100vh - 95px)',
                        overflow: 'hidden',
                        overflowY: "auto"
                    }}
                >
                    <Toolbar />
                    <Box m={1} mt={3}>
                        <>
                            {messagesList?.map((message, index) => {
                                return (
                                    <Box mb={5} key={index} display={"flex"} justifyContent={message.senderId === currentUser?._id ? "flex-end" : null}>
                                        <Box className={`message ${message.senderId === currentUser?._id ? "send-message-box send-message" : "recive-message-box recive-message"}`} bgcolor={message.senderId === currentUser?._id ? "#c3c9df" : "#444e75"}>
                                            <Typography component="p" sx={{ wordBreak: "break-all" }}>{message.message}</Typography>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </>
                    </Box>
                </Box>
                {/* Chat Send Field */}
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Box borderTop={"1px solid #0000001f"} p={3} display={'flex'} gap={2}>
                        <Box width={"100%"}>
                            <TextField
                                fullWidth
                                placeholder="Type Your Message..."
                                variant="outlined"
                                className="font-style subtitle-color"
                                name="message"
                                value={messageDetail?.message}
                                onChange={handleChange}
                                InputProps={{
                                    sx: {
                                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                                            padding: "12px 14px",
                                            color: "#495057",
                                            fontSize: "15px",
                                            fontFamily: '"Reddit Sans", sans-serif',
                                            backgroundColor: "#f0f4f9"
                                        }
                                    },
                                }}
                            />
                        </Box>
                        <Box>
                            <Button
                                variant='contained'
                                type="submit"
                                disabled={messageDetail.message === ""}
                                color="primary"
                                sx={{
                                    height: "100%",
                                    "&.Mui-disabled": {
                                        background: "#5eb1c1",
                                        color: "#fff"
                                    }
                                }}>
                                <SendIcon />
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box >
        </Fragment >
    )
}

export default Dashboard;