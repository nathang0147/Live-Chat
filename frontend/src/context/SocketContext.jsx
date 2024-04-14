import { createContext, useState, useEffect, useContext } from "react";

import io from "socket.io-client";
import useAuthContext from "../hook/useAuthContext.jsx";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {  chat_user } = useAuthContext();

    useEffect(() => {
        if (chat_user) {
            const socket = io("https://live-chat-0i4u.onrender.com", {
                query: {
                    userId: chat_user._id,
                },
            }, {
                withCredentials: true,
            });

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [chat_user]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};