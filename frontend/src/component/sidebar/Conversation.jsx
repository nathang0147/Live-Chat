const Conversation = () => {
    return (
        <>
        <div className="flex gap-2 items-center hover:bg-sky-400 rounded cursor-pointer p-2 py-1">
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="friend"
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">Thuong Ngo</p>
                </div>
            </div>
        </div>
            <div className="divider"></div>
        </>
    );
};

export default Conversation;
