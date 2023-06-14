import HeaderPage from '@/components/Header/Header';
import '@/layouts/LayoutPage/LayoutPage.scss';
import { Breadcrumb, Layout } from 'antd';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;
const LayoutPage = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      nav('/results/2023/races');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Layout className="layout">
      <HeaderPage />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[
            {
              title: 'Home'
            },
            {
              title: <Link to="/">List</Link>
            },
            {
              title: <Link to="/">App</Link>
            }
          ]}
        />
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © Copyright 2023 By Thai Hoc. All Rights are Reserved.
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
