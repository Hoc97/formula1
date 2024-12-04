import { useSprint, useYear } from '@/modules';
import { Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

interface DataType {
  key: React.Key;
  pos: string;
  no: string;
  driver: string;
  team: string;
  laps: string;
  time: string;
  point: string;
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
    title: 'TIME',
    dataIndex: 'time',
    className: 'highlight'
  },

  {
    title: 'PTS',
    dataIndex: 'point',
    className: 'highlight'
  }
];

const Sprint = () => {
  const { round } = useOutletContext<{ round: string | number }>();
  const [year] = useYear();
  const sprintQuery = useSprint(year, round as string, { enabled: !!round });

  const data: DataType[] = useMemo(() => {
    const dataSprint = (sprintQuery.data?.RaceTable?.Races[0]?.SprintResults as any[]) ?? [];
    return (
      dataSprint.map((item) => {
        return {
          key: item.position,
          pos: item.position,
          no: item.number,
          driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
          team: item.Constructor.name.toUpperCase(),
          laps: item.laps,
          time:
            item.status === 'Finished' || item.status.includes('Lap')
              ? item.Time?.time
                ? item.Time.time
                : 'No Time'
              : 'DNF',
          point: item.points
        };
      }) ?? []
    );
  }, [sprintQuery.data]);

  const loading = sprintQuery.isFetching || sprintQuery.isLoading;
  return (
    <>
      {data.length > 0 ? (
        <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
      ) : (
        <Typography.Title level={3}>
          {!loading ? <>No sprint qualifying results for this round</> : <Spin />}
        </Typography.Title>
      )}
    </>
  );
};

export default Sprint;
