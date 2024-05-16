import { useEffect, useState } from 'react';
import './HistoryOrder.scss';
import { Col, Row, Space, Table, Tag } from 'antd';
import { callGetListOrderWithPaginate } from '../../services/api';
import ModalDetail from './ModalDetail';



const HistoryOrder = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState("");

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'updatedAt',
            width: '20%',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            width: '20%',
        },
        {
            title: 'Trạng thái',
            width: '20%',
            render: () => <Tag color="success">Thành công</Tag>
        },
        {
            title: "Chi tiết",
            width: "20%",
            render: (record) => <span
                className='detail-btn'
                onClick={() => handleOnDetail(record.detail)}
            >Xem chi tiết</span>

        }
    ];

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });


    const fetchData = async () => {
        setLoading(true);
        const res = await callGetListOrderWithPaginate(tableParams.pagination.current, tableParams.pagination.pageSize);

        if (res && res?.data?.result) {
            setData(res?.data?.result);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const handleOnDetail = (data) => {
        setIsOpenDetail(true);
        setDataDetail(data);
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <>
            <div className='history'>
                <div style={{ height: "60px" }}></div>
                <Row>
                    <Col xl={24} md={24} sm={0} xs={0}>
                        <div className='history__title'> Lịch sử mua hàng</div>
                    </Col>
                </Row>

                <div className='history__table'>
                    <Table
                        columns={columns}
                        rowKey={(record) => record._id}
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
            <ModalDetail
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
                dataDetail={dataDetail}
            />
        </>
    )
}
export default HistoryOrder;
