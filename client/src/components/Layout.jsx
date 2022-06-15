import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import './layout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const { Header, Sider, Content } = Layout;

const LayoutApp = ({children}) => {
  const {cartItems, loading} = useSelector(state => state.rootReducer);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            <h2 className="logo-title">POS SYSTEM</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
            <Menu.Item key='/' icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<MoneyCollectOutlined />}>
                <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<HomeOutlined />}>
                <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key='/customers' icon={<UserSwitchOutlined />}>
                <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key='/logout' icon={<LogoutOutlined />} onClick={() => {localStorage.removeItem("auth"); navigate("/login");}}>
                LogOut
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div className="cart-items" onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined />
            <span className="cart-badge">{cartItems.length}</span>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;