import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  pos: string;
  no: string;
  driver: string;
  car: string;
  laps: number;
  time: string;
  avg_speed: string;
}

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
    title: 'TIME',
    dataIndex: 'time',
    className: 'highlight'
  },
  {
    title: 'AVG SPEED',
    dataIndex: 'avg_speed',
    className: 'highlight'
  }
];

const data: DataType[] = [
  {
    key: '1',
    pos: '1',
    no: '24',
    driver: 'Zhou Guanyu',
    car: 'ALFA ROMEO FERRARI',
    laps: 57,
    time: '1:33.996',
    avg_speed: '207.276'
  },
  {
    key: '2',
    pos: '1',
    no: '24',
    driver: 'Zhou Guanyu',
    car: 'ALFA ROMEO FERRARI',
    laps: 57,
    time: '1:33.996',
    avg_speed: '207.276'
  },
  {
    key: '3',
    pos: '1',
    no: '24',
    driver: 'Zhou Guanyu',
    car: 'ALFA ROMEO FERRARI',
    laps: 57,
    time: '1:33.996',
    avg_speed: '207.276'
  }
];

const FastestLaps = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default FastestLaps;
