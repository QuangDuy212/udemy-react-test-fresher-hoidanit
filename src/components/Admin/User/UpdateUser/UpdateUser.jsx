import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { callUpdateUser } from '../../../../services/api';

const UpdateUser = (props) => {
    //PROPS:
    const { fetchUser, isOpenUpdateUser, setIsOpenUpdateUser, dataUpdate } = props;

    //STATE: 
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    //METHOD: 
    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    const onFinish = async (values) => {
        const { fullName, phone } = values;
        const id = dataUpdate._id;
        const res = await callUpdateUser(id, fullName, phone);
        if (res && res?.data) {
            notification.success({
                description: "Cập nhật tài khoản thành công!"
            }
            );
            await fetchUser();
            setIsOpenUpdateUser(false);
        } else {
            notification.error({ description: "Cập nhật tài khoản có lỗi xảy ra!" });
        }
    }

    const onFinishFailed = (error) => {
        console.log(">>> check error: ", error)
    }

    const showModal = () => {
        setIsOpenUpdateUser(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsOpenUpdateUser(false);
    };

    return (
        <>
            <Modal
                title="Basic Modal"
                open={isOpenUpdateUser}
                onOk={handleOk}
                onCancel={handleCancel}
            >
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
                    form={form}
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
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Phone number'
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateUser;