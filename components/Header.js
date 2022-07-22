import React, { useState } from "react";
import Image from "next/image";
import DropDown from "./DropDown";
import {
    SearchIcon,
    MenuIcon,
    UserCircleIcon,
    UserIcon,
    SortAscendingIcon,
} from "@heroicons/react/solid";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };
    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests
            }
        });
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    return (
        <header className="sticky top-0 z-10 w-full grid grid-cols-3 isolate bg-white shadow-md py-4 md:px-10 ">
            {/* left */}
            <div onClick={() => router.push("/")} className="relative flex items-center h-9 cursor-pointer my-auto">
                <Image
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle - Search*/}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                    type="text"
                    placeholder= {placeholder || "Start your search!"}
                    autoComplete="false"
                />
                <button onClick={search}>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-300">
            <DropDown/>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-4 ">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                        className="shadow-lg"
                    />
                    <div className="flex justify-between mt-4">
                        <h2 className="text-2xl ml-2 flex-grow font-semibold">Number of Guests</h2>  
                        <div className="flex items-center mx-auto">
                        <button
                            disabled={noOfGuests <= 0}
                            onClick={() => setNoOfGuests((val) => val - 1)}
                            className="button bg-[#FD5B61] text-white mx-5"
                        >-</button>
                        <UserIcon className="h-5" />
                        <h1>{noOfGuests}</h1>
                        <button
                            onClick={() => setNoOfGuests((val) => val + 1)}
                            className="button  bg-[#FD5B61] text-white mx-5"
                        >+</button>
                    </div>
                    </div>
                    
                    <div className="flex bg-white pt-4 rounded-b-lg">
                        <button
                            onClick={resetInput}
                            className="flex-grow rounded-lg bg-white hover:bg-red-400 hover:shadow-md drop-shadow-md p-2 mr-1 transiton duration-300 ease-out hover:text-white  text-gray-500"
                        >Cancel</button>
                        <button
                            onClick={search}
                            className="flex-grow rounded-lg bg-white text-red-400 hover:shadow-md drop-shadow-md hover:bg-red-400 p-2 transiton duration-300 ease-out hover:text-white "
                        >Search</button>
                    </div>
                </div>
            )}
        </header>
    );
}
export default Header;
