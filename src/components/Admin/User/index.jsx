
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Col, Divider, Row, Table } from 'antd';
import { callGetUserWithPaginate } from '../../../services/api';
import { MdDelete } from "react-icons/md";
import SearchUser from './Search/SearchUser';
import { GrPowerReset } from "react-icons/gr";
import { CiExport, CiImport } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import DetailUser from './DetailUser/DetailUser';
import CreateNewUser from './CreateNewUser/CreateNewUser';
import ImportUser from './ImportUser/ImportUser';

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
    const [isSearch, setIsSearch] = useState(false);


    const [querySearch, setQuerySearch] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [isOpenUserDetail, setIsOpenUserDetail] = useState(false);
    const [dataUserDetail, setDataUserDetail] = useState("");

    const [isOpenNewUser, setIsOpenNewUser] = useState(false);
    const [isOpenImportUser, setIsOpenImportUser] = useState(false);

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
            render: (text, record, index) => {
                return (
                    <>
                        <div className='action'>
                            <span className='del-btn'>
                                <MdDelete />
                            </span>
                            <span className='view-btn'
                                onClick={() => handleOnView(record)}>
                                <FaEye />
                            </span>
                        </div>
                    </>
                )
            }
        }

    ];

    // FUNCTION: 

    // 1. fetchdata:
    useEffect(() => {
        fetchData();
    }, [current, pageSize, querySearch, sortQuery]);

    const fetchData = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${pageSize}`;

        if (querySearch) {
            query += querySearch;
        }

        if (sortQuery) {
            query += sortQuery;
        }


        const res = await callGetUserWithPaginate(query);
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

    // 3. handle button
    const handleOnReset = () => {
        fetchData("");
        setIsSearch(false);
        setQuerySearch("");
        setSortQuery("");
    }

    const handleOnView = (data) => {
        setIsOpenUserDetail(true);
        setDataUserDetail(data);
    }

    const handleNewUser = () => {
        setIsOpenNewUser(true);
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchUser
                        fetchData={fetchData}
                        setIsSearch={setIsSearch}
                        setQuerySearch={setQuerySearch}
                    />
                </Col>
                <Divider />
                <Col span={24}>
                    <div className='table-user-header'>
                        <span className='table-title'>
                            Table User CRUD
                        </span>
                        <div className='table-btn'>
                            <Button
                                onClick={() => handleOnReset()}
                                type='primary'
                                icon={<GrPowerReset />}

                            ></Button>
                            <Button
                                type='primary'
                                icon={<CiExport />}>
                                <> </>Export
                            </Button>
                            <Button type='primary'
                                icon={<CiImport />}
                                onClick={() => setIsOpenImportUser(true)}>
                                <> </>Import
                            </Button>
                            <Button type='primary'
                                icon={<IoAddCircleOutline />}
                                onClick={() => handleNewUser()}>
                                <> </>Thêm mới
                            </Button>

                        </div>


                    </div>
                    <Table
                        columns={columns}
                        rowKey={(record) => record._id}
                        dataSource={data}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            total: total,
                            showTotal: (total, range) =>
                                <div>{range[0]} - {range[1]} trên {total} dòng</div>
                        }

                        }
                        loading={loading}
                        onChange={handleTableChange}

                    />
                </Col>
            </Row>
            <DetailUser
                isOpenUserDetail={isOpenUserDetail}
                setIsOpenUserDetail={setIsOpenUserDetail}
                data={dataUserDetail}
            />
            <CreateNewUser
                isOpenNewUser={isOpenNewUser}
                setIsOpenNewUser={setIsOpenNewUser}
                fetchData={fetchData}
            />
            <ImportUser
                isOpenImportUser={isOpenImportUser}
                setIsOpenImportUser={setIsOpenImportUser}
            />
        </>
    )
}

export default User;