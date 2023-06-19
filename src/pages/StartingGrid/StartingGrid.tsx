import '@/pages/Races/Races.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  pos: string;
  no: string;
  driver: string;
  car: string;
  time: string;
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
    title: 'TIME',
    dataIndex: 'time',
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
    time: '1:29.708'
  },
  {
    key: '2',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    time: '1:29.708'
  },
  {
    key: '3',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    time: '1:29.708'
  }
];

const StartingGrid = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default StartingGrid;
