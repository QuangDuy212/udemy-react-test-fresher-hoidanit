import { useLocation } from "react-router-dom";

const BookPage = () => {
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");
    console.log(">>> check id: ", id);
    return (
        <>
            HookPage
        </>
    )
}
export default BookPage;