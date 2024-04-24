import React from 'react';
import { Button, Form, Input } from 'antd';
import { PiExport } from "react-icons/pi";

const SearchUser = (props) => {
    const handleSearch = (query) => {
        props.fetchData(query);
    }
    const MyFormItemContext = React.createContext([]);

    function toArr(str) {
        return Array.isArray(str) ? str : [str];
    }

    const MyFormItemGroup = ({ prefix, children }) => {
        const prefixPath = React.useContext(MyFormItemContext);
        const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

        return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
    };

    const MyFormItem = ({ name, ...props }) => {
        const prefixPath = React.useContext(MyFormItemContext);
        const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

        return <Form.Item name={concatName} {...props} />;
    };
    const onFinish = (value) => {
        let query = "";
        if (value.user.fullName) {
            query += `&fullName=/${value.user.fullName}/i`;
        }
        if (value.user.email) {
            query += `&email=/${value.user.email}/i`;
        }
        if (value.user.phone) {
            query += `&phone=/${value.user.phone}/i`;
        }
        if (query) {
            handleSearch(query);
        }
    };

    return (
        <>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <MyFormItemGroup prefix={['user']}>
                    <MyFormItem name="fullName" label="Name">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="email" label="Email">
                        <Input />
                    </MyFormItem>

                    <MyFormItem name="phone" label="Phone">
                        <Input />
                    </MyFormItem>
                </MyFormItemGroup>
                <div style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button type='default'>Clear</Button>
                </div>
            </Form>
        </>
    )
}
export default SearchUser;