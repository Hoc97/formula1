import { useRaceResult, useYear } from '@/modules';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

type DataType = {
  key: React.Key;
  pos: string;
  no: string;
  driver: string;
  team: string;
  laps: string;
  time: string;
  pts: string;
};

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
    title: 'TEAM',
    dataIndex: 'team',
    className: 'highlight'
  },
  {
    title: 'LAPS',
    dataIndex: 'laps',
    className: 'highlight'
  },
  {
    title: 'TIME/RETIRED',
    dataIndex: 'time',
    className: 'highlight'
  },
  {
    title: 'PTS',
    dataIndex: 'pts',
    className: 'highlight'
  }
];

const RaceResult = () => {
  const { round } = useOutletContext<{ round: string | number }>();
  const [year] = useYear();
  const racesResultQuery = useRaceResult(year, round as string, { enabled: !!round });

  const data: DataType[] = useMemo(() => {
    const dataRaceResult = (racesResultQuery.data?.RaceTable?.Races[0]?.Results as any[]) ?? [];
    return (
      dataRaceResult.map((item, index) => {
        return {
          key: item.position + index,
          pos: item.position,
          no: item.number,
          driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
          team: item.Constructor.name.toUpperCase(),
          laps: item.laps,
          time:
            item.status === 'Finished' || item.status.includes('Lap')
              ? item.Time?.time
                ? item.Time.time
                : item.status
              : 'DNF',
          pts: item.points
        };
      }) ?? []
    );
  }, [racesResultQuery.data]);

  return <Table loading={racesResultQuery.isFetching} columns={columns} dataSource={data} pagination={false} />;
};

export default RaceResult;
