import {BsSend} from "react-icons/bs";

const MessageInput = () => {
    return (
        <div className=" px-4 my-3">
            <div className=" w-full relative">
                <input
                    type="text"
                    className=" border text-sm rounded-lg block w-full p-2.5 bg-blue-100 border-blue-50 text-gray-900"
                    placeholder="Type your message..."
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <BsSend className="w-6 h-6"/>
                </button>
            </div>

        </div>
    );
};

export default MessageInput;
