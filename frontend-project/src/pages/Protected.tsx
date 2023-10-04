import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/userAuth"


const Protected = () => {

    const { token } = useAuthStore();

    return (
        <>
            {
                token !== "" ? <Outlet /> : <Navigate to="/login" />
            }
        </>
    )
}

export default Protected