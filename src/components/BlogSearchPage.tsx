import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";

import Loading from "./Loading";
import Posts from "./Posts";
import Search from "./Search";

interface Posts {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string;
    published_at: Date;
}

function BlogSearchPage() {
    const { VITE_BASE_URL } = import.meta.env;

    const [posts, setPosts] = useState<Posts[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        let subscribe = true;
        axios
            .post(`${VITE_BASE_URL}/search`, {
                search: keyword,
                page: page,
            })
            .then((response) => {
                if (subscribe) {
                    setCount(response.data.pages);
                    setPosts(response.data.pagination);
                }
            })
            .catch((err) => console.log(err));
        return () => {
            subscribe = false;
        };
    }, [page]);

    const resetPosts = () => {
        setPosts([]);
    };

    const increment = () => {
        if (page < count) {
            resetPosts();
            setPage((prev) => prev + 1);
        }
    };

    const decrement = () => {
        if (page > 1) {
            resetPosts();
            setPage((prev) => prev - 1);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            resetPosts();
            setPage(1);
            setNoResult(false);
            const response = await axios.post(`${VITE_BASE_URL}/search`, {
                search: keyword,
            });
            if (response.data.pagination.length > 0) {
                setCount(response.data.pages);
                setPosts(response.data.pagination);
            } else {
                setNoResult(true);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full pb-10">
            <Search handleSubmit={handleSubmit} setKeyword={setKeyword} />
            <div className="flex flex-wrap justify-evenly w-full mb-10">
                {posts.length > 0
                    ? posts.map((post, idx) => <Posts key={idx} {...post} />)
                    : !noResult && <Loading type="spin" color="#FDB81B" height={100} width={100} />}
                {noResult && <div>No posts found.</div>}
            </div>

            <div className="flex flex-row justify-between w-full">
                <button
                    onClick={decrement}
                    className="bg-[#FDB81B] hover:bg-yellow-500  px-4 py-2 font-semibold lg:text-md md:text-md sm:text-sm rounded-md text-white sm:w-32 md:w-40"
                >
                    Prev
                </button>
                <button
                    onClick={increment}
                    className="bg-[#FDB81B] hover:bg-yellow-500 px-4 py-2 font-semibold lg:text-md md:text-md sm:text-sm rounded-md text-white sm:w-32 md:w-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default BlogSearchPage;
