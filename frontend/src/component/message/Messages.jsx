import Message from "./Message.jsx";
import {useEffect, useRef, useState} from "react";
import useConversation from "../../zustand/useConversation.jsx";
import {getMessage} from "../../utils/ApiFunction.js";
const Messages = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {messages, setMessages, selectedConversation} = useConversation();

    const lastMessage = useRef();

    useEffect(() => {
        if(selectedConversation?._id) fetchMessages();
    }, [selectedConversation?._id, setMessages])

    useEffect(() => {
        setTimeout(() => {lastMessage.current?.scrollIntoView({smooth: true});}, 1000);

    },[messages])

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
    }




    return (
        <div className=" px-4 flex-1 overflow-auto">
            {error && <div className="text-center text-red-500">{error}</div>}
            {!loading && messages.length >0 &&
                messages.map((message) =>
                <div key={message._id}
                ref={lastMessage}
                >
                    <Message  message={message}/>
                </div>)}

            {loading && [...Array(3)].map((_,idx) => <Message key={idx}/>)}
            {!loading && messages.length ===0 && <div className="text-center text-gray-500">Send a message to start</div>}
        </div>
    );
};

export default Messages;
