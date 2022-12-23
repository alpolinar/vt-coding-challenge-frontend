import ReactLoading from "react-loading";

interface Loading {
    type: string;
    color: string;
    height: number;
    width: number;
}

function Loading(props: Loading) {
    return (
        <div className="py-10">
            <ReactLoading type={props.type} color={props.color} height={props.height} width={props.width} />
        </div>
    );
}

export default Loading;
