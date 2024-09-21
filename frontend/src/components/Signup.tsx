import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await signup(
        values.username,
        values.email,
        values.password
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);

      // Show error message to the user
    }
  };

  return (
    <Card style={{ width: 300, margin: "100px auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Sign Up
      </Title>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Sign up
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/login">Already have an account? Log in</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
