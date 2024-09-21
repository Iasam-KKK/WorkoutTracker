import React, { useState, useEffect } from "react";
import { Layout, Menu, Typography, Spin, message } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { getCurrentUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

interface User {
  id: number;
  username: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, user is not logged in");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error: any) {
        console.error("Failed to fetch current user:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Workouts
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            Progress
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Title level={2}>Welcome to Your Workout Dashboard</Title>
            {user && (
              <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
            )}
            {/* Add more content here */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
