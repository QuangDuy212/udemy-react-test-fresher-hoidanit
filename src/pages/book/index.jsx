import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";
import { useEffect, useState } from "react";
import { callGetBookById } from "../../services/api";
import { original } from "@reduxjs/toolkit";

const BookPage = () => {
    const [dataBook, setDataBook] = useState();

    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");

    useEffect(() => {
        fetchBook(id);
    }, [id])

    const fetchBook = async (i) => {
        const res = await callGetBookById(i);
        if (res && res?.data) {
            let raw = res.data;
            raw.items = getImages(raw);
            setTimeout(() => {
                setDataBook(raw);
            }, 0)
        }
    }

    const getImages = (raw) => {
        const images = [];
        if (raw?.thumbnail) {
            images.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: 'origintal-image',
                thumbnailClass: 'thumbnail-image'
            })
        }
        if (raw?.slider) {
            raw?.slider?.map(item => {
                images.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: 'origintal-image',
                    thumbnailClass: 'thumbnail-image'
                })
            })
        }
        return images;
    }
    return (
        <>
            <ViewDetail dataBook={dataBook} />
        </>
    )
}
export default BookPage;