import f1 from '@/assets/f1/f1';
import { useDriverChampsById, useDriverInfoById, useDriverStatsById, useYear } from '@/modules';
import '@/pages/DriverInfo/DriverInfo.scss';
import { Typography, Spin } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import env from '@/configs/env';
import { BsFillPersonFill } from 'react-icons/bs';


const DriverInfo = () => {
  const { driverinfo } = useParams();
  const [champs, setChamps] = useState<number>(0);
  const [stats, setStats] = useState<any[]>([]);
  const [year] = useYear();

  const driverInfoQuery = useDriverInfoById(driverinfo as string);
  const driverChampsQuery = useDriverChampsById(driverinfo as string);
  const driverStatsQuery = useDriverStatsById(driverinfo as string);

  useEffect(() => {
    if (driverChampsQuery.data) {
      const calculateDriverChamps = (seasons) => {
        let championships = 0;
        seasons.forEach(season => {
          const position = season.DriverStandings[0].position;
          if (position === '1') championships++;
        });

        return championships;
      };
      const allSeasons = driverChampsQuery.data.StandingsTable.StandingsLists;
      const champs = calculateDriverChamps(allSeasons);
      setChamps(champs);
    }
  }, [driverChampsQuery.data]);

  useEffect(() => {
    if (driverStatsQuery.data) {
      const calculateDriverStats = (races) => {
        // [points, wins, podiums]
        const stats = [0, 0, 0];
        races.forEach(race => {
          const result = race.Results[0];
          //points
          stats[0] += Number(result.points);
          //wins
          stats[1] += Number(result.position) === 1 ? 1 : 0;
          //podiums
          stats[2] += Number(result.position) <= 3 ? 1 : 0;
        });
        const firstSeason = races[0].season;
        const latestTeam = races[races.length - 1].Results[0].Constructor;
        const numberLogo = races[races.length - 1].Results[0].number;
        return [...stats, firstSeason, latestTeam, numberLogo];
      };

      const driverAllRaces = driverStatsQuery.data.RaceTable?.Races;
      const stats = calculateDriverStats(driverAllRaces);
      setStats(stats);
    }
  }, [driverStatsQuery.data]);

  const data = useMemo(() => {
    const dataDriverInfo = (driverInfoQuery.data?.DriverTable?.Drivers[0]) ?? {};
    return {
      dateOfBirth: moment(dataDriverInfo.dateOfBirth).format('DD/MM/YYYY'),
      nationality: dataDriverInfo.nationality,
      name: !dataDriverInfo.givenName ? '' : `${dataDriverInfo.givenName} ${dataDriverInfo.familyName}`,
      familyName: !dataDriverInfo.familyName ? '' : dataDriverInfo.familyName.toLowerCase(),
    };
  }, [driverInfoQuery.data]);

  const handlePhoto = () => {
    return `${env.photoDriverUrl}${year}Drivers/${data.familyName}.jpg`;
  };

  const loading = (driverInfoQuery.isFetching || driverInfoQuery.isLoading)
    || (driverChampsQuery.isFetching || driverChampsQuery.isLoading)
    || (driverStatsQuery.isFetching || driverStatsQuery.isLoading);
  return (
    <div className='driver-info-container'>
      <div className='driver-info'>
        <div className='left'>
          <div className='driver'>
            {data.familyName ? <img src={handlePhoto()} alt='driver' /> : <BsFillPersonFill />}
          </div>
        </div>
        <div className='right'>
          {!loading ?
            <>
              <div className='header'>
                <div className='title'>
                  <span>{stats[5]}</span>
                  <div className='country-flag '><img src={f1.nationality[data.nationality]} /></div>
                </div>
                <Typography.Title level={2}>{data.name}</Typography.Title>
              </div>
              <div className='content'>
                <Typography.Title level={3}>Nationality</Typography.Title>
                <span>{data.nationality}</span>
                <Typography.Title level={3}>Team</Typography.Title>
                <span>{stats[4]?.name}</span>
                <Typography.Title level={3}>Podiums</Typography.Title>
                <span>{stats[2]}</span>
                <Typography.Title level={3}>Points</Typography.Title>
                <span>{stats[0]}</span>
                <Typography.Title level={3}>First Entry</Typography.Title>
                <span>{stats[3]}</span>
                <Typography.Title level={3}>World Championships	</Typography.Title>
                <span>{champs}</span>
                <Typography.Title level={3}>Wins</Typography.Title>
                <span>{stats[1]}</span>
                <Typography.Title level={3}>Date of birth</Typography.Title>
                <span>{data.dateOfBirth}</span>
              </div>
            </> :
            <Spin />
          }
        </div>
      </div>
    </div>
  );
};

export default DriverInfo;