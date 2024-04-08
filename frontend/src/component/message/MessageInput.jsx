import {BsSend} from "react-icons/bs";
import {useEffect, useState} from "react";
import useConversation from "../../zustand/useConversation.jsx";
import message from "./Message.jsx";
import {sendMessage} from "../../utils/ApiFunction.js";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {messages, setMessages, selectedConversation} = useConversation()



    const handleSendMessage = async (message) => {
        setLoading(true);
        try {

            const response = await sendMessage(selectedConversation._id, message);
            setLoading(false);
            setMessages([...messages, response]);
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        handleSendMessage(message);
        setMessage("");
    }



    return (
        <form className=" px-4 my-3" onSubmit={handleSubmit}>
            <div className=" w-full relative">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <input
                    type="text"
                    className=" border text-sm rounded-lg block w-full p-2.5 bg-blue-100 border-blue-50 text-gray-900"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <div className="loading loading-spinner"></div> : <BsSend className="w-6 h-6"/>}
                </button>
            </div>

        </form>
    );
};

export default MessageInput;
