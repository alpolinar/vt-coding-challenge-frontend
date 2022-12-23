import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";

interface Post {
    id: number;
    title: string;
    slug: string;
    image: string;
    published_at: Date;
}

const Posts = memo(({ id, title, slug, image, published_at }: Post) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            setImageLoaded(true);
        };
    }, [image]);
    return (
        <div className="flex justify-center w-72 mb-10 hover:shadow-lg">
            <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white max-w-sm">
                {imageLoaded ? (
                    <img className="rounded-t-lg" src={image} alt={title} />
                ) : (
                    <div className="flex justify-center items-center w-full">
                        <Loading type="bubbles" color="#FDB81B" height={50} width={50} />
                    </div>
                )}
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{title}</h5>
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-gray-700 text-base mb-4">{new Date(published_at).toLocaleDateString()}</p>
                        <Link to={`/${slug}`} className="text-gray-700 text-base mb-4 hover:text-[#FDB81B]">
                            [more...]
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Posts;
