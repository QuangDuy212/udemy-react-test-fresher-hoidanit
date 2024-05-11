
import { Button, Modal, Tabs } from 'antd';
import UpdateInfoUser from './UpdateInfoUser';
import ChangePassword from './ChangePassword';

const ManageUser = (props) => {
    const { isOpenManage, setIsOpenManage, user } = props

    const items = [
        {
            key: 'update',
            label: 'Chỉnh sửa thông tin',
            children: <UpdateInfoUser />,
        },
        {
            key: 'updatePassword',
            label: 'Đổi mật khẩu',
            children: <ChangePassword />,
        },
    ];

    const onChange = (key) => {
    };
    return (
        <>
            <Modal
                title="Thông tin cá nhân"
                centered
                open={isOpenManage}
                onOk={() => setIsOpenManage(false)}
                onCancel={() => setIsOpenManage(false)}
                width={800}
                footer={<></>}
            >
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Modal>
        </>
    )
}
export default ManageUser;