import {createContext, useEffect, useReducer} from "react";

export const authContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                chat_user: action.payload
            }
        case 'LOGOUT':
            return {
                chat_user: null
            }
        default:
            return state;
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        chat_user: null
    });

    useEffect(() => {
        const chat_user = JSON.parse(localStorage.getItem('chat_user'));
        if (chat_user) {
            dispatch({type: 'LOGIN', payload: chat_user});
        }
    }, []);

    console.log("current user: ", state);

    return (
        <authContext.Provider value={{}}>
            {children}
        </authContext.Provider>
    )
}