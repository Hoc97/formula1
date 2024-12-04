import { useTeamStatsByIdSeason, useTeams, useValueForm, useYear } from '@/modules';
import '@/pages/TeamStandingDetail/TeamStandingDetail.scss';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: React.Key;
  grand_prix: string;
  date: string;
  pts: number;
}

type DataTeamType = {
  team: Team;
};

interface Team {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

const TeamStandingDetail = () => {
  const nav = useNavigate();
  const { teamStandingDetail, season } = useParams();
  const { setValueForm } = useValueForm();

  const handleChange = (text: string, type: string) => {
    if (type === 'races') {
      nav(`/results/${season}/races/${text.toLowerCase()}/race-result`);
      setValueForm(year, type, text.toUpperCase());
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'GRAND PRIX',
      dataIndex: 'grand_prix',
      className: 'grand_prix',
      render: (text) => {
        return (
          <span key={text} onClick={() => handleChange(text, 'races')}>
            {text}
          </span>
        );
      }
    },
    {
      title: 'DATE',
      dataIndex: 'date'
    },
    {
      title: 'PTS',
      dataIndex: 'pts'
    }
  ];

  const [year] = useYear();
  const teamsQuery = useTeams(year);

  const dataTeam: DataTeamType = useMemo(() => {
    const dataTeams = (teamsQuery.data?.StandingsTable?.StandingsLists[0]?.ConstructorStandings as any[]) ?? [];
    return (
      dataTeams
        .map((item) => ({ team: item.Constructor }))
        .find((item) => teamStandingDetail === item.team.name.toLowerCase()) ?? ({} as DataTeamType)
    );
  }, [teamsQuery.data, teamStandingDetail]);

  const nameTitle = dataTeam?.team?.name;
  const teamId = dataTeam?.team?.constructorId;

  const teamStatsQuery = useTeamStatsByIdSeason(year, teamId, { enabled: !!teamId });
  const data: DataType[] = useMemo(() => {
    const dataTeamStats = (teamStatsQuery.data?.RaceTable?.Races as any[]) ?? [];
    return (
      dataTeamStats.map((item) => {
        return {
          key: item.season + item.round,
          grand_prix: item.raceName.replace(' Grand Prix', ''),
          date: moment(item.date).format('DD MMM YYYY'),
          pts: +item.Results[0].points + +item.Results[1].points
        };
      }) ?? []
    );
  }, [teamStatsQuery.data]);

  const loading = teamStatsQuery.isFetching || teamStatsQuery.isLoading;
  return (
    <div className='teams-detail-content'>
      <Typography.Title>
        {year} Constructor Standings: {nameTitle}
      </Typography.Title>
      <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default TeamStandingDetail;
