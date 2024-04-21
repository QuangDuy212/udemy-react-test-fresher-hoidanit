import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import './Account.scss'
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { useNavigate } from "react-router-dom";

const Account = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);

    const hanldeLogout = async () => {
        if (!isAuthenticated) return;
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success("Đăng xuất thành công!");
            navigate("/");
        }
    }

    const items = [
        {
            label: "Quản lý tài khoản",
            key: '0',
        },
        {
            label: "Đăng xuất",
            key: '1',
            onClick: () => hanldeLogout()
        }
    ];
    return (
        <div className="account">
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {isAuthenticated === false
                            ?
                            <>Tài khoản</>
                            :
                            <>{user.fullName}</>
                        }
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export default Account;