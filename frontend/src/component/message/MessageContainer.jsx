import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import NoChatSelected from "./NoChatSelected.jsx";
import useConversation from "../../hook/zustand/useConversation.jsx";
import {useEffect} from "react";

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {
        //cleanup function(unmounting)
        return () => setSelectedConversation(null);

    }, [setSelectedConversation])
    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? <NoChatSelected/> : (
                <>
                {/*Header*/}
                <div className="bg-blue-100 px-4 py-2 mb-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                </div>

                <Messages/>
                <MessageInput/>
                </>
            )}
        </div>
    );
};

export default MessageContainer;
