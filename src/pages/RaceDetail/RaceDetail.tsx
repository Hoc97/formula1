import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(
    'RACE',
    'race',
    null,
    [
      getItem('RACE RESULT', 'race-result'),
      getItem('FASTEST LAPS', 'fastest-laps'),
      getItem('PIT STOP SUMMARY', 'pit-stop-summary'),
      getItem('STARTING GRID', 'starting-grid'),
      getItem('QUALIFYING', 'qualifying'),
      getItem('PRACTICE 3', 'practice-3'),
      getItem('PRACTICE 2', 'practice-2'),
      getItem('PRACTICE 1', 'practice-1')
    ],
    'group'
  )
];

const RaceDetail = () => {
  const nav = useNavigate();
  useEffect(() => {
    nav(`race-result`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActiveRace: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    nav(`${e.key}`);
  };

  return (
    <>
      <span>FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2023 - RACE RESULT</span>
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={handleActiveRace}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RaceDetail;
