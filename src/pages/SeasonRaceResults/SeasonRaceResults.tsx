import { useValueForm, useYear } from '@/modules';
import useRaceResults from '@/modules/hooks/useRaceResults';
import '@/pages/SeasonRaceResults/SeasonRaceResults.scss';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: React.Key;
  grand_prix: string;
  date: string;
  winner: string;
  team: string;
  laps: number;
  time: string;
  round: string;
}

const SeasonRaceResults = () => {
  const { raceDetail } = useParams();
  const nav = useNavigate();
  const { setValueForm } = useValueForm();

  const handleChange = (text: string, type: string) => {
    if (type === 'races') {
      nav(`${text.toLowerCase()}/race-result`);
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
      title: 'WINNER',
      dataIndex: 'winner'
    },
    {
      title: 'TEAM',
      dataIndex: 'team'
    },
    {
      title: 'LAPS',
      dataIndex: 'laps'
    },
    {
      title: 'TIME',
      dataIndex: 'time'
    }
  ];

  const [year] = useYear();
  const racesResultsQuery = useRaceResults(year);

  const data: DataType[] = useMemo(() => {
    const dataRaceResults = (racesResultsQuery.data?.RaceTable?.Races as any[]) ?? [];
    return (
      dataRaceResults.map((item) => {
        return {
          key: item.raceName,
          grand_prix: item.raceName.replace(' Grand Prix', ''),
          date: moment(item.date).format('DD MMM YYYY'),
          winner: `${item.Results[0].Driver.givenName} ${item.Results[0].Driver.familyName}`,
          team: item.Results[0].Constructor.name.toUpperCase(),
          laps: item.Results[0].laps,
          time: item.Results[0].Time.time,
          round: item.round
        };
      }) ?? []
    );
  }, [racesResultsQuery.data]);

  const loading = racesResultsQuery.isFetching || racesResultsQuery.isLoading;
  return (
    <div className='races-container'>
      {raceDetail ? (
        <Outlet />
      ) : (
        <div className='races-content'>
          <Typography.Title>{year} RACE RESULTS</Typography.Title>
          <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </div>
  );
};

export default SeasonRaceResults;
