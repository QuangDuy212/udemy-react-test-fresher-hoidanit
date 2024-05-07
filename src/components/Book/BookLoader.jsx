
import { Divider, Form, Radio, Skeleton, Space, Switch, Row, Col } from 'antd';
import { useState } from 'react';

const BookLoader = () => {
    const [active, setActive] = useState(true);
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col xl={10} md={24} sm={24} xs={24}>
                    <Skeleton.Input
                        active={active}
                        block={true}
                        style={{ width: "100%", height: "350px" }}
                    />
                    <div style={{ display: "flex", gap: 20, marginTop: 20, overflow: "hidden", justifyContent: "center" }}>
                        <Skeleton.Image active={active} />
                        <Skeleton.Image active={active} />
                        <Skeleton.Image active={active} />
                    </div>
                </Col>
                <Col xl={14} md={24} sm={24} xs={24}>
                    <div style={{ margin: "10px 0" }}>
                        <Skeleton paragraph={{ rows: 4 }} />
                    </div>
                    <div style={{ margin: "10px 0" }}>
                        <Skeleton paragraph={{ rows: 3 }} />
                    </div>
                    <div style={{ margin: "10px 0", display: "flex", gap: 20 }}>
                        <Skeleton.Input active={active} />
                        <Skeleton.Input active={active} />
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default BookLoader;