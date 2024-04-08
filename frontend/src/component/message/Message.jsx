import useAuthContext from "../../hook/useAuthContext.jsx";
import useConversation from "../../zustand/useConversation.jsx";
import {extractTime} from "../../utils/extractTime.js";


const Message = ({message}) => {
    const {chat_user} = useAuthContext();
    const {selectedConversation} = useConversation()
    const isMine = message.senderId === chat_user._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = isMine ? 'chat chat-end' : 'chat chat-start';
    const profilePicture = isMine ? chat_user.profilePicture : selectedConversation.profilePicture;
    const bubbleBgColor = isMine ? 'bg-blue-500' : 'bg-gray-500';

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className=" w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component"
                         src={profilePicture}/>
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
            <div className="chat-footer">
                <time className="text-xs text-white opacity-50 flex items-end gap-1 pt-1">{formattedTime}</time>
            </div>
        </div>
    );
};

export default Message;
