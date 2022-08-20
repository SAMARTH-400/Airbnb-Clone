import React from 'react';
import { useRouter } from "next/dist/client/router";
import Image from 'next/image';
import Header from './Header';


function Banner() {
    const router = useRouter();
    const search = () => {
        var today = new Date();
        router.push({
            pathname: '/search',
            query: {
                location: "Goa",
                startDate:  today.toISOString(),
                endDate: today.toISOString(),
                noOfGuests: 1 
            }
        });
    }
    return (
        <div className="relative h-[250px] sm:h-[350px] lg:h-[500px] xl:h-[600px] 2xl:h-[750px]  ">
            <Image src="/static/banner.webp" layout="fill" />
            <div className="absolute top-1/2 w-full text-center">
                <p className="text-sm sm:text-lg text-white ">Not sure where to go? Perfect</p>
                <button className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150 " onClick={search}>I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
