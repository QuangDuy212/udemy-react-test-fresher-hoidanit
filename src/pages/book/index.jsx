import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";

const BookPage = () => {
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");
    console.log(">>> check id: ", id);
    return (
        <>
            <ViewDetail />
        </>
    )
}
export default BookPage;