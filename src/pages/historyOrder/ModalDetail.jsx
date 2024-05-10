
import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';

const ModalDetail = (props) => {
    const { isOpenDetail, setIsOpenDetail, dataDetail } = props;


    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Tên sách',
            dataIndex: 'bookName',
            width: '50%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: '50%',
        },
    ];

    useEffect(() => {
        setData(dataDetail)
    }, [dataDetail]);
    return (
        <>
            <Modal
                title="Xem chi tiết lịch sử"
                centered
                open={isOpenDetail}
                onOk={() => setIsOpenDetail(false)}
                onCancel={() => setIsOpenDetail(false)}
                width={1000}

            >
                <Table
                    columns={columns}
                    rowKey={(record) => record._id}
                    dataSource={data}
                    loading={loading}
                    pagination={false}
                />
            </Modal>
        </>
    )
}

export default ModalDetail;