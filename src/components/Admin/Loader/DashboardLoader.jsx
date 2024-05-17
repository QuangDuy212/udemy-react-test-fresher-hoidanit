import { Divider, Form, Radio, Skeleton, Space, Switch, Row, Col } from 'antd';
import { useState } from 'react';
import './DashboardLoader.scss';
const DashboardLoader = (props) => {
    const [active, setActive] = useState(true);
    return (
        <>

            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <div className='input'>
                        <Skeleton.Input
                            active={active}
                            block={true}
                            style={{ width: "300px", height: "100px" }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className='input'>
                        <Skeleton.Input
                            active={active}
                            block={true}
                            style={{ width: "300px", height: "100px" }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default DashboardLoader;