import '@/pages/Drivers/Drivers.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: string;
  pos: string;
  driver: string;
  nationality: string;
  car: string;
  pts: string;
}

const Drivers = () => {
  const param = useParams();
  const nav = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: 'POS',
      dataIndex: 'pos'
    },
    {
      title: 'DRIVER',
      dataIndex: 'driver',
      className: 'driver',
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`${text}`, { state: { name: text } })}>
            {text}
          </span>
        );
      }
    },
    {
      title: 'NATIONALITY',
      dataIndex: 'nationality'
    },
    {
      title: 'CAR',
      dataIndex: 'car',
      className: 'car',
      render: (text) => {
        return (
          <span
            key={text}
            onClick={() =>
              nav(`/results/${param.season}/teams/${text}`, { state: { name: text } })
            }>
            {text}
          </span>
        );
      }
    },
    {
      title: 'PTS',
      dataIndex: 'pts'
    }
  ];

  const data: DataType[] = [
    {
      key: '1',
      pos: '1',
      driver: 'Max Verstappen',
      nationality: 'NED',
      car: 'RED BULL RACING HONDA RBPT',
      pts: '170'
    },
    {
      key: '2',
      pos: '1',
      driver: 'Max Verstappen',
      nationality: 'NED',
      car: 'RED BULL RACING HONDA RBPT',
      pts: '170'
    },
    {
      key: '3',
      pos: '1',
      driver: 'Max Verstappen',
      nationality: 'NED',
      car: 'RED BULL RACING HONDA RBPT',
      pts: '170'
    }
  ];

  return (
    <div className='drivers-container'>
      {param.driverDetail ? (
        <Outlet />
      ) : (
        <div className='drivers-content'>
          <h1>{param.season} Driver Standings</h1>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </div>
  );
};

export default Drivers;
