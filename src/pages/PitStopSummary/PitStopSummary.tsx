import '@/pages/Races/Races.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  stops: string;
  no: string;
  driver: string;
  car: string;
  laps: number;
  time: string;
  total: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'STOPS',
    dataIndex: 'stops'
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
    title: 'TOTAL',
    dataIndex: 'total',
    className: 'highlight'
  }
];

const data: DataType[] = [
  {
    key: '1',
    stops: '1',
    no: '10',
    driver: 'Pierre Gasly',
    car: 'ALPINE RENAULT',
    laps: 9,
    time: '25.885',
    total: '25.885'
  },
  {
    key: '2',
    stops: '1',
    no: '10',
    driver: 'Pierre Gasly',
    car: 'ALPINE RENAULT',
    laps: 9,
    time: '25.885',
    total: '25.885'
  },
  {
    key: '3',
    stops: '1',
    no: '10',
    driver: 'Pierre Gasly',
    car: 'ALPINE RENAULT',
    laps: 9,
    time: '25.885',
    total: '25.885'
  }
];

const PitStopSummary = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default PitStopSummary;
