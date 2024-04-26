import React, { useState } from 'react';
import { Button, Modal, message, Upload, Space, Table, Tag } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Dragger } = Upload;

const ImportUser = (props) => {
    const { isOpenImportUser, setIsOpenImportUser } = props;

    const [data, setData] = useState("");

    const showModal = () => {
        setIsOpenImportUser(true);
    };

    const handleOk = () => {
        setIsOpenImportUser(false);
    };

    const handleCancel = () => {
        setIsOpenImportUser(false);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        //action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        //https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it

        //https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const file = info.fileList[0].originFileObj;
                let reader = new FileReader();

                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    // find the name of your sheet in the workbook first
                    let sheet = workbook.Sheets[workbook.SheetNames[0]];

                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(sheet, {
                        header: ["fullName", "email", "phone"],
                        range: 1
                    });
                    if (jsonData && jsonData.length > 0)
                        setData(jsonData);
                };
                reader.readAsArrayBuffer(file);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    const columns = [
        {
            title: 'Tên hiện thị',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    const renderHeader = () => {
        return (
            <div >
                <span>Table User Upload</span>
            </div>
        )
    }
    return (
        <>
            <Modal
                title="Import User"
                open={isOpenImportUser}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Import'}
                maskClosable={false}
            >
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx
                    </p>
                </Dragger>
                <Table
                    columns={columns}
                    title={renderHeader}
                    dataSource={data}
                />
            </Modal>
        </>
    );
};

export default ImportUser;