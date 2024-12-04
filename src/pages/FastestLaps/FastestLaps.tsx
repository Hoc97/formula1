import { useRaceResult, useYear } from '@/modules';
import { Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import _ from 'lodash';

interface DataType {
  key: React.Key;
  rank: number;
  no: string;
  driver: string;
  team: string;
  laps: number;
  time: string;
  avg_speed: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'POS',
    dataIndex: 'rank'
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
    title: 'AVG SPEED',
    dataIndex: 'avg_speed',
    className: 'highlight'
  }
];

const FastestLaps = () => {
  const { round } = useOutletContext<{ round: string | number }>();
  const [year] = useYear();
  const racesResultQuery = useRaceResult(year, round as string, { enabled: !!round });

  const data: DataType[] = useMemo(() => {
    const dataRaceResult = (racesResultQuery.data?.RaceTable?.Races[0]?.Results as any[]) ?? [];
    let data =
      (dataRaceResult
        .map((item, index) => {
          if (+item.laps > 0 && item?.FastestLap?.rank) {
            return {
              key: item.position + index,
              rank: +item?.FastestLap?.rank,
              no: item?.number,
              driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
              team: item.Constructor.name.toUpperCase(),
              laps: item?.FastestLap?.lap,
              time: item?.FastestLap?.Time?.time,
              avg_speed: item?.FastestLap?.AverageSpeed?.speed
            };
          }
        })
        .filter((item) => item !== undefined) as DataType[]) ?? [];
    data = _.orderBy(data, ['rank'], ['asc']);

    return data;
  }, [racesResultQuery.data]);

  const loading = racesResultQuery.isFetching || racesResultQuery.isLoading;
  return (
    <>
      {data.length > 0 ? (
        <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
      ) : (
        <Typography.Title level={3}>
          {!loading ? <>No fastest laps results for this round</> : <Spin />}
        </Typography.Title>
      )}
    </>
  );
};

export default FastestLaps;
