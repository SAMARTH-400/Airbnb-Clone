import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { useState  } from "react";      

function Search({ searchResults }) {
    const router = useRouter();
    const { location, startDate, endDate, noOfGuests } = router.query;
    var requiredResults = searchResults.filter( result => (
        result.state===location && result.guests >= noOfGuests 
    ));
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    var time = new Date(endDate).getTime() - new Date(startDate).getTime();
    var days = time / (1000 * 3600 * 24) + 1;
    
    const [psort, setPsort] = useState(0);
    const [rsort, setRsort] = useState(0);

    if(psort==1){
        requiredResults = requiredResults.sort((a, b) => {
            return a.amount - b.amount;
        });
    }
    else if(psort==-1){
        requiredResults = requiredResults.sort((a, b) => {
            return b.amount - a.amount;
        });
    }
    if(rsort==1){
        requiredResults = requiredResults.sort((a, b) => {
            return a.star - b.star;
        });
    }
    else if(rsort==-1){
        requiredResults = requiredResults.sort((a, b) => {
            return b.star - a.star;
        });
    }
    return (
        <div className="">
            <Header />
            <main className="flex pt-20  ">
                <section className="flex-grow pt-10 px-6">
                    <h1 className="text-xl font-bold   mb-3">
                        STAYS IN {location.toUpperCase()}
                    </h1>
                    <p className="text-sm text-gray-700  mb-10 space-x-3">
                        <span>{requiredResults.length} Stays</span>
                        <span>|</span>
                        <span>{range}</span> 
                        <span>|</span>
                        <span>{noOfGuests}  Guests</span>
                    </p>
                    <div className="flex my-5 text-gray-800 whitespace-nowrap justify-end space-x-10  "  >
                       
                        <div className='flex'>
                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer' onClick={ ()=>{setPsort(-1); setRsort(0)} } />
                            <p className="font-semibold text-sm my-auto"> PRICE </p>
                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2 cursor-pointer' onClick={ ()=>{setPsort(1); setRsort(0)} } />
                        </div>
                        <div className='flex'>
                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer'  onClick={ ()=>{setPsort(0); setRsort(-1)} } />
                            <p className="font-semibold text-sm my-auto"> RATING </p>
                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2 cursor-pointer'  onClick={ ()=>{setPsort(0); setRsort(1)} } />
                        </div>

                    </div>
                    <div className="flex flex-col">
                        {requiredResults.map(
                            ({ key, state, hotel_name, img, star, price, amount, guests, lat, long}) => (
                                <InfoCard
                                    key={key}
                                    state={state}
                                    hotel_name={hotel_name}
                                    img={img}
                                    star={star}
                                    price={price}
                                    amount={amount}
                                    guests={guests}
                                    lat={lat}
                                    long={long}
                                    days={days}
                                />
                            )
                        )}
                        
                    </div>
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={requiredResults} />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("https://script.google.com/macros/s/AKfycbxnal7p3CxFO4L8ms5rNVa5YSyax5bcxFzj6gccuZYGYvUn1gbpvXplBuAuaV71JXB-/exec").then(
        (res) => res.json()
    );

    return {
        props: {
            searchResults,
        },
    };
}
