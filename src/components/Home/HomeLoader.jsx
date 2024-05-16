import { Divider, Form, Radio, Skeleton, Space, Switch, Row, Col } from 'antd';
import { useState } from 'react';
const HomeLoader = (props) => {
    const [active, setActive] = useState(true);
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col lg={6} md={0} sm={0} xs={0}>
                    <Skeleton.Input
                        active={active}
                        block={true}
                        style={{ width: "100%", height: "500px", marginTop: "60px" }}
                    />
                </Col>
                <Col lg={18} md={24} sm={24} xs={24}>
                    <div style={{ marginTop: "60px" }}>
                        <Skeleton paragraph={{ rows: 0 }} />
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Skeleton.Input
                                active={active}
                                block={true}
                                style={{ width: "100%", height: "300px" }}
                            />
                        </Col>
                        <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Skeleton.Input
                                active={active}
                                block={true}
                                style={{ width: "100%", height: "300px" }}
                            />
                        </Col>
                        <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Skeleton.Input
                                active={active}
                                block={true}
                                style={{ width: "100%", height: "300px" }}
                            />
                        </Col>
                        <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Skeleton.Input
                                active={active}
                                block={true}
                                style={{ width: "100%", height: "300px" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default HomeLoader;