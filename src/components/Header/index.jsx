import { GiBlackBook } from "react-icons/gi";
import { CgSearch } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { ClockCircleOutlined } from '@ant-design/icons';
import {
    Avatar, Badge, Space, Dropdown, Row, Col,
    Button, Layout, Menu, theme, Drawer,
    Radio, Divider, Input, ConfigProvider, Popover, Empty,
    message
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.scss'
import { useDispatch, useSelector } from "react-redux";
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
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";



const Header = (props) => {

    // LIBRARY:
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //PROPS:
    const { searchTerm, setSearchTerm } = props;

    //REDUX: 
    const carts = useSelector(state => state.order.carts);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    // STATE: 
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const [isOpenCart, setIsOpenCart] = useState(true);
    const [isOpenAccount, setIsOpenAccount] = useState("NO");


    //METHODS:
    const hanldeLogout = async () => {
        if (!isAuthenticated) return;
        const res = await callLogout();
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success("Đăng xuất thành công!");
            navigate("/");
        }
        setOpen(false)
    }
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const truncate = (str, n) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    };

    const handleOnChange = (value) => {
        setSearchTerm(`&mainText=/${value}/i`)
    }

    const contentPopover = () => {
        return (
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {carts && carts.length > 0 && carts?.map((item, index) => {
                        return (
                            <div className="book" key={`book${index}`}>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`}

                                    className="book__img"
                                />
                                <div className="book__name">
                                    {truncate(item.detail.mainText, 100)}
                                </div>
                                <div className="book__price">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                                </div>
                            </div>
                        )
                    })}
                    {carts.length === 0 &&
                        <Empty description="Không có sản phẩm nào" />
                    }
                </div>
                <div className="pop-cart-footer">
                    <button onClick={() => navigate("/order")}> Xem Giỏ Hàng</button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Row className="header" gutter={[0, 5]} >
                <Col className="header__title" md={4} xs={4}>
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
                                <p
                                    style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}
                                    onClick={() => { navigate("/"); setOpen(false) }}
                                >
                                    Trang chủ
                                </p>
                                <Divider />
                                {isAuthenticated &&
                                    <>
                                        <p
                                            style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}
                                            onClick={() => { setIsOpenAccount("YES"); setOpen(false) }}
                                        >
                                            Quản lý tài khoản</p>
                                        <Divider />
                                        <p
                                            style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}
                                            onClick={() => hanldeLogout()}>

                                            Đăng xuất
                                        </p>
                                        <Divider />
                                    </>
                                }
                                {!isAuthenticated &&
                                    <>
                                        <p
                                            style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}
                                            onClick={() => { navigate("/login"); setOpen(false) }}
                                        >
                                            Đăng nhập</p>
                                        <Divider />
                                        <p
                                            style={{ padding: "5px", margin: "10px 0", fontSize: "20px" }}
                                            onClick={() => navigate("/register")}>

                                            Đăng kí
                                        </p>
                                        <Divider />
                                    </>
                                }
                            </Drawer>
                        </Col>
                    </Row>
                </Col>
                <Col className="header__search" md={14} xs={16}>
                    <Input
                        type="text"
                        placeholder="Tìm kiếm"
                        style={{ width: "100%" }}
                        value={searchTerm}
                        onChange={(value) => setSearchTerm(value?.target?.value)}
                    />
                </Col>
                <Col md={6} xs={4} >
                    <Row className="header__feature">
                        <Popover
                            placement="bottomRight"
                            title={"Sản phẩm mới thêm"}
                            content={contentPopover}
                            className="pop-cart"
                            rootClassName="pop-cart"
                            width={"400px"}
                        >
                            <Col lg={5} md={0} sm={0} xs={0}>
                                <div className="header__feature--cart">
                                    <Space size="middle">
                                        <Badge count={carts?.length ?? 0} overflowCount={9} showZero>
                                            <span className="icon-cart1">
                                                <FaCartShopping />
                                            </span>
                                        </Badge>
                                    </Space>
                                </div>
                            </Col>
                        </Popover>
                        <Col lg={0} md={5} sm={5} xs={5}>
                            <div
                                className="header__feature--cart"
                                onClick={() => navigate('/order')}
                            >
                                <Badge count={carts?.length ?? 0} overflowCount={9} showZero>
                                    <span className="icon-cart1">
                                        <FaCartShopping />
                                    </span>
                                </Badge>
                            </div>
                        </Col>
                        <Col lg={14} md={0} sm={0} xs={0}>
                            <div className="header__feature--account" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Account
                                    isOpenAccount={isOpenAccount}
                                    setIsOpenAccount={setIsOpenAccount}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default Header;