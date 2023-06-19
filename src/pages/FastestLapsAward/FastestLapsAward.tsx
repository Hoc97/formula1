import '@/pages/FastestLapsAward/FastestLapsAward.scss';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useParams } from 'react-router-dom';

interface DataType {
  key: string;
  grand_prix: string;
  driver: string;
  car: string;
  time: string;
}

const FastestLapsAward = () => {
  const param = useParams();
  const columns: ColumnsType<DataType> = [
    {
      title: 'GRAND PRIX',
      dataIndex: 'grand_prix'
    },
    {
      title: 'DRIVER',
      dataIndex: 'driver'
    },
    {
      title: 'CAR',
      dataIndex: 'car'
    },
    {
      title: 'TIME',
      dataIndex: 'time'
    }
  ];

  const data: DataType[] = [
    {
      key: '1',
      grand_prix: 'Bahrain1',
      driver: 'Max Verstappen',
      car: 'RED BULL RACING HONDA RBPT',
      time: '1:33:56.736'
    },
    {
      key: '2',
      grand_prix: 'Bahrain1',
      driver: 'Max Verstappen',
      car: 'RED BULL RACING HONDA RBPT',
      time: '1:33:56.736'
    },
    {
      key: '3',
      grand_prix: 'Bahrain1',
      driver: 'Max Verstappen',
      car: 'RED BULL RACING HONDA RBPT',
      time: '1:33:56.736'
    }
  ];
  return (
    <div className='fastest-laps-award-container'>
      <div className='fastest-laps-award-content'>
        <div className='header'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>{param.season} DHL FASTEST LAP AWARD </h1>
            <a href='https://inmotion.dhl/en/formula-1/' target='_blank'>
              <img
                src='https://www.formula1.com/content/dam/fom-website/title-partners/dhl.png'
                alt='DHL'
                width='100%'
                data-emptytext='Image'
              />
            </a>
          </div>
          <p>
            Every Formula 1 driver is fast, but is the race winner really the fastest? Since 2007
            DHL has defined a new standard of speed with the 'DHL Fastest Lap Award'. One driver
            sets the fastest lap at each race - the award will go to the man who sets the most over
            the season. To win will require pure speed - something DHL, as the world's leading
            logistics provider and Official Logistics Partner of Formula 1, uses to achieve its
            goals, shortening international routes, facilitating global trade and making the world a
            smaller place.
          </p>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default FastestLapsAward;
