import React, { useState } from 'react';
import { Button, Checkbox, Col, Divider, Form, Input, Row, message, notification } from 'antd';
import './register.scss';
import { callLogin, callRegister } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { fullName, email, phone, password } = values;
        setIsSubmit(true);
        const res = await callRegister(fullName, email, phone, password);
        setIsSubmit(false);
        console.log(">>> check res: ", res)
        if (res?.data && res?.data?._id) {
            message.success("Đăng kí tài khoản thành công!");
            navigate('/login');
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };

    const onFinishFailed = (values) => {
        console.log(">>> submit error: ", values);
    }

    return (
        <>
            <Row className='register'>
                <Col xs={{ span: 0 }} md={{ span: 24 }} xl={{ span: 10 }} className='register-title'>
                    <h1>Shop book</h1>
                    <h2>Facebook helps you connect and share with the people in your life.</h2>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 10 }} className='register-con '>
                    <div className='register-con__title'>
                        <h1>
                            Register
                        </h1>
                        <Divider />
                    </div>
                    <div className='register-con__body'>
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600, margin: "0 auto" }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            className='register-body__content'
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Full name'
                                name="fullName"
                                rules={[{ required: true, message: 'Please input your fullName!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Email'
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
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

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label='Phone number'
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item  >
                                <Button type="primary" htmlType="submit" loading={isSubmit}
                                    style={{ width: "100%" }}
                                >
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider>
                        Or
                    </Divider>
                    <div className='register-con__footer'>
                        Bạn có tài khoản?
                        <span
                            onClick={() => navigate('/login')}
                        >Đăng nhập</span>
                    </div>
                </Col>
            </Row>
        </>
    )
};

export default RegisterPage;