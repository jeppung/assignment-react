import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="flex justify-between py-5 items-center z-50 max-w-5xl mx-auto w-full">
            <div>
                <h1 className="font-bold text-2xl">DigiWallet</h1>
            </div>
            <div>
                <ul className="flex gap-x-[40px] text-sm font-bold mr-10">
                    <li><Link to={"/"} className="text-[#737373]">Home</Link></li>
                    <li><Link to={"/login"} className="text-white">Login</Link></li>
                    <li><Link to={"/register"} className="underline text-white">Register</Link></li>
                    <li></li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar