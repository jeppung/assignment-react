import Navbar from "../components/Navbar"

const Register = () => {
    return (
        <div className="font-montserrat  flex flex-col h-screen relative">
            <Navbar />
            <main className="flex-1 flex items-center max-w-5xl mx-auto w-full">
                <div className="flex flex-col gap-y-10 w-[450px]">
                    <h1 className="text-4xl font-bold">Register</h1>
                    <form action="#" className="flex flex-col gap-y-5">
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="name" className="font-bold">Name</label>
                            <input type="text" name="name" id="name" placeholder="Asep Budiantoro Chandradiman" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="email" className="font-bold">Email</label>
                            <input type="email" name="email" id="email" placeholder="asep.bc@gmail.com" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <div className="flex flex-col  gap-y-3">
                            <label htmlFor="password" className="font-bold">Password</label>
                            <input type="password" name="password" id="password" placeholder="***************" className="border-[1px] border-[#4F4F4F] rounded-md px-5 py-3 text-sm" required />
                        </div>
                        <button className="text-sm bg-[#23A6F0] py-4 rounded-md text-white font-bold">Submit</button>
                    </form>
                </div>
            </main>
            <div className="bg-[#23A6F0] w-[480px] justify-center h-screen absolute right-0 flex items-center px-10">
                <img src="./assets/register.svg" alt="" />
            </div>
        </div>
    )
}

export default Register