import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackToTop from "./BackToTop";
import Loading from "./Loading";

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string;
    published_at: Date;
}

function SinglePost() {
    const { VITE_BASE_URL } = import.meta.env;

    const [post, setPost] = useState<Post>({
        id: 0,
        title: "",
        slug: "",
        content: "",
        image: "",
        published_at: new Date(),
    });

    const { slug } = useParams();

    useEffect(() => {
        let subscribe = true;
        axios
            .get(`${VITE_BASE_URL}/${slug}`)
            .then((response) => {
                if (subscribe) {
                    setPost(response.data[0]);
                }
            })
            .catch((err) => console.log(err));
        return () => {
            subscribe = false;
        };
    }, []);

    return (
        <div className="flex flex-col w-full mb-10">
            {post.content ? (
                parse(post.content)
            ) : (
                <div className="flex justify-center items-center w-full">
                    <Loading type="spin" color="#FDB81B" height={100} width={100} />
                </div>
            )}
            <BackToTop />
        </div>
    );
}

export default SinglePost;
