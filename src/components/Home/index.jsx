import './Home.scss'
import { IoFilter } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { Button, Col, Form, Row, Checkbox, Divider, InputNumber, Rate, Card, Tabs, Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchCategory, callGetBookWithPaginate } from '../../services/api';


const { Meta } = Card;
const Home = () => {
    const PAGE_SIZE = 8;
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [listCategory, setListCategory] = useState([]);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(0);

    const [querySearch, setQuerySearch] = useState("");
    const [sortQuery, setSortQuery] = useState(`&sort=-sold`);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");

    const [form] = Form.useForm();
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await callFetchCategory();
            if (res && res?.data) {
                let d = [];
                res.data.map(item => {
                    let b = { value: item, label: item }
                    d.push(b);
                })
                setListCategory(d);
            }
        }

        fetchCategory();
    }, [])



    useEffect(() => {
        fetchBook();
    }, [current, pageSize, querySearch, sortQuery, filter]);

    const fetchBook = async () => {
        setLoading(true);
        let query = `?current=${current}&pageSize=${PAGE_SIZE}`;

        if (querySearch) {
            query += querySearch;
        }

        if (sortQuery) {
            query += sortQuery;
        }

        if (filter) {
            query += filter
        }
        const res = await callGetBookWithPaginate(query);
        console.log(">>> check res: ", res);
        if (res && res?.data) {
            setListBook(res.data.result);
            setLoading(false);
            setTotal(res.data.meta.total);
        }
    };

    const handleOnChangePage = (pagination,) => {
        if (pagination && pagination.current !== current)
            setCurrent(pagination.current);
        if (pagination && pagination.pageSize !== pageSize) {
            setCurrent(1);
            setPageSize(pagination.pageSize);
        }

        //`dataSource` is useless since `pageSize` changed
        // if (pagination.pageSize !== pageSize) {
        //     setListBook([]);
        // }

        // if (sorter && sorter.field) {
        //     if (sorter.order == 'ascend') {
        //         setSortQuery(`&sort=${sorter.field}`)
        //     }

        //     if (sorter.order == 'descend') {
        //         setSortQuery(`&sort=-${sorter.field}`)
        //     }
        // }
    };

    const onChangePagination = (page, pageSize) => {
        if (current !== page) setCurrent(page);
    }
    const onFinish = (values) => {
        let query = "";
        if (values?.range?.from > 0 && values?.range?.to > 0) {
            const l = values?.range?.from;
            const r = values?.range?.to;
            query += `&price>=${l}&&price<=${r}`;
        }
        if (values?.category) {
            if (values.category) {
                const cate = values.category;
                if (cate && cate.length > 0) {
                    const f = cate.join(",");
                    query += `&category=${f}`
                }
            }
        }
        setFilter(query);
    }
    const onFinishFailed = () => {

    }

    const onChange = (checkedValues) => {
        if (checkedValues) setSortQuery(`${checkedValues}`)
    };

    const handleChangeFilter = (changedValues, values) => {
        console.log(">>> check changed: ", changedValues, values)
        if (changedValues.category) {
            const cate = values.category;
            if (cate && cate.length > 0) {
                const f = cate.join(",");
                setFilter(`&category=${f}`)
            }
            else {
                setFilter("");
            }
        }
    }

    const items = [
        {
            key: '&sort=-sold',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: '&sort=-updatedAt',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: '&sort=price',
            label: 'Giá thấp đến cao',
            children: <></>,
        },
        {
            key: '&sort=-price',
            label: 'Giá cao đến thấp',
            children: <></>,
        },
    ];
    return (
        <>
            <div className='container'>
                <Row className='home container' gutter={[18, 18]}>
                    <Col lg={6} md={0} sm={0} xs={0}>
                        <div className='filter'>
                            <div className='filter__title'>
                                <span className='filter__title--icon'><IoFilter /></span>
                                <span className='filter__title--name'>Bộ lọc sản phẩm</span>
                                <Button className='filter__title--btn'><GrPowerReset onClick={() => form.resetFields()} /></Button>
                            </div>
                            <div className='filter__body'>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                                    form={form}
                                >
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        label="Danh mục sản phẩm"
                                        name="category"
                                    >
                                        <Checkbox.Group
                                            style={{ width: '100%', display: "flex", justifyContent: "center" }}
                                            onChange={onChange}
                                        >
                                            <Row gutter={3}>
                                                {listCategory?.map((item, index) => {
                                                    return (
                                                        <Col span={24}>
                                                            <Checkbox
                                                                key={index}
                                                                value={item.value}
                                                                style={{ margin: "5px 0", fontSize: "15px" }}
                                                            >
                                                                {item.value}
                                                            </Checkbox>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Checkbox.Group>

                                    </Form.Item>
                                    <Divider />
                                    <Form.Item
                                        labelCol={{ span: 24 }}
                                        label="Khoảng giá"
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                            <Form.Item
                                                name={['range', 'from']}
                                            >
                                                <InputNumber
                                                    name='from'
                                                    min={0}
                                                    placeholder='đ TỪ'
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                />
                                            </Form.Item>
                                            <span>  -  </span>
                                            <Form.Item
                                                name={['range', 'to']}
                                            >
                                                <InputNumber
                                                    name='to'
                                                    min={0}
                                                    placeholder='đ Đến'
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Form.Item>
                                    <Button
                                        type='primary'
                                        style={{ width: "100%" }}
                                        onClick={() => form.submit()}
                                    >Áp dụng</Button>
                                    <Form.Item>
                                        <div>
                                            <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        </div>
                                        <div>
                                            <Rate disabled defaultValue={4} style={{ fontSize: '12px' }} />
                                            <span>trở lên</span>
                                        </div>
                                        <div>
                                            <Rate disabled defaultValue={3} style={{ fontSize: '12px' }} />
                                            <span>trở lên</span>
                                        </div>
                                        <div>
                                            <Rate disabled defaultValue={2} style={{ fontSize: '12px' }} />
                                            <span>trở lên</span>
                                        </div>
                                        <div>
                                            <Rate disabled defaultValue={1} style={{ fontSize: '12px' }} />
                                            <span>trở lên</span>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Col>
                    <Col lg={18} md={24} sm={24} xs={24}>
                        <Row>
                            <Col md={24}>
                                <Tabs defaultActiveKey="1" items={items} onChange={(value) => setSortQuery(value)} />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            {listBook && listBook.length > 0 &&
                                listBook.map((item, index) => {
                                    return (
                                        <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24}
                                            key={index}
                                        >
                                            <Spin tip="Loading..." size="large" spinning={loading}>
                                                <div className='book'>
                                                    <div
                                                        className='book__img'
                                                    >
                                                        <img
                                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}
                                                        />
                                                    </div>
                                                    <div
                                                        className='book__title'
                                                        style={{ height: "60px" }}
                                                    >
                                                        {item.mainText}
                                                    </div>
                                                    <div className='book__price'>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                    </div>
                                                    <div
                                                        className='book__rate'
                                                    >
                                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                                        <span>Đã bán {item.sold}</span>
                                                    </div>
                                                </div>
                                            </Spin>
                                        </Col>

                                    )
                                })
                            }
                        </Row>
                        <Divider />
                        <Pagination
                            current={current}
                            total={total}
                            pageSize={8}
                            onChange={(p, s) => handleOnChangePage({ current: p, pageSize: s })}
                            responsive
                            style={{
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}
                        />
                    </Col>
                </Row >
            </div>
        </>
    )
}

export default Home;