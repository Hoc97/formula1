import { useRaces, useTabMenu, useYear } from '@/modules';
import '@/pages/RaceDetail/RaceDetail.scss';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

interface DataType {
  key: React.Key;
  round: string;
  raceName: string;
  date: string;
  circuit: string;
}

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem;
};

const RaceDetail = () => {
  const data = [
    {
      label: 'RACE RESULT',
      key: 'race-result'
    },
    {
      label: 'FASTEST LAPS',
      key: 'fastest-laps'
    },
    {
      label: 'PIT STOP SUMMARY',
      key: 'pit-stop-summary'
    },
    {
      label: 'QUALIFYING',
      key: 'qualifying'
    },
    {
      label: 'SPRINT',
      key: 'sprint-result'
    }
  ];
  const dataMenu = data.map((item) => getItem(item.label, item.key));
  const items: MenuProps['items'] = [getItem(<b style={{ color: 'black' }}>RACE</b>, 'race', null, dataMenu, 'group')];

  const nav = useNavigate();
  const { pathname } = useLocation();
  const { season, raceDetail } = useParams();
  const [goBack, setGoBack] = useState(false);
  const { currentTabMenu, setCurrentTabMenu } = useTabMenu();

  useEffect(() => {
    if (!raceDetail) return;
    const raceDetailEncode = raceDetail.split(' ').join('%20');
    const isPathRaceDetail = pathname === `/results/${season}/races/${raceDetailEncode}`;
    const isPathRaceResult = pathname === `/results/${season}/races/${raceDetailEncode}/race-result`;
    if (pathname.includes(`/${raceDetailEncode}/`)) {
      setCurrentTabMenu(pathname?.split('/')[5]);
    }
    if (!goBack && isPathRaceDetail) {
      nav(`race-result`);
      return;
    }
    if (goBack && isPathRaceDetail) {
      nav(`/results/${season}/races`);
      return;
    }
    if (isPathRaceResult) {
      setGoBack(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, season]);

  const handleActiveRace: MenuProps['onClick'] = (e) => {
    nav(`${e.key}`);
    setCurrentTabMenu(e.key);
  };

  const [year] = useYear();
  const racesQuery = useRaces(year);

  const dataListInfo: DataType[] = useMemo(() => {
    const dataRaces = (racesQuery.data?.RaceTable?.Races as any[]) ?? [];

    return dataRaces.map((item) => {
      return {
        key: item.raceName,
        round: item.round,
        raceName: item.raceName,
        date: moment(item?.date).format('DD MMM YYYY'),
        circuit: `${item.Circuit.circuitName}, ${item.Circuit.Location.locality}`
      };
    });
  }, [racesQuery.data]);

  const indexInfo = useMemo(() => {
    return dataListInfo.findIndex((item) => item.raceName.toLowerCase().includes(raceDetail as string));
  }, [dataListInfo, raceDetail]);
  const dataInfo = dataListInfo[indexInfo];

  const indexTab = data.findIndex((item) => item.key === currentTabMenu);
  return (
    <div className='races-detail-container'>
      <div className='header'>
        <h1>
          FORMULA 1 {dataInfo?.raceName.toUpperCase()} {year}
        </h1>
        <h1>- {data[indexTab].label}</h1>
        <p className='date'>
          <span>{dataInfo?.date}</span>
          <span>{dataInfo?.circuit}</span>
        </p>
      </div>
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={handleActiveRace}
          style={{ width: 256 }}
          selectedKeys={[currentTabMenu]}
          mode='inline'
          items={items}
        />
        <div className='races-detail-content' style={{ flex: 1, marginLeft: 20 }}>
          <Outlet context={{ round: dataInfo?.round || 0 }} />
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;
