import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/userAuth"

const ProtectedAuth = () => {
    const { token } = useAuthStore()

    return (
        <>
            {
                token !== "" ? <Navigate to={"/"} /> : <Outlet />
            }
        </>
    )
}

export default ProtectedAuth