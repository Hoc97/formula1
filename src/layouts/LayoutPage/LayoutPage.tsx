import HeaderPage from '@/components/Header/Header';
import '@/layouts/LayoutPage/LayoutPage.scss';
import { Breadcrumb, Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;
const LayoutPage = () => {
  return (
    <Layout className='layout'>
      <HeaderPage />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[
            {
              title: 'Home'
            },
            {
              title: <Link to='/'>List</Link>
            },
            {
              title: <Link to='/'>App</Link>
            }
          ]}
        />
        <div className='site-layout-content'>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© Copyright 2023 By Thai Hoc. All Rights are Reserved.</Footer>
    </Layout>
  );
};

export default LayoutPage;
