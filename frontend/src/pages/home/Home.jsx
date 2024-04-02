import Sidebar from "../../component/sidebar/Sidebar.jsx";
import MessageContainer from "../../component/message/MessageContainer.jsx";

const Home = () => {
    return (
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-500 bg-clip-padding
        backdrop-filter backdrop-blur-2xl bg-opacity-30">
            <Sidebar/>
            <MessageContainer/>
        </div>
    );
};

export default Home;
