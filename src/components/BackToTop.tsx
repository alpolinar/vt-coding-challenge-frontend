import { useEffect, useState } from "react";

import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            {showButton && (
                <FaArrowUp
                    onClick={scrollUp}
                    className="p-2 border-2 border-gray-500 hover:bg-gray-100 rounded-full text-4xl fixed bottom-10 xl:right-48 lg:right-34 md:right-24 sm:right-14 right-10 animate-bounce"
                />
            )}
        </>
    );
};

export default BackToTop;
