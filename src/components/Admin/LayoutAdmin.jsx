import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { FaAddressBook } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import Account from '../Account/Account';
import './LayoutAdmin.scss'

const { Header, Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme='light'>
                <div style={{ height: 23, margin: 16, textAlign: "center" }} className='title'>
                    <GrUserAdmin /> {!collapsed && <>Admin</>}
                </div>
                <Menu
                    title='Admin'
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <RxDashboard />,
                            label: <Link to={'/admin'}>Dash board</Link>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'Manage Users',
                            children: [
                                {
                                    key: '5',
                                    icon: <FaUsersGear />,
                                    label: <Link to={'/admin/user'}>CRUD</Link>
                                },
                                {
                                    key: '6',
                                    icon: <CiFileOn />,
                                    label: 'File'
                                },
                            ]
                        },
                        {
                            key: '3',
                            icon: <FaAddressBook />,
                            label: <Link to={'/admin/book'}>Manage Books</Link>,
                        },
                        {
                            key: '4',
                            icon: <MdBorderColor />,
                            label: <Link to={'/admin/order'}>Manage Orders</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} theme='light' className='admin-header'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Account />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 500,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;