import HeaderPage from '@/components/Header/Header';
import '@/layouts/LayoutPage/LayoutPage.scss';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;
const LayoutPage = () => {
  return (
    <Layout className='layout'>
      <HeaderPage />
      <Content style={{ padding: '0 50px' }}>
        <div className='site-layout-content'>
          <Outlet />
        </div>
      </Content>
      <hr style={{ margin: '10px 40px 0' }} />
      <Footer style={{ textAlign: 'center' }}>© Copyright 2023 By Thai Hoc. All Rights are Reserved.</Footer>
    </Layout>
  );
};

export default LayoutPage;
