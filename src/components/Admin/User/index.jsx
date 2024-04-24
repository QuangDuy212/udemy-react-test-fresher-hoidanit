
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Col, Divider, Row, Table } from 'antd';
import { callGetUserWithPaginate } from '../../../services/api';
import { MdDelete } from "react-icons/md";
import SearchUser from './Search/SearchUser';




const getRandomuserParams = (params) => ({
    results: pageSize,
    page: current,
    ...params,
});

const User = () => {
    // STATE: 
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const columns = [
        {
            title: "Table List User",
            children: [
                {
                    title: 'ID',
                    dataIndex: '_id',
                    width: "20%",
                },
                {
                    title: 'Tên hiển thị',
                    dataIndex: 'fullName',
                    sorter: true,
                    width: "20%",
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    sorter: true,
                    width: "20%",
                },
                {
                    title: 'Phone',
                    dataIndex: 'phone',
                    sorter: true,
                    width: "20%",
                },
                {
                    title: 'Action',
                    width: "20%",
                    render: () => {
                        return (
                            <>
                                <span className='del-btn'>
                                    <MdDelete />
                                </span>
                            </>
                        )
                    }
                }
            ],
        },

    ];

    // FUNCTION: 

    useEffect(() => {
        fetchData();
    }, [current, pageSize]);

    const fetchData = async (query) => {
        setLoading(true);
        let queryReal = `?current=${current}&pageSize=${pageSize}`;
        if (query) {
            queryReal += query;
        }
        const res = await callGetUserWithPaginate(queryReal);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };



    const handleTableChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current)
            setCurrent(pagination.current);
        if (pagination && pagination.pageSize !== pageSize) {
            setCurrent(1);
            setPageSize(pagination.pageSize);
        }

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== pageSize) {
            setData([]);
        }
    };
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchUser fetchData={fetchData} />
                </Col>
                <Divider />
                <Col span={24}>
                    <button onClick={() => fetchData("")}>RESET</button>
                    <Table
                        columns={columns}
                        rowKey={(record) => record._id}
                        dataSource={data}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total
                        }

                        }
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>

        </>
    )
}

export default User;