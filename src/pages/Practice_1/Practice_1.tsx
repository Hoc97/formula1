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
  gap: string;
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
  },
  {
    title: 'GAP',
    dataIndex: 'gap',
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
    time: '1:33:56.736',
    gap: '+0.005s',
    laps: 57
  },
  {
    key: '2',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    time: '1:33:56.736',
    gap: '+0.005s',
    laps: 57
  },
  {
    key: '3',
    pos: '1',
    no: '1',
    driver: 'Max Verstappen',
    car: 'RED BULL RACING HONDA RBPT',
    time: '1:33:56.736',
    gap: '+0.005s',
    laps: 57
  }
];

const Practice_1 = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default Practice_1;
