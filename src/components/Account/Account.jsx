import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import './Account.scss'
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { Link, useNavigate } from "react-router-dom";

import { UserOutlined } from '@ant-design/icons';

const Account = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);

    const hanldeLogout = async () => {
        if (!isAuthenticated) return;
        const res = await callLogout();
        if (res && res?.data) {
            dispatch(doLogoutAction());
            message.success("Đăng xuất thành công!");
            navigate("/");
        }
    }

    const itemsAuth = [
        {
            label: "Quản lý tài khoản",
            key: 'manage',
        },
        {
            label: "Lịch sử mua hàng",
            key: 'history',
            onClick: () => { navigate("/history") }
        },
        {
            label: "Đăng xuất",
            key: 'logout',
            onClick: () => hanldeLogout()
        }
    ];
    if (user.role === 'ADMIN' && window.location.pathname.startsWith('/admin')) {
        const tmp = {
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin'
        }
        if (itemsAuth.includes(tmp)) {
            itemsAuth.filter(item => item != tmp)
        }
        itemsAuth.unshift({
            label: <Link to='/'>Trang chủ</Link>,
            key: 'home'
        })
    }
    else if (user.role === 'ADMIN' && window.location.pathname == '/') {
        const tmp = {
            label: <Link to='/'>Trang chủ</Link>,
            key: 'home'
        }
        if (itemsAuth.includes(tmp)) {
            itemsAuth.filter(item => item != tmp)
        }
        itemsAuth.unshift({
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'home'
        })
    }

    const itemsNotAuth = [
        {
            label: <Link to='/register'>Đăng kí</Link>,
            key: 'register',
        },
        {
            label: <Link to='/login'>Đăng nhập</Link>,
            key: 'login',
        },
    ]

    const items = isAuthenticated ? itemsAuth : itemsNotAuth



    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`
    return (
        <div className="account">
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {isAuthenticated === false
                            ?
                            <>Tài khoản</>
                            :
                            <>
                                <Avatar
                                    size="large"
                                    icon={<UserOutlined />}
                                    src={urlAvatar} />
                                {user.fullName}
                            </>
                        }
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export default Account;