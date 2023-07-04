import { useDriverStandings, useValueForm, useYear } from '@/modules';
import '@/pages/DriverStandings/DriverStandings.scss';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
}

interface DataType {
  key: React.Key;
  pos: string;
  driver: Driver;
  nationality: string;
  team: string;
  pts: string;
}

const DriverStandings = () => {
  const { season, driverStandingDetail } = useParams();
  const nav = useNavigate();
  const { setValueForm } = useValueForm();

  const handleChange = (text: Driver | string, type: string) => {
    if (type === 'drivers') {
      text = text as Driver;
      const name = `${text.familyName}, ${text.givenName}`.toUpperCase();
      nav(`${text.givenName}-${text.familyName.replace(' ', '-')}`.toLowerCase().replace(' ', '-'));
      setValueForm(year, type, name);
    }
    if (type === 'teams') {
      const name = (text as string).toUpperCase();
      nav(`/results/${season}/teams/${name.toLowerCase()}`);
      setValueForm(year, type, name);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'POS',
      dataIndex: 'pos'
    },
    {
      title: 'DRIVER',
      dataIndex: 'driver',
      className: 'driver',
      render: (text: Driver) => {
        return (
          <span key={text.driverId} onClick={() => handleChange(text, 'drivers')}>
            {text.givenName} {text.familyName}
          </span>
        );
      }
    },
    {
      title: 'NATIONALITY',
      dataIndex: 'nationality'
    },
    {
      title: 'TEAM',
      dataIndex: 'team',
      className: 'team',
      render: (text: string) => {
        return (
          <span key={text} onClick={() => handleChange(text, 'teams')}>
            {text.toUpperCase()}
          </span>
        );
      }
    },
    {
      title: 'PTS',
      dataIndex: 'pts'
    }
  ];

  const [year] = useYear();
  const driversQuery = useDriverStandings(year);

  const data: DataType[] = useMemo(() => {
    const dataDrivers = (driversQuery.data?.StandingsTable?.StandingsLists[0]?.DriverStandings as any[]) ?? [];
    return (
      dataDrivers.map((item) => {
        return {
          key: item.position,
          pos: item.position,
          driver: item.Driver,
          nationality: item.Driver.nationality,
          team: item.Constructors[0].name,
          pts: item.points
        };
      }) ?? []
    );
  }, [driversQuery.data]);

  const loading = driversQuery.isFetching || driversQuery.isLoading;
  return (
    <div className='driver-standings-container'>
      {driverStandingDetail ? (
        <Outlet />
      ) : (
        <div className='driver-standings-content'>
          <Typography.Title>{year} Driver Standings</Typography.Title>
          <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </div>
  );
};

export default DriverStandings;
