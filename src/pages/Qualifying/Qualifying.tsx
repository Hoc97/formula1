import { useQualifying, useYear } from '@/modules';
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
  q1: string;
  q2: string;
  q3: string;
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
    title: 'Q1',
    dataIndex: 'q1',
    className: 'highlight'
  },
  {
    title: 'Q2',
    dataIndex: 'q2',
    className: 'highlight'
  },
  {
    title: 'Q3',
    dataIndex: 'q3',
    className: 'highlight'
  }
];

const Qualifying = () => {
  const { round } = useOutletContext<{ round: string | number }>();

  const [year] = useYear();
  const qualifyingQuery = useQualifying(year, round as string, { enabled: !!round });

  const data: DataType[] = useMemo(() => {
    const dataQualifying = (qualifyingQuery.data?.RaceTable?.Races[0]?.QualifyingResults as any[]) ?? [];
    return (
      dataQualifying.map((item) => {
        return {
          key: item.position,
          pos: item.position,
          no: item.number,
          driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
          team: item.Constructor.name.toUpperCase(),
          q1: item?.Q1,
          q2: item?.Q2,
          q3: item?.Q3
        };
      }) ?? []
    );
  }, [qualifyingQuery.data]);

  const loading = qualifyingQuery.isFetching || qualifyingQuery.isLoading;
  return (
    <>
      {data.length > 0 ? (
        <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
      ) : (
        <Typography.Title level={3}>
          {!loading ? <>Qualifying results are only fully supported from the 2003 season onwards.</> : <Spin />}
        </Typography.Title>
      )}
    </>
  );
};

export default Qualifying;
