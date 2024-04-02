import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import NoChatSelected from "./NoChatSelected.jsx";

const MessageContainer = () => {
    const noChatselected = true;
    return (
        <div className="md:min-w-[450px] flex flex-col">
            {noChatselected ? <NoChatSelected/> : (
                <>
                {/*Header*/}
                <div className="bg-blue-100 px-4 py-2 mb-2">
                    <span className="label-text">To:</span>{" "}
                    <span className="text-gray-900 font-bold">Meo meo</span>
                </div>

                <Messages/>
                <MessageInput/>
                </>
            )}
        </div>
    );
};

export default MessageContainer;
