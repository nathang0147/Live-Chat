const Message = () => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className=" w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component"
                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                </div>
            </div>
            <div className={`chat-bubble text-white bg-blue-500`}> Hi! what's up</div>
            <div className="chat-footer">
                <time className="text-xs text-white opacity-50 flex items-end gap-1 pt-1">12:45</time>
            </div>
        </div>
    );
};

export default Message;
