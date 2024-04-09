import {useEffect, useState} from "react";
import {getConversation} from "../utils/ApiFunction.js";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try{
                const resData = await getConversation();

                setConversations(resData);
                setLoading(false);
            }catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getConversations();
    }, [])
    return {loading, conversations};
};

export default useGetConversation;
