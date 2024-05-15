import React from 'react';
import { Button, Form, Input } from 'antd';
import { PiExport } from "react-icons/pi";
import './SearchUser.scss'

const SearchUser = (props) => {
    const handleSearch = (query) => {
        props.setCurrent(1);
        props.fetchUser();
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
            props.setIsSearch(true);
            props.setQuerySearch(query);
            handleSearch(query);
        }
    };

    const handleClear = () => {
        props.setIsSearch(false);
        let inputClear = document.getElementById("form_item_path_id").reset();
    }

    return (
        <>
            <Form n
                ame="form_item_path" layout="vertical" onFinish={onFinish}
                id='form_item_path_id'>
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
                <div style={{ textAlign: "right" }} className='search-btn'>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button type='default'
                        onClick={() => handleClear()}
                    >Clear</Button>
                </div>
            </Form>
        </>
    )
}
export default SearchUser;