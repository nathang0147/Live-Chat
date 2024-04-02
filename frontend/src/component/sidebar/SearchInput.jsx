import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    return (
        <form className="flex items-center gap-2">
            <input type="text" placeholder="Find your friend..." className="input input-bordered rounded-full"/>
            <button className="btn btn-circle rounded-full bg-[#41C9E2] text-white">
                <FaSearch className="w-6 h-6"/>
            </button>
        </form>
    );
};

export default SearchInput;
