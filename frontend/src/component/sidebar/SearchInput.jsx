import { FaSearch } from "react-icons/fa";
import {useEffect, useState} from "react";
import {getConversation} from "../../utils/ApiFunction.js";
import useConversation from "../../zustand/useConversation.jsx";

const SearchInput = () => {
    const [search, setSearch] = useState("");

    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {setSelectedConversation} = useConversation();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try{
                const resData = await getConversation();

                setConversations(resData.data);
                setLoading(false);
            }catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getConversations();
    }, [])

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
            <input type="text" placeholder="Find your friend..." className="input input-bordered rounded-full"
            onChange={(e) => {setSearch(e.target.value)}}
            />
            <button className="btn btn-circle rounded-full bg-[#41C9E2] text-white" type="submit">
                <FaSearch className="w-6 h-6"/>
            </button>
        </form>
    );
};

export default SearchInput;
