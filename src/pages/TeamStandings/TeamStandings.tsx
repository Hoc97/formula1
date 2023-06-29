import { useTeams, useYear } from '@/modules';
import '@/pages/TeamStandings/TeamStandings.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';

interface DataType {
  key: React.Key;
  pos: string;
  team: string;
  pts: string;
}

const TeamStandings = () => {
  const param = useParams();

  const nav = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: 'POS',
      dataIndex: 'pos'
    },
    {
      title: 'TEAM',
      dataIndex: 'team',
      className: 'team',
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`${text}`, { state: { name: text } })}>
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
  const teamsQuery = useTeams(year);

  const data: DataType[] = useMemo(() => {
    const dataTeams = (teamsQuery.data?.StandingsTable?.StandingsLists[0]?.ConstructorStandings as any[]) ?? [];
    return dataTeams.map((item) => {
      return {
        key: item.position,
        pos: item.position,
        team: item.Constructor.name.toUpperCase(),
        pts: item.points
      };
    });
  }, [teamsQuery.data]);
  console.log('data', data, teamsQuery.isFetching, teamsQuery.isLoading);

  return (
    <div className='teams-container'>
      {param.teamDetail ? (
        <Outlet />
      ) : (
        <div className='teams-content'>
          <h1>{year} Constructor Standings</h1>
          {data.length > 0 ? (
            <Table loading={teamsQuery.isFetching} columns={columns} dataSource={data} pagination={false} />
          ) : (
            <div>
              {!teamsQuery.isFetching ? (
                <>
                  The Constructors Championship was not awarded until <b>1958</b>
                </>
              ) : (
                <Spin />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamStandings;
