import './Home.scss'
import { IoFilter } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { Button, Col, Form, Row, Checkbox, Divider, InputNumber, Rate, Card, Tabs } from 'antd';


const { Meta } = Card;
const Home = () => {
    const onFinish = () => {

    }
    const onFinishFailed = () => {

    }

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const items = [
        {
            key: '1',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: '2',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: '3',
            label: 'Giá thấp đến cao',
            children: <></>,
        },
        {
            key: '4',
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
                                <Button className='filter__title--btn'><GrPowerReset /></Button>
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
                                                <Col span={24}>
                                                    <Checkbox value="A">A</Checkbox>
                                                </Col>
                                                <Col span={24}>
                                                    <Checkbox value="B">B</Checkbox>
                                                </Col>
                                                <Col span={24}>
                                                    <Checkbox value="C">C</Checkbox>
                                                </Col>
                                                <Col span={24}>
                                                    <Checkbox value="D">D</Checkbox>
                                                </Col>
                                                <Col span={24}>
                                                    <Checkbox value="E">E</Checkbox>
                                                </Col>
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
                                        htmlType='submit'
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
                                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/3-0ac3265a7e0b685ccdf624724721fd6d.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={6} md={8} sm={8} xs={12}>
                                <div className='book'>
                                    <div
                                        className='book__img'
                                    >
                                        <img
                                            src='http://localhost:8080/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg'
                                        />
                                    </div>
                                    <div className='book__title'>
                                        Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh
                                    </div>
                                    <div className='book__price'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)}
                                    </div>
                                    <div
                                        className='book__rate'
                                    >
                                        <Rate disabled defaultValue={5} style={{ fontSize: '10px' }} />
                                        <span>Đã bán 1K</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </div>
        </>
    )
}

export default Home;