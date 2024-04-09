import { FaSearch } from "react-icons/fa";
import { useState} from "react";
import useConversation from "../../hook/zustand/useConversation.jsx";
import useGetConversation from "../../hook/useGetConversation.jsx";

const SearchInput = () => {
    const [search, setSearch] = useState("");

    const [error, setError] = useState(null);

    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        if(search < 3){
            setError("Search query must be at least 3 characters long");
        }
        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if(conversation) {
            setSelectedConversation(conversation);
            setSearch("");

        }else {
            setError("No conversation found");
        }
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <input type="text" placeholder="Find your friend..." className="input input-bordered rounded-full"
                   value={search}
                onChange={(e) => {setSearch(e.target.value)}}
            />
            <button className="btn btn-circle rounded-full bg-[#41C9E2] text-white" type="submit">
                <FaSearch className="w-6 h-6"/>
            </button>
        </form>
    );
};

export default SearchInput;
