import { Link, Route, Routes } from "react-router-dom";

import BlogSearchPage from "./components/BlogSearchPage";
import SinglePost from "./components/SinglePost";

function App() {
    return (
        <div className="flex flex-col justify-cente items-center max-w-5xl w-8/12 mx-auto">
            <div className="flex flex-row items-center justify-start w-full py-4">
                <h2 className="text-4xl font-bold ">
                    <Link to="/">Blog</Link>
                </h2>
            </div>
            <Routes>
                <Route path="/" element={<BlogSearchPage />} />
                <Route path="/:slug" element={<SinglePost />} />
            </Routes>
        </div>
    );
}

export default App;
