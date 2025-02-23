import { createContext, useContext, useEffect } from "react";
import { socketManager } from "../lib/socket";

const SocketContext = createContext();
export const SocketProvider = ({children})=>{

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