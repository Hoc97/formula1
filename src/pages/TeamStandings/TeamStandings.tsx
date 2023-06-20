import '@/pages/TeamStandings/TeamStandings.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface DataType {
  key: string;
  pos: string;
  team: string;
  pts: string;
}

const TeamStandings = () => {
  const param = useParams();
  const nav = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: 'POS',
      dataIndex: 'pos'
    },
    {
      title: 'TEAM',
      dataIndex: 'team',
      className: 'team',
      render: (text) => {
        return (
          <span key={text} onClick={() => nav(`${text}`, { state: { name: text } })}>
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
      team: 'RED BULL RACING HONDA RBPT',
      pts: '170'
    },
    {
      key: '2',
      pos: '1',
      team: 'RED BULL RACING HONDA RBPT',
      pts: '170'
    },
    {
      key: '3',
      pos: '1',
      team: 'RED BULL RACING HONDA RBPT',
      pts: '170'
    }
  ];

  return (
    <div className='teams-container'>
      {param.teamDetail ? (
        <Outlet />
      ) : (
        <div className='teams-content'>
          <h1>{param.season} Constructor Standings</h1>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </div>
  );
};

export default TeamStandings;
