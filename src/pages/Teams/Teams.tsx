import '@/pages/Teams/Teams.scss';
import SeasonFilter from '@/components/SeasonFilter/SeasonFilter';
import { useYear } from '@/modules';
import { Typography } from 'antd';

const Teams = () => {
  const [year] = useYear();
  return (
    <div className='teams-container'>
      <div className='teams-content'>
        <div className='header'>
          <SeasonFilter />
          <Typography.Title> F1 teams {year}</Typography.Title>
        </div>
        <div className='teams-card'></div>
      </div>
    </div>
  );
};

export default Teams;
