
import { Col, Row, Statistic, Card } from 'antd';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { callGetDashBoard } from '../../services/api';


const DashboardAdmin = () => {
    //STATE:
    const [dashBoard, setDashBoard] = useState({
        countOrder: 0,
        countUser: 0,
    })
    useEffect(() => {
        const getDashBoard = async () => {
            const res = await callGetDashBoard();
            if (res && res?.data) {
                setDashBoard({
                    countOrder: res.data?.countOrder,
                    countUser: res.data?.countUser,
                })
            }
        }
        getDashBoard();
    }, [])

    const formatter = (value) => (
        <CountUp end={value} separator="." />
    );
    return (
        <>
            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Card bordered={true} style={{ width: 300 }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Statistic title="Users" value={dashBoard.countUser} formatter={formatter} />
                            </div>
                        </Card>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Card bordered={true} style={{ width: 300 }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Statistic title="Orders" value={dashBoard.countOrder} formatter={formatter} />
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DashboardAdmin;