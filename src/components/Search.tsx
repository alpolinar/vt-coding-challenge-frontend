import { memo } from "react";

import { FaSearch } from "react-icons/fa";

const Search = memo((props: any) => {
    return (
        <>
            <form onSubmit={props.handleSubmit} className="flex flex-row pb-10 lg:w-96 md:w-96 w-full">
                <input
                    onChange={(e) => props.setKeyword(e.target.value)}
                    type="text"
                    name="search"
                    className="min-w-0 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                    placeholder="Search"
                    autoComplete="off"
                />
                <button type="submit" className="bg-[#FDB81B] hover:bg-yellow-500 px-4 py-2 font-semibold text-md rounded-r-md text-white">
                    <FaSearch className="text-white text-lg" />
                </button>
            </form>
        </>
    );
});

export default Search;
