import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/userAuth"
import { useUserDataStore } from "../store/userData"

const Navbar = () => {

    const { token } = useAuthStore()

    return (
        <header className="flex justify-between py-5 items-center z-50 max-w-5xl mx-auto w-full">
            <div>
                <h1 className="font-bold text-2xl">DigiWallet</h1>
            </div>
            <div>
                <ul className={`flex gap-x-[40px] text-sm font-bold ${token === "" && "mr-10"}`}>
                    {
                        token !== "" ? <NavAuth /> : <NavUnauth />
                    }
                </ul>
            </div>
        </header>
    )
}

const NavUnauth = () => {
    return (
        <>
            <li><Link to={"/"} className="text-[#737373]">Home</Link></li>
            <li><Link to={"/login"} className={`text-white ${location.pathname === "/login" && "underline"}`}>Login</Link></li>
            <li><Link to={"/register"} className={`text-white ${location.pathname === "/register" && "underline"}`}>Register</Link></li>
            <li></li>
        </>
    )
}

const NavAuth = () => {

    const { setToken } = useAuthStore()
    const { setUserData } = useUserDataStore()
    const location = useLocation()

    const logoutHandler = () => {
        setToken("")
        setUserData({})
    }

    return (
        <>
            <li><Link to={"/"} className={`text-[#737373] ${location.pathname === "/" && "underline"}`}>Home</Link></li>
            <li><Link to={"/transfer"} className={`text-[#737373] ${location.pathname === "/transfer" && "underline"}`}>Transfer</Link></li>
            <li><Link to={"/topup"} className={`text-[#737373] ${location.pathname === "/topup" && "underline"}`}>Topup</Link></li>
            <li><Link to={"/games"} className={`text-[#737373] ${location.pathname === "/games" && "underline"}`}>Games</Link></li>
            <li><Link to={"/login"} className={`text-[#737373] ${location.pathname === "/login" && "underline"}`} onClick={logoutHandler}>Logout</Link></li>
        </>
    )
}

export default Navbar