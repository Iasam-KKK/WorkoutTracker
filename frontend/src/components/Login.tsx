import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await login(values.username, values.password);
      console.log("Login successful:", response.data);
      message.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Card style={{ width: 300, margin: "100px auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
