import { Button, Col, Row, Rate, InputNumber, message } from 'antd';
import './book.scss';
import ImageGallery from "react-image-gallery";
import { useRef, useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import ModalGallery from './ModalGallery';
import logoShip from '../../../public/logo/logoShip.png';
import { FaCartPlus } from "react-icons/fa";
import BookLoader from './BookLoader';
import { useDispatch } from 'react-redux';
import { doAddBookAction } from '../../redux/order/orderSlice';

const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
        thumbnailTitle: "vip"
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
        thumbnailTitle: "vip"
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
        thumbnailTitle: "vip"
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
        thumbnailTitle: "vip"
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];



const ViewDetail = (props) => {
    // LIBRARY:
    const dispatch = useDispatch();

    //PROPS:
    const { dataBook } = props;
    //STATE: 
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);

    const refGallery = useRef(null);

    const image = dataBook?.items ?? [];

    // METHODS:
    const handleOnClickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    }
    const onChange = (value) => {
        setCurrentQuantity(value);
    };

    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }));
    }

    return (
        <>
            <div className='container'>
                <div className='content'>
                    {dataBook && dataBook._id ?
                        <Row gutter={[20, 20]}>
                            <Col xl={10} md={24}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={image}
                                    showFullscreenButton={false}
                                    showNav={false}
                                    showPlayButton={false}
                                    slideOnThumbnailOver={true}
                                    onClick={() => handleOnClickImage()}
                                />
                            </Col>
                            <Col xl={14} md={24}>
                                <div className='viewdetail__info'>
                                    <div className='viewdetail__info--name'>{dataBook?.mainText}</div>
                                    <div className='viewdetail__info--author'>Tác giả: {dataBook?.author}</div>
                                    <div className='viewdetail__info--rate'><Rate disabled defaultValue={5} /> Đã bán {dataBook?.sold}</div>
                                    <div className='viewdetail__info--price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook?.price ?? 0)}
                                    </div>
                                    <div className='viewdetail__info--transport'>
                                        <span className='text1'>Vận chuyển </span>
                                        <span className='text2'>

                                            <img src={logoShip} style={{ height: 20 }} />
                                            <span>Miễn phí vận chuyển</span>
                                        </span>
                                    </div>
                                    <div className='viewdetail__info--quantity'>
                                        <span className='text1'>Số lượng</span>

                                        <InputNumber
                                            min={1} max={dataBook.quantity}
                                            defaultValue={1}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className='viewdetail__info--btn'>
                                        <Button
                                            type='button'
                                            className='add'
                                            onClick={() => handleAddToCart(currentQuantity, dataBook)}
                                        >
                                            <FaCartPlus style={{ margin: "0 5px 0 0", fontSize: "20px" }} />
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button className='buy'>Mua ngay</Button>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                        :
                        <BookLoader />
                    }
                </div>
            </div>
            <ModalGallery
                isOpenModalGallery={isOpenModalGallery}
                setIsOpenModalGallery={setIsOpenModalGallery}
                currentIndex={currentIndex}
                images={image}
            />
        </>
    )
}

export default ViewDetail;