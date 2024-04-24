
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Table } from 'antd';
import { callGetUserWithPaginate } from '../../../services/api';

const columns = [
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
        render: () => <button>Delete</button>
    }
];

const getRandomuserParams = (params) => ({
    results: pageSize,
    page: current,
    ...params,
});

const User = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        const res = await callGetUserWithPaginate(current, pageSize);

        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    useEffect(() => {
        fetchData();
    }, [current, pageSize]);

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
    )
}

export default User;