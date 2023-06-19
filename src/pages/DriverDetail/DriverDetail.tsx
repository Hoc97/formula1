import '@/pages/DriverDetail/DriverDetail.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: string;
  grand_prix: string;
  date: string;
  car: string;
  race_position: string;
  pts: string;
}

const DriverDetail = () => {
  const nav = useNavigate();
  const param = useParams();
  const location = useLocation();

  const columns: ColumnsType<DataType> = [
    {
      title: 'GRAND PRIX',
      dataIndex: 'grand_prix',
      className: 'grand_prix',
      render: (text) => {
        return (
          <span
            key={text}
            onClick={() => nav(`/results/${param.season}/races/${text}/race-result`, { state: { name: text } })}>
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
      title: 'CAR',
      dataIndex: 'car',
      className: 'car',
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`/results/${param.season}/teams/${text}`, { state: { name: text } })}>
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

  const data: DataType[] = [
    {
      key: '1',
      grand_prix: 'Bahrain',
      date: '05 Mar 2023',
      car: 'RED BULL RACING HONDA RBPT',
      race_position: '1',
      pts: '170'
    },
    {
      key: '2',
      grand_prix: 'Bahrain',
      date: '05 Mar 2023',
      car: 'RED BULL RACING HONDA RBPT',
      race_position: '1',
      pts: '170'
    },
    {
      key: '3',
      grand_prix: 'Bahrain',
      date: '05 Mar 2023',
      car: 'RED BULL RACING HONDA RBPT',
      race_position: '1',
      pts: '170'
    }
  ];
  const nameTitle = location.state?.name?.responseKey?.split(', ');
  return (
    <div className='drivers-detail-content'>
      <h1>
        {param.season} Driver Standings: {`${nameTitle[1]} ${nameTitle[0]}`}
      </h1>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default DriverDetail;
