import { usePitStopSummaryByRound, useRaceResult, useYear } from '@/modules';
import { Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

interface DataType {
  key: React.Key;
  stops: string;
  no: string;
  driver: string;
  team: string;
  laps: string;
  time: string;
  duration: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'STOPS',
    dataIndex: 'stops'
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
    title: 'TIME OF DAY',
    dataIndex: 'time',
    className: 'highlight'
  },
  {
    title: 'DURATION',
    dataIndex: 'duration',
    className: 'highlight'
  }
];

const PitStopSummary = () => {
  const { round } = useOutletContext<{ round: string | number }>();
  const [year] = useYear();
  const racesResultQuery = useRaceResult(year, round as string, { enabled: !!round });
  const pitStopSummaryQuery = usePitStopSummaryByRound(year, round as string, { enabled: !!round });

  const dataInfoDriver = useMemo(() => {
    const dataRaceResult = (racesResultQuery.data?.RaceTable?.Races[0]?.Results as any[]) ?? [];
    return (
      dataRaceResult.map((item) => {
        return {
          no: item.number,
          driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
          driverId: item.Driver.driverId,
          team: item.Constructor.name.toUpperCase()
        };
      }) ?? []
    );
  }, [racesResultQuery.data]);

  const data: DataType[] = useMemo(() => {
    const dataPitStops = (pitStopSummaryQuery.data?.RaceTable?.Races[0]?.PitStops as any[]) ?? [];
    return dataPitStops.map((item, index) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const InfoDriver = dataInfoDriver.find((driver) => driver.driverId === item.driverId)!;
      return {
        key: item.driverId + index,
        stops: item.stop,
        no: InfoDriver.no,
        driver: InfoDriver.driver,
        team: InfoDriver.team,
        laps: item.lap,
        time: item.time,
        duration: item.duration
      };
    });
  }, [pitStopSummaryQuery.data, dataInfoDriver]);

  return (
    <>
      {data.length > 0 ? (
        <Table loading={pitStopSummaryQuery.isFetching} columns={columns} dataSource={data} pagination={false} />
      ) : (
        <Typography.Title level={3}>
          {!pitStopSummaryQuery.isFetching ? <>No pit stops results for this round</> : <Spin />}
        </Typography.Title>
      )}
    </>
  );
};

export default PitStopSummary;
