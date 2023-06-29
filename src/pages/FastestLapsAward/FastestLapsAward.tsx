import { useFastestLapAward, useYear } from '@/modules';
import '@/pages/FastestLapsAward/FastestLapsAward.scss';
import { Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { useMemo } from 'react';

interface DataType {
  key: React.Key;
  grand_prix: string;
  driver: string;
  team: string;
  time: string;
}

const FastestLapsAward = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'GRAND PRIX',
      dataIndex: 'grand_prix'
    },
    {
      title: 'DRIVER',
      dataIndex: 'driver',
      className: 'driver'
    },
    {
      title: 'TEAM',
      dataIndex: 'team',
      className: 'team'
    },
    {
      title: 'TIME',
      dataIndex: 'time'
    }
  ];

  const [year] = useYear();
  const fastestLapTimesQuery = useFastestLapAward(year);

  const data: DataType[] = useMemo(() => {
    const dataRaceResults = (fastestLapTimesQuery.data?.RaceTable.Races as any[]) ?? [];
    return dataRaceResults.map((item) => {
      return {
        key: item.raceName,
        grand_prix: item.raceName.replace(' Grand Prix', ''),
        driver: `${item.Results[0].Driver.givenName} ${item.Results[0].Driver.familyName}`,
        team: item.Results[0].Constructor.name.toUpperCase(),
        time: item.Results[0].FastestLap.Time.time
      };
    });
  }, [fastestLapTimesQuery.data]);

  return (
    <div className='fastest-laps-award-container'>
      <div className='fastest-laps-award-content'>
        <div className='header'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>{year} DHL FASTEST LAP AWARD </h1>
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
            Every Formula 1 driver is fast, but is the race winner really the fastest? Since 2007 DHL has defined a new
            standard of speed with the 'DHL Fastest Lap Award'. One driver sets the fastest lap at each race - the award
            will go to the man who sets the most over the season. To win will require pure speed - something DHL, as the
            world's leading logistics provider and Official Logistics Partner of Formula 1, uses to achieve its goals,
            shortening international routes, facilitating global trade and making the world a smaller place.
          </p>
        </div>
        {data.length > 0 ? (
          <Table loading={fastestLapTimesQuery.isFetching} columns={columns} dataSource={data} pagination={false} />
        ) : (
          <div>
            {!fastestLapTimesQuery.isFetching ? (
              <>
                No data until <b>2004</b>
              </>
            ) : (
              <Spin />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FastestLapsAward;
