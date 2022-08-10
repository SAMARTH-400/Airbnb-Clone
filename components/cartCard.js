import React, { useState } from "react";
import Image from "next/image";
import { StarIcon , XIcon } from "@heroicons/react/solid";
import { useDispatch } from 'react-redux' 
import { removeFromBasket } from '../slices/basketSlice'

function cartCard({ key, state, hotel_name, img, star, price, amount, guests, lat, long, days }) {
    const dispatch = useDispatch();
    const remove = () => {
        const product = {
            key, state, hotel_name, img, star, price, amount, guests, lat, long, days
        }
        dispatch(removeFromBasket(product));
    }
    return (
        <div className="flex py-7 pl-2 pr-4 border-b hover:shadow-md transition duration-200 ease-out first:border-t rounded-xl mb-10">
            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <Image className="rounded-2xl" src={img} layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <p className="text-sm text-gray-500 pt-2 flex-grow">Private room in {state} </p>
                    <button onClick={remove}> {<XIcon className="h-5 hover:scale-[1.05]" />} </button>
                </div>
                <h4 className="text-xl">{hotel_name}</h4>
                <div className="border-b w-10 pt-2" />
                <p className="text-sm text-gray-500 pt-2 flex-grow">
                · 1 bedroom · 1 bed · 1 shared bathrooms · Wifi · Free parking
                </p>
                <div>
                    <p className="flex items-center">
                        <StarIcon className="h-5 text-red-400" />
                        {star===0 ? 'NEW' : star}
                    </p>
                    <div className="flex pt-5 justify-between">
                        <p></p>
                        <p className="text-lg font-semibold">{price} <span className=" text-sm  text-gray-500   ">/ day</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default cartCard;
