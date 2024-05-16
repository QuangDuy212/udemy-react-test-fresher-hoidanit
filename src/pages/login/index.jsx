import React, { useState } from 'react';
import { Button, Checkbox, Col, Divider, Form, Input, Row, message, notification } from 'antd';

import { callLogin, callRegister } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './login.scss'
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        setIsSubmit(false);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success("Đăng nhập tài khoản thành công!");
            navigate('/');
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message,
                duration: 2
            })
        }
    };

    const onFinishFailed = (values) => {
        console.log(">>> submit error: ", values);
    }
    return (
        <>
            <>
                <Row className='login'>
                    <Col xs={0} md={24} xl={10} className='login-title'>
                        <h1>Book shop</h1>
                        <h2>Book shop helps you find and learn  in your life.</h2>
                    </Col>
                    <Col xs={24} md={24} xl={10} className='login-con'>
                        <div className='login-con__title'>
                            <h1>
                                Login
                            </h1>
                            <Divider />
                        </div>
                        <div className='login-con__body'>
                            <Form
                                name="basic"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                style={{ maxWidth: 600, margin: "0 auto" }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className='login-body__content'
                            >
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label='UserName'
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your UserName!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label='Password'
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item  >
                                    <Button type="primary" htmlType="submit" loading={isSubmit}
                                        style={{ width: "100%" }}
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <Divider>
                            Or
                        </Divider>
                        <div className='login-con__footer'>
                            Bạn chưa có tài khoản?
                            <span
                                onClick={() => navigate('/register')}
                            >Đăng kí</span>
                        </div>
                    </Col>
                </Row>
            </>
        </>
    )
}

export default LoginPage;