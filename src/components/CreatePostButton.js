import React, {Component} from 'react';
import { Modal, Button, message } from 'antd';

import CreatePostForm from "./CreatePostForm";
import {API_ROOT, AUTH_HEADER, POS_KEY, TOKEN_KEY} from "../constants";

class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        // this.setState({
        //     visible: false,
        // });
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values -> ", values);
                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
                const token = localStorage.getItem(TOKEN_KEY);

                const formdata = new FormData();
                formdata.set('lat', lat);
                formdata.set('lon', lon);
                formdata.set('message', values.message);
                formdata.set('image', values.images[0].originFileObj);

                this.setState({
                    confirmLoading: true
                });

                fetch(`${API_ROOT}/post`, {
                    method: 'POST',
                    headers: {Authorization: `${AUTH_HEADER} ${token}`},
                    body: formdata
                })
                    .then((response) => {
                        if (response.ok) {
                            return this.props.loadNearbyPosts();
                        }
                        throw new Error('Failed to create post.');
                    })
                    .then(() => {
                        this.setState({ visible: false, confirmLoading: false });
                        this.form.resetFields();
                        message.success('Post created successfully!');
                    })
                    .catch((e) => {
                        console.error(e);
                        message.error('Failed to create post.');
                        this.setState({ confirmLoading: false });
                    });
            }
        })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {confirmLoading, visible} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Create"
                    // confirmLoading={confirmLoading}
                >
                    <CreatePostForm ref={this.getFormRef}/>
                </Modal>
            </div>
        );
    }

    getFormRef = (formInstance) => {
        console.log(formInstance);
        this.form = formInstance;
    }
}

export default CreatePostButton;