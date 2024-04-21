import { GiBlackBook } from "react-icons/gi";
import { CgSearch } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Dropdown, Row, Col, Button, Layout, Menu, theme, Drawer, Radio, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.scss'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
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



const Header = () => {

    const [collapsed, setCollapsed] = useState(false);
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
            <Row className="header">
                <Col className="header__title" xs={{ span: 6 }}>
                    <div className="header__title--icon"><GiBlackBook /></div>
                    <div className="header__title--text">Book shop</div>
                    <div className="header__title--bar">
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
                    </div>
                </Col>
                <Col className="header__search" xs={{ span: 12 }}>
                    <input type="text" placeholder="Tìm kiếm" />
                </Col>
                <Col className="header__feature" xs={{ span: 6 }} >
                    <div className="header__feature--cart">
                        <Space size="middle">
                            <Badge count={10} overflowCount={9}>
                                <FaCartShopping />
                            </Badge>
                        </Space>
                    </div>
                    <div className="header__feature--account">
                        <Account />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Header;