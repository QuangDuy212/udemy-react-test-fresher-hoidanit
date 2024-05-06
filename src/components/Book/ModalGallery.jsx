
import { Button, Col, Modal, Row, Image } from 'antd';
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
const ModalGallery = (props) => {
    const { isOpenModalGallery, setIsOpenModalGallery, images } = props;
    const [dataPreview, setDataPreview] = useState(images[0].original);
    const handleCancel = () => {
        setIsOpenModalGallery(false);
    }

    return (
        <>
            <Modal
                open={isOpenModalGallery}
                onCancel={handleCancel}
                width={"850px"}
                closable={false}
                footer={<></>}
            >
                <ImageGallery
                    items={images}
                    thumbnailPosition='right'
                    showPlayButton={false}
                    showFullscreenButton={false}
                />
            </Modal>
        </>
    )
}

export default ModalGallery;