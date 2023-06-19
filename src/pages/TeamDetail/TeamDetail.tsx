import '@/pages/TeamDetail/TeamDetail.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: string;
  grand_prix: string;
  date: string;
  pts: string;
}

const TeamDetail = () => {
  const nav = useNavigate();
  const { season } = useParams();
  const columns: ColumnsType<DataType> = [
    {
      title: 'GRAND PRIX',
      dataIndex: 'grand_prix',
      className: 'grand_prix',
      render: (text) => {
        return (
          <span
            key={text}
            onClick={() =>
              nav(`/results/${season}/races/${text}/race-result`, { state: { name: text } })
            }>
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
      title: 'PTS',
      dataIndex: 'pts'
    }
  ];

  const data: DataType[] = [
    {
      key: '1',
      grand_prix: 'Bahrain',
      date: '05 Mar 2023',
      pts: '170'
    },
    {
      key: '2',
      grand_prix: 'Bahrain',
      date: '05 Mar 2023',
      pts: '170'
    },
    {
      key: '3',
      grand_prix: 'Bahrain',
      date: '05 Mar 2023',
      pts: '170'
    }
  ];

  return (
    <div className='teams-detail-content'>
      <h1>2023 Constructor Standings: Alfa Romeo Ferrari</h1>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default TeamDetail;
