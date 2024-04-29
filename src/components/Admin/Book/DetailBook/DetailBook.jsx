
import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { Badge, Descriptions, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { ImTab } from 'react-icons/im';

const DetailBook = (props) => {

    const { data, isOpenBookDetail, setIsOpenBookDetail } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    useEffect(() => {
        handleMergeImg();
    }, [isOpenBookDetail])

    const handleMergeImg = () => {
        let img = [data.slider];
        if (Array.isArray(img[0])) {
            img[0].unshift(data.thumbnail)
            const dataImg = img[0].map((item, index) => {
                return {
                    uid: uuidv4(),
                    name: `image${index}.jpg`,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                }
            })
            setFileList(dataImg);
        }
    }

    const onClose = () => {
        setIsOpenBookDetail(false);
    }

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });



    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);



    return (
        <>
            <Drawer
                title="Xem thông tin sách"
                onClose={onClose}
                open={isOpenBookDetail}
                width={'50vw'}
            >
                <Descriptions
                    title="Thông tin sách"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
                >
                    <Descriptions.Item label="ID">{data._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{data.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{data.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{data.price}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" text={data.category} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Create at ">
                        {data.createdAt}
                    </Descriptions.Item>
                    <Descriptions.Item label="Update at ">
                        {data.updatedAt}
                    </Descriptions.Item>


                </Descriptions>
                <Divider orientation='left'>Ảnh sách</Divider>
                <Upload
                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Drawer >
        </>
    )
}
export default DetailBook;