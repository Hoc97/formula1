import '@/pages/Races/Races.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  pos: string;
  no: string;
  driver: string;
  car: string;
  q1: string;
  q2: string;
  q3: string;
  laps: number;
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
    title: 'Q1',
    dataIndex: 'q1',
    className: 'highlight'
  },
  {
    title: 'Q2',
    dataIndex: 'q2',
    className: 'highlight'
  },
  {
    title: 'Q3',
    dataIndex: 'q3',
    className: 'highlight'
  },
  {
    title: 'LAPS',
    dataIndex: 'laps',
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
    q1: '1:31.295',
    q2: '1:30.503',
    q3: '1:29.708',
    laps: 15
  },
  {
    key: '2',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    q1: '1:31.295',
    q2: '1:30.503',
    q3: '1:29.708',
    laps: 15
  },
  {
    key: '3',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    q1: '1:31.295',
    q2: '1:30.503',
    q3: '1:29.708',
    laps: 15
  }
];

const Qualifying = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default Qualifying;
