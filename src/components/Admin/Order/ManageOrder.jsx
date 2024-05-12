import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { callGetListOrder } from '../../../services/api';

const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        sorter: true,
        width: '20%',
    },

    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        sorter: true,
        width: '20%',
    },

    {
        title: 'Tổng',
        dataIndex: 'totalPrice',
        sorter: true,
        width: '20%',
    },
];

const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const ManageOrder = () => {
    // STATE: 
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [sortQuery, setSortQuery] = useState("");

    useEffect(() => {
        fetchOrder();
    }, [current, pageSize, sortQuery]);

    const fetchOrder = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${pageSize}`;

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callGetListOrder(query);
        if (res && res?.data) {
            setData(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };


    //2. table change: 
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

        if (sorter && sorter.field) {
            if (sorter.order == 'ascend') {
                setSortQuery(`&sort=${sorter.field}`)
            }

            if (sorter.order == 'descend') {
                setSortQuery(`&sort=-${sorter.field}`)
            }
        }
    };

    return (
        <Table
            columns={columns}
            rowKey={(record) => record?._id}
            dataSource={data}
            current={current}
            pageSize={pageSize}
            loading={loading}
            total={total}
            onChange={handleTableChange}
        />
    );
};

export default ManageOrder;