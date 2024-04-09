import Message from "./Message.jsx";
import {useEffect, useRef, useState} from "react";
import useConversation from "../../hook/zustand/useConversation.jsx";
import {getMessage} from "../../utils/ApiFunction.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../hook/useListenMessages.jsx";
const Messages = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const lastMessage = useRef();

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await getMessage(selectedConversation._id);
                setMessages(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        };

        if(selectedConversation?._id) fetchMessages();
    }, [selectedConversation?._id, setMessages])

    useListenMessages()


    useEffect(() => {
        setTimeout(() => {lastMessage.current?.scrollIntoView({ behavior: "smooth"});}, 100);

    },[messages])





    return (
        <div className=" px-4 flex-1 overflow-auto">
            {error && <div className="text-center text-red-500">{error}</div>}
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessage}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}

        </div>
    );
};

export default Messages;
