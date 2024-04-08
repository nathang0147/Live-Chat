import Conversation from "./Conversation.jsx";
import {useEffect, useState} from "react";
import {getConversation} from "../../utils/ApiFunction.js";
import {getRandomEmoji} from "../../utils/emoji.js";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try{
                const resData = await getConversation();

                setConversations(resData.data);
                setLoading(false);
            }catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getConversations();
    }, [])

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((conversation) => (
                <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx === conversations.length-1}/>
            ))}

            {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};

export default Conversations;
