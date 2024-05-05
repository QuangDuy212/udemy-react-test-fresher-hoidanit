import { GiBlackBook } from "react-icons/gi";
import { CgSearch } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Dropdown, Row, Col, Button, Layout, Menu, theme, Drawer, Radio, Divider, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.scss'
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import Account from "../Account/Account";
import logo from '../../../public/logo/logo.jpg'



const Header = () => {

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Row className="header" gutter={[0, 5]} >
                <Col className="header__title" xs={4}>
                    <Row gutter={[0, 5]}>
                        <Col className="header__title--logo" lg={24} md={0} sm={0} xs={0}
                            onClick={() => navigate('/')}>Book shop</Col>
                        <Col className="header__title--bar" lg={0} md={24} sm={24} xs={24}>
                            <span onClick={showDrawer} className="icon">
                                <FaBars />
                            </span>
                            <Drawer
                                title="Menu"
                                placement={placement}
                                width={500}
                                onClose={onClose}
                                open={open}
                                className="bar"
                            >
                                <Divider />
                                <p style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}>Quản lý tài khoản</p>
                                <Divider />
                                <p style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}>Đăng xuất</p>
                                <Divider />
                            </Drawer>
                        </Col>
                    </Row>
                </Col>
                <Col className="header__search" xs={16}>
                    <Input type="text" placeholder="Tìm kiếm" style={{ width: "100%" }} />
                </Col>
                <Col xs={4} >
                    <Row className="header__feature">
                        <Col className="header__feature--cart" lg={5}  >
                            <Space size="middle">
                                <Badge count={10} overflowCount={9}>
                                    <FaCartShopping />
                                </Badge>
                            </Space>
                        </Col>
                        <Col className="header__feature--account" lg={14} md={0} sm={0} xs={0}>
                            <Account />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Header;