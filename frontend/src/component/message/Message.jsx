
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../hook/zustand/useConversation";
import useAuthContext from "../../hook/useAuthContext.jsx";

const Message = ({ message }) => {
    const { chat_user } = useAuthContext();
    const { selectedConversation } = useConversation();


    const fromMe = message.senderID === chat_user._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? chat_user.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};
export default Message;