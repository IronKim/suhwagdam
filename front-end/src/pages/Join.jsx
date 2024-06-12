import React from 'react';
import styled from "styled-components";
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
  } from 'antd';
  const { RangePicker } = DatePicker;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

const Join = () => {
    return (
        <div>
             <Form
                {...formItemLayout}
                variant="filled"
                style={{
                maxWidth: 600,
                }}
            >
                <Form.Item
                label="아이디"
                name="Input"
                rules={[
                    {
                    required: true,
                    message: 'Please input!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="비밀번호"
                name="Password"
                rules={[
                    {
                    required: true,
                    message: 'Please input!',
                    },
                ]}
                >
                <InputNumber
                    style={{
                    width: '100%',
                    }}
                />
                </Form.Item>

                <Form.Item
                label="이름"
                name="Mentions"
                rules={[
                    {
                    required: true,
                    message: 'Please input!',
                    },
                ]}
                >
                    
                <Mentions />
                </Form.Item>

                <Form.Item
                label="전화번호"
                name="Mentions"
                rules={[
                    {
                    required: true,
                    message: 'Please input!',
                    },
                ]}
                >
                <Mentions />
                </Form.Item>

                <Form.Item
                label="주소"
                name="Mentions"
                rules={[
                    {
                    required: true,
                    message: 'Please input!',
                    },
                ]}
                >
                <Mentions />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default Join;