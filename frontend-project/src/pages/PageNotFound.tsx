import Lottie from "lottie-react";

import notFoundAnimation from "../assets/404.json"
import { useEffect } from "react";

const PageNotFound = () => {

    useEffect(() => {
        document.title = "DigiWallet | 404"
    }, [])

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <Lottie animationData={notFoundAnimation} loop={true} />
                <h1 className="text-3xl font-bold">Page Not Found</h1>
            </div>
        </div>
    )
}

export default PageNotFound