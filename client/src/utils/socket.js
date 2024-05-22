// Socket.io - client
import { io } from 'socket.io-client';


export const socket = io(process.env.REACT_APP_BASE_URI,{
    auth:{
        token: localStorage.getItem('chatAppToken')
    }
});