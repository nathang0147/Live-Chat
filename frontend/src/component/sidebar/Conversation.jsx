import useConversation from "../../zustand/useConversation.jsx";

const Conversation = ({conversation, lastIdx, emoji}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    return (
        <>
        <div className={`flex gap-2 items-center hover:bg-sky-400 rounded cursor-pointer p-2 py-1
        ${isSelected ? 'bg-sky-400' : ''}
        `}
        onClick={() => setSelectedConversation(conversation)}
        >
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePicture}
                    alt="friend"
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{conversation.fullName}</p>
                    <span className="text-xl">{emoji}</span>
                </div>
            </div>
        </div>
            {!lastIdx && <div className="divider my-0 py-0 h-1"/>}
        </>
    );
};

export default Conversation;
