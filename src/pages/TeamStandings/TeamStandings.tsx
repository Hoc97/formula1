import { useTeams, useValueForm, useYear } from '@/modules';
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
  const { season, teamStandingDetail } = useParams();
  const nav = useNavigate();
  const { setValueForm } = useValueForm();

  const handleChange = (text: string, type: string) => {
    if (type === 'teams') {
      const name = text.toUpperCase();
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
  const teamsQuery = useTeams(year);

  const data: DataType[] = useMemo(() => {
    const dataTeams = (teamsQuery.data?.StandingsTable?.StandingsLists[0]?.ConstructorStandings as any[]) ?? [];
    return dataTeams.map((item) => {
      return {
        key: item.position,
        pos: item.position,
        team: item.Constructor.name,
        pts: item.points
      };
    });
  }, [teamsQuery.data]);

  const loading = teamsQuery.isFetching || teamsQuery.isLoading;
  return (
    <div className='team-standings-container'>
      {teamStandingDetail ? (
        <Outlet />
      ) : (
        <div className='team-standings-content'>
          <h1>{year} Constructor Standings</h1>
          {data.length > 0 ? (
            <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
          ) : (
            <div>
              {!loading ? (
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
