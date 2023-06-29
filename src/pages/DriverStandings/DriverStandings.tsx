import { useDriverStandings, useYear } from '@/modules';
import '@/pages/DriverStandings/DriverStandings.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: React.Key;
  pos: string;
  driver: string;
  nationality: string;
  team: string;
  pts: string;
}

const DriverStandings = () => {
  const param = useParams();
  const nav = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: 'POS',
      dataIndex: 'pos'
    },
    {
      title: 'DRIVER',
      dataIndex: 'driver',
      className: 'driver',
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`${text}`, { state: { name: text } })}>
            {text}
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
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`/results/${param.season}/teams/${text}`, { state: { name: text } })}>
            {text}
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
          driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
          nationality: item.Driver.nationality,
          team: item.Constructors[0].name.toUpperCase(),
          pts: item.points
        };
      }) ?? []
    );
  }, [driversQuery.data]);

  return (
    <div className='driver-standings-container'>
      {param.driverDetail ? (
        <Outlet />
      ) : (
        <div className='driver-standings-content'>
          <h1>{year} Driver Standings</h1>
          <Table loading={driversQuery.isFetching} columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </div>
  );
};

export default DriverStandings;
