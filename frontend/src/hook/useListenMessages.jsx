
import useConversation from "./zustand/useConversation.jsx";
import {useEffect} from "react";
import {useSocketContext} from "../context/SocketContext.jsx";
import notification from "../assets/sounds/notification.aac"
import bub from "../assets/sounds/bub.aac"

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation();


    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            const sound = new Audio(bub);
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};

export default useListenMessages;
