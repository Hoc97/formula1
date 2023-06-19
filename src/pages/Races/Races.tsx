import useRaces from '@/modules/useRaces';
import useRankingRaces from '@/modules/useRankingRaces';
import '@/pages/Races/Races.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

interface DataType {
  key: string;
  grand_prix: string;
  date: string;
  winner: string;
  team: string;
  laps: number;
  time: string;
}

const Races = () => {
  const params = useParams();
  const nav = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'GRAND PRIX',
      dataIndex: 'grand_prix',
      className: 'grand_prix',
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`${text.toLowerCase()}/race-result`, { state: { name: text } })}>
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
  const location = useLocation();
  // console.log(location, location.state?.name?.season);

  // const dataRacesQuery = useRaces({ season: location.state?.name?.season || 2023, type: 'race' });
  // const id = dataRacesQuery?.data
  //   ?.filter?.((item) => {
  //     return item.status === 'Completed';
  //   })
  //   ?.map?.((item) => item?.id);
  //** Get List RankingRaces */
  /** */
  // const results = useRankingRaces(id || []);
  // console.log('results', results);

  // const listWinners = useMemo(() => {
  //   return results?.map?.((rangkingRaces) => {
  //     return {
  //       position: rangkingRaces?.data?.[0]?.position,
  //       no: rangkingRaces?.data?.[0]?.driver?.number,
  //       id_driver: rangkingRaces?.data?.[0]?.driver?.id,
  //       driver: rangkingRaces?.data?.[0]?.driver?.name,
  //       team: rangkingRaces?.data?.[0]?.team?.name,
  //       laps: rangkingRaces?.data?.[0]?.laps,
  //       time: rangkingRaces?.data?.[0]?.time,
  //       pts: 25
  //     };
  //   });
  // }, [results]);
  // const data: DataType[] | undefined = dataRacesQuery?.data
  //   ?.filter?.((item) => {
  //     return item.status === 'Completed';
  //   })
  //   .map((item, index) => {
  //     return {
  //       key: item?.id,
  //       grand_prix: item?.competition?.location?.country,
  //       date: moment(item?.date).utc().format('DD MMM YYYY'),
  //       winner: listWinners[index]?.driver?.split(' ')[1],
  //       team: listWinners[index]?.team,
  //       laps: listWinners[index]?.laps,
  //       time: listWinners[index]?.time
  //     };
  //   });
  // const isSuccessTotal = results.every((rangkingRaces) => rangkingRaces.isSuccess === true);
  // console.log('isSuccessTotal', isSuccessTotal);
  // /** */
  // const res = await fetch('http://ergast.com/api/f1/2023.json?limit=100');
  // const getdata = async () => {
  //   const res = await fetch('https://ergast.com/api/f1/current/results' + '.json?limit=200');
  //   const jsonData = res;
  //   console.log('json', jsonData);
  // };

  return (
    <div className='races-container'>
      {/* <button onClick={() => getdata()}>get</button> */}
      {params.raceDetail ? (
        <Outlet />
      ) : (
        <div className='races-content'>
          <h1>{params.season} RACE RESULTS</h1>
          {/* {results.length > 0 && (
            <Table loading={!isSuccessTotal} columns={columns} dataSource={data} pagination={false} />
          )} */}
        </div>
      )}
    </div>
  );
};

export default Races;
