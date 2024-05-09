
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';

const ConfirmOrder = (props) => {

    // REDUX: 
    const user = useSelector(state => state.account.user)

    //PROPS:
    const { setCurrentStep } = props;

    const onFinish = (values) => {
        console.log('Success:', values);
        setCurrentStep(3);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="confirm">
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ width: "100%" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên người nhận"
                        labelCol={{ span: 24 }}
                        name="fullName"
                        rules={[{ required: true, message: 'Không để trống tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        labelCol={{ span: 24 }}
                        name="phone"
                        rules={[{ required: true, message: 'Không để trống điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        labelCol={{ span: 24 }}
                        name="address"
                        rules={[{ required: true, message: 'Không để trống địa chỉ!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Phương thức thanh toán"
                        labelCol={{ span: 24 }}
                        valuePropName="checked"
                        name="method"
                        rules={[{ required: true, message: 'Không để trống phương thức!' }]}
                    >
                        <Radio >Thanh toán khi nhận hàng</Radio>
                    </Form.Item>



                    <Form.Item wrapperCol={{ span: 24 }}>
                        <button type='submit' className='confirm__btn'>
                            Đặt hàng
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default ConfirmOrder;