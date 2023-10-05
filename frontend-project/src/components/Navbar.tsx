import { Link } from "react-router-dom"
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
            <li><Link to={"/login"} className="text-white">Login</Link></li>
            <li><Link to={"/register"} className="underline text-white">Register</Link></li>
            <li></li>
        </>
    )
}

const NavAuth = () => {

    const { setToken } = useAuthStore()
    const { setUserData } = useUserDataStore()

    const logoutHandler = () => {
        setToken("")
        setUserData({})
    }

    return (
        <>
            <li><Link to={"/"} className="text-[#737373]">Home</Link></li>
            <li><Link to={"/transfer"} className="text-[#737373]">Transfer</Link></li>
            <li><Link to={"/topup"} className="text-[#737373]">Topup</Link></li>
            <li><Link to={"/games"} className="text-[#737373]">Games</Link></li>
            <li><Link to={"/login"} className="text-[#737373]" onClick={logoutHandler}>Logout</Link></li>
        </>
    )
}

export default Navbar