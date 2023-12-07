import { useContext } from 'react'
import { SessionContext } from "../SessionContext";

const useSessionContext = () => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error("useSessionContext must be used within a SessionContextProvider");
    }

    return context;
};

export default useSessionContext