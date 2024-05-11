import {
    Col, Row, Avatar, Button, Checkbox,
    Form, Input, message, Upload,
    notification
} from "antd";
import './UpdateInfoUser.scss'
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { callUpdateAvatar, callUpdateInfo } from "../../../services/api";
import { doUpdateAction } from "../../../redux/account/accountSlice";

const UpdateInfoUser = (props) => {
    //REDUX:
    const user = useSelector(state => state.account.user);

    //LIBRARY:
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    //STATE:
    const [avatar, setAvatar] = useState(user?.avatar);


    //METHODS:
    const onFinish = async (values) => {
        const { _id, email, fullName, phone } = values;
        const data = { _id, email, fullName, phone, avatar: avatar }
        const res = await callUpdateInfo(_id, fullName, phone, avatar);
        if (res && res?.data && res?.statusCode === 200) {
            dispatch(doUpdateAction(data))
            message.success("Cập nhật thông tin thành công!");
            localStorage.removeItem("access_token");
        }
        else {
            notification.error({
                description: res.message,
                message: "Có lỗi xảy ra!",
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUpdateAvatar(file);
        if (res) {
            setAvatar(res?.data?.fileUploaded)
            console.log(">>> check res: ", res)
            onSuccess('ok');
        }
        else {
            onError("Đã có lỗi khi upload file!")
        }
    }

    const prop = {
        name: 'file',
        //action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        mutiple: false,
        maxCount: 1,
        customRequest: handleUploadFileThumbnail,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`Upload file thành công!`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại!`);
            }
        },
    };
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <div className="avatar">
                        <div className="avatar__img">
                            <Avatar
                                size={{ xs: "80px", sm: "100px", md: "120px", lg: "140px", xl: "150px", xxl: "200px" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`}
                            />
                        </div>
                        <div className="avatar__btn">
                            <Upload {...prop}>
                                <Button icon={<UploadOutlined />}>Cập nhật ảnh</Button>
                            </Upload>
                        </div>
                    </div>
                </Col>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="ID"
                            name="_id"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                            initialValue={user?.id}
                            hidden
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                            initialValue={user?.email}

                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Tên hiển thị"
                            name="fullName"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                            initialValue={user?.fullName}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                            initialValue={user?.phone}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default UpdateInfoUser;