import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type DataType = {
  key: string;
  pos: string;
  no: string;
  driver: string;
  car: string;
  laps: number;
  time: string;
  pts: string;
};

const columns: ColumnsType<DataType> = [
  {
    title: 'POS',
    dataIndex: 'pos'
  },
  {
    title: 'NO',
    dataIndex: 'no'
  },
  {
    title: 'DRIVER',
    dataIndex: 'driver',
    className: 'highlight'
  },
  {
    title: 'CAR',
    dataIndex: 'car',
    className: 'highlight'
  },
  {
    title: 'LAPS',
    dataIndex: 'laps',
    className: 'highlight'
  },
  {
    title: 'TIME/RETIRED',
    dataIndex: 'time',
    className: 'highlight'
  },
  {
    title: 'PTS',
    dataIndex: 'pts',
    className: 'highlight'
  }
];

const data: DataType[] = [
  {
    key: '1',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    laps: 57,
    time: '1:33:56.736',
    pts: '25'
  },
  {
    key: '2',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    laps: 57,
    time: '1:33:56.736',
    pts: '25'
  },
  {
    key: '3',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    laps: 57,
    time: '1:33:56.736',
    pts: '25'
  }
];

const RaceResult = () => {
  // const listWinners = useMemo(() => {
  //   return results.map((rangkingRaces) => {
  //      return rangkingRaces?.data?.map?.((item,index) => {
  //       const arrayPts = [25,18,15,12,10,8,6,4,2,1]
  //       return {
  //         position: item.position,
  //         no: item.driver.number,
  //         id_driver: item.driver.id,
  //         driver: item.driver.name,
  //         team: item.team.name,
  //         laps: item.laps,
  //         time: item.time,
  //         pts : arrayPts[index] || 0
  //       }
  //      })
  //   })
  // }, [results]);
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default RaceResult;
