import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useSelector } from "react-redux";
import './ChangPassword.scss';
import { callChangePassword } from "../../../services/api";

const ChangePassword = (props) => {
    // REDUX:
    const user = useSelector(state => state.account.user);

    //LIBRARY:
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { email, oldpass, newpass } = values;
        const res = await callChangePassword(email, oldpass, newpass);
        if (res.statusCode === 201) {
            message.success("Cập nhật thành công!");
            form.setFieldValue("oldpass", "")
            form.setFieldValue("newpass", "")
        }
        else {
            notification.error({
                description: res.message,
                message: "Có lỗi xảy ra!",
            })
        }
    }
    const onFinishFailed = (error) => {

    }
    return (
        <>
            <Row>
                <Col md={24} sm={24} xs={24}>
                    <div className="update-password">
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
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Không được để trống!' }]}
                                initialValue={user?.email}

                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu cũ"
                                name="oldpass"
                                rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu mới"
                                name="newpass"
                                rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ChangePassword;