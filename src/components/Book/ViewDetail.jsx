import { Button, Col, Row, Rate, InputNumber } from 'antd';
import './book.scss';
import ImageGallery from "react-image-gallery";
import { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import ModalGallery from './ModalGallery';

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
];

const onChange = (value) => {
    console.log('changed', value);
};

const ViewDetail = (props) => {
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    return (
        <>
            <div className='container'>
                <div className='content'>
                    <Row gutter={[20, 20]}>
                        <Col xl={10} md={24}>
                            <ImageGallery
                                items={images}
                                showFullscreenButton={false}
                                showNav={false}
                                showPlayButton={false}
                                slideOnThumbnailOver={true}
                                onClick={() => setIsOpenModalGallery(true)}
                            />
                        </Col>
                        <Col xl={14} md={24}>
                            <div className='viewdetail__info'>
                                <div className='viewdetail__info--author'>Tác giả: Quang Duy</div>
                                <div className='viewdetail__info--name'>Đắc nhân tâm</div>
                                <div className='viewdetail__info--rate'><Rate disabled defaultValue={5} /> Đã bán 30</div>
                                <div className='viewdetail__info--price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                </div>
                                <div className='viewdetail__info--transport'>Vận chuyển:
                                    <span>Miễn phí vận chuyển</span>
                                </div>
                                <div className='viewdetail__info--quantity'>
                                    Số lượng:
                                    <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}
                                        addonAfter={<FaPlus />}
                                        addonBefore={<FaMinus />}
                                    />
                                </div>
                                <div className='viewdetail__info--btn'>
                                    <Button>Thêm vào giỏ hàng</Button>
                                    <Button>Mua ngay</Button>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <ModalGallery
                isOpenModalGallery={isOpenModalGallery}
                setIsOpenModalGallery={setIsOpenModalGallery}
                images={images}
            />
        </>
    )
}

export default ViewDetail;