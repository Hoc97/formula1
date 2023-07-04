import { useDriverStandings, useDriverStatsById, useValueForm, useYear } from '@/modules';
import '@/pages/DriverStandingDetail/DriverStandingDetail.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: React.Key;
  grand_prix: string;
  date: string;
  team: string;
  race_position: string;
  pts: string;
}

type DataDriverType = {
  driver: Driver;
  team: Team;
};

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

interface Team {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

const DriverStandingDetail = () => {
  const nav = useNavigate();
  const { driverStandingDetail, season } = useParams();
  const { setValueForm } = useValueForm();

  const handleChange = (text: string, type: string) => {
    if (type === 'races') {
      nav(`/results/${season}/races/${text.toLowerCase()}/race-result`);
      setValueForm(year, type, text.toUpperCase());
    }
    if (type === 'teams') {
      const teamStandingDetail = dataDriver.team.constructorId;
      nav(`/results/${season}/teams/${teamStandingDetail}`);
      setValueForm(year, type, text);
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
      title: 'TEAM',
      dataIndex: 'team',
      className: 'team',
      render: (text) => {
        return (
          <span key={text} onClick={() => handleChange(text, 'teams')}>
            {text}
          </span>
        );
      }
    },
    {
      title: 'RACE POSITION',
      dataIndex: 'race_position'
    },
    {
      title: 'PTS',
      dataIndex: 'pts'
    }
  ];

  const [year] = useYear();
  const driversQuery = useDriverStandings(year);

  const dataDriver: DataDriverType = useMemo(() => {
    const dataDrivers = (driversQuery.data?.StandingsTable?.StandingsLists[0]?.DriverStandings as any[]) ?? [];
    return (
      dataDrivers
        .map((item) => {
          return {
            driver: item.Driver,
            team: item.Constructors[0]
          };
        })
        .find((item) => {
          return (
            driverStandingDetail?.includes(item.driver.givenName.toLowerCase()) &&
            (driverStandingDetail?.includes(item.driver.familyName.toLowerCase()) ||
              driverStandingDetail?.includes(item.driver.familyName.replace(' ', '-').toLowerCase()))
          );
        }) ?? ({} as DataDriverType)
    );
  }, [driversQuery.data, driverStandingDetail]);

  const nameTitle = `${dataDriver?.driver?.givenName} ${dataDriver?.driver?.familyName?.charAt(0).toUpperCase() + dataDriver?.driver?.familyName?.slice(1)
    }`;
  const driverId = dataDriver?.driver?.driverId;

  const driverStatsQuery = useDriverStatsById(driverId);
  const data: DataType[] = useMemo(() => {
    const dataDriverStats = (driverStatsQuery.data?.RaceTable?.Races as any[]) ?? [];
    return (
      dataDriverStats
        .filter((item) => item.season === year.toString())
        .map((item) => {
          return {
            key: item.season + item.round,
            grand_prix: item.raceName.replace(' Grand Prix', ''),
            date: moment(item.date).format('DD MMM YYYY'),
            team: item.Results[0].Constructor.name.toUpperCase(),
            race_position: item.Results[0].position,
            pts: item.Results[0].points
          };
        }) ?? []
    );
  }, [driverStatsQuery.data, year]);

  const loading = driverStatsQuery.isFetching || driverStatsQuery.isLoading;
  return (
    <div className='drivers-detail-content'>
      <h1>
        {season} Driver Standings: {driverId && <>{nameTitle}</>}
      </h1>
      <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default DriverStandingDetail;
