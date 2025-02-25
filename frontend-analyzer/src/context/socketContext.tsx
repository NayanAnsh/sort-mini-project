import { createContext, useContext, useEffect } from "react";
import { socketManager } from "../lib/socket";
import { ReactNode } from "react";

const SocketContext = createContext(null);
export const SocketProvider = ({children}:{children:ReactNode})=>{

    useEffect(()=>{
        socketManager.connect();
        return () => {
            if (socketManager.socket.readyState === 1) { // <-- This is important
                socketManager.socket.close();
            }
        }
    },[])
    return (
        <SocketContext.Provider value={socketManager} >
            {children}
        </SocketContext.Provider>
    )
}
//looks cool , a custom hook
export const useSocket = ()=> useContext(SocketContext);