import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";
import {CheckCircleIcon} from '@heroicons/react/solid'

export default function success() {
    const router = useRouter();
    return(
        <div>
            <Header />
            <div>
                <div className="flex justify-center bg-blue-50 w-full p-9 ">
                    <div className='flex flex-col justify-center bg-white p-3 w-full md:w-2/5' >
                        <video autoPlay loop className='z-50 h-0 md:h-72 l:h-80 xl:h-96'><source src="/static/done.mp4" /></video>
                        <div className="flex flex-col justify-center bg-green-100 rounded-lg m-4 p-4">
                            <div className="flex justify-center ">
                                <CheckCircleIcon className="h-7 text-green-600" />
                                <p className="text-green-700 text-2xl font-medium ml-4 mb-2 ">Reservation confirmed!</p>
                            </div>    
                            <div className=' text-green-500 font-extralight m-auto ' > You will be receiving a confiramtion email with your order. </div>
                        </div> 
                        <div className="justify-center mx-auto my-5">
                        <button type="button" class="text-green-700 hover:text-white border border-gray-700 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={ () => router.push('/trips') }>Continue Exploring </button>
                        </div>
                    </div>    
                </div>
            </div>
            <div className=" mt-[-120px] ">
                <Footer />
            </div>
        </div>
    )
}