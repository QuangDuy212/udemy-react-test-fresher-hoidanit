
import { Button, Col, Modal, Row, Image } from 'antd';
import { useRef, useState } from 'react';
import ImageGallery from "react-image-gallery";
import './ModalGallery.scss';


const ModalGallery = (props) => {
    const { isOpenModalGallery, setIsOpenModalGallery, images, currentIndex } = props;
    const [dataPreview, setDataPreview] = useState(images[0].original);
    const refGallery = useRef();

    const handleCancel = () => {
        setIsOpenModalGallery(false);
    }

    const handleOnClickThumnail = (index) => {
        refGallery.current.slideToIndex(index)
    }

    return (
        <>
            <Modal
                open={isOpenModalGallery}
                onCancel={handleCancel}
                width={"1000px"}
                closable={false}
                footer={<></>}
            >
                <Row gutter={[15, 15]} style={{ overflow: "hidden" }}>
                    <Col xl={16} md={24}>
                        <div className='image'>
                            <ImageGallery
                                items={images}
                                ref={refGallery}
                                thumbnailPosition='right'
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showThumbnails={false}
                                startIndex={currentIndex}
                                width={100}
                            />
                        </div>
                    </Col>
                    <Col xl={8} md={24}>
                        <Row gutter={[15, 15]}>
                            {images?.map((item, index) => {
                                return (
                                    <Col xl={8} md={24} key={`image-${index}`}>
                                        <div className='thumbnail'
                                        >
                                            <Image
                                                src={item.thumbnail}
                                                width={100}
                                                height={100}
                                                preview={false}
                                                onClick={() => { handleOnClickThumnail(index) }}
                                            />
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalGallery;