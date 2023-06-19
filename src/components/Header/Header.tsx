import logo from '@/assets/f1_logo.svg';
import '@/components/Header/Header.scss';
import queryClient from '@/services/queryClient';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;
const items: MenuProps['items'] = [
  {
    label: <Link to='/results/2023/races'>Results</Link>,
    key: 'results'
  },
  {
    label: <Link to='/dashboard'>Dashboard</Link>,
    key: 'dashboard'
  }
];
const HeaderPage = () => {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState('results');

  useEffect(() => {
    if (pathname.includes('/results/') || pathname === '/') {
      setCurrent('results');
      return;
    }
    if (pathname === '/dashboard') {
      setCurrent('dashboard');
      return;
    }
    setCurrent('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleChange: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'results') {
      queryClient.setQueryData(['initialValueForm'], () => ({
        season: 2023,
        type: 'races',
        responseKey: 'all'
      }));
    }
  };
  return (
    <Header className='layout-header-page'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='test' />
        </Link>
      </div>
      <Menu
        theme='dark'
        onClick={handleChange}
        mode='horizontal'
        selectedKeys={[current]}
        items={items}
      />
    </Header>
  );
};

export default HeaderPage;
