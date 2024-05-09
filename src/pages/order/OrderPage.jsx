import { Col, Divider, InputNumber, Row } from "antd";
import './OrderPage.scss';

const OrderPage = () => {
    const onChange = (value) => {
        console.log(">>> check value: ", value);
    }
    return (
        <>
            <div className="cart-container">
                <Row gutter={[20, 20]}>
                    <Col md={18} sm={24}>
                        <Row gutter={[20, 20]}>
                            <Col xl={24} md={24} sm={24}>
                                <div className="title">
                                    <Row>
                                        <Col className="title__name" xs={12} sm={12}>
                                            Sản phẩm
                                        </Col>
                                        <Col className="title__price flex-full" xs={3} sm={3}>
                                            Đơn giá
                                        </Col>
                                        <Col className="title__quantity flex-full" xs={3} sm={3}>
                                            Số lượng
                                        </Col>
                                        <Col className="title__total flex-full" xs={3} sm={3}>
                                            Thành tiền
                                        </Col>
                                        <Col className="title__btn flex-full" xs={3} sm={3}>
                                            Thao tác
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xl={24} md={24} sm={24}>
                                <div className="product">
                                    <Row>
                                        <Col className="product__img " span={4}>
                                            <img src="https://picsum.photos/id/1018/1000/600/" />
                                        </Col>
                                        <Col className="product__name " span={8}>
                                            Cẩm nang du lịch
                                        </Col>
                                        <Col className="product__price flex-full" span={3}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                        </Col>
                                        <Col className="product__quantity flex-full" span={3}>
                                            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                                        </Col>
                                        <Col className="product__total flex-full" span={3}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                        </Col>
                                        <Col className="product__btn flex-full" span={3}>
                                            <button>Xóa</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} sm={24}>
                        <div className="pay">
                            <div className="pay-content">
                                <div className="pay-content__tmp">
                                    <div>Tạm tính</div>
                                    <div >
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                    </div>
                                </div>
                                <Divider />
                                <div className="pay-content__main">
                                    <div>Tổng tiền</div>
                                    <div style={{
                                        color: "#ee4d2d"
                                    }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                    </div>
                                </div>
                                <Divider />
                            </div>
                            <div className="pay__btn">
                                <button>Mua hàng <span>(2)</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default OrderPage;