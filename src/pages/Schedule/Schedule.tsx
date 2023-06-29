import SeasonFilter from '@/components/SeasonFilter/SeasonFilter';
import { useRaces, useYear } from '@/modules';
import '@/pages/Schedule/Schedule.scss';
import { convertTimeZone } from '@/utils/DateConverter';
import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { BsFlagFill } from 'react-icons/bs';
import { IoTimeSharp } from 'react-icons/io5';
import { MdNavigateNext, MdOutlineDoubleArrow } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: React.Key;
  round: string;
  race: string;
  date: string;
  result: string;
  status: string;
  dataExtend: object;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  time: string;
}

const Schedule = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [latest, setLastest] = useState(-1);
  const nav = useNavigate();

  useEffect(() => {
    if (latest !== -1) {
      setExpandedRowKeys([`${latest + 1}`]);
      scrollTo('next-race');
    } else {
      setExpandedRowKeys([]);
    }
  }, [latest]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  };

  const [year] = useYear();
  const racesQuery = useRaces(year);

  const dataRaces = useMemo(() => {
    // use lodash to clone object racesQuery => avoid get dataRaces[i].passed = true when select season other
    const racesQueryClone = _.cloneDeep(racesQuery);
    const dataRaces = (racesQueryClone.data?.RaceTable?.Races as any[]) ?? [];
    const thisYear = new Date().getFullYear();
    if (year === thisYear) {
      for (let i = 0; i < dataRaces.length; i++) {
        if (new Date() < new Date(dataRaces[i].date)) {
          dataRaces[i].latest = true;
          setLastest(i);
          break;
        }
        dataRaces[i].passed = true;
      }
    } else if (year < thisYear) {
      for (let i = 0; i < dataRaces.length; i++) {
        if (latest !== -1) setLastest(-1);
        dataRaces[i].passed = true;
      }
    }
    return dataRaces;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [racesQuery.data]);

  const data: DataType[] = useMemo(() => {
    return (
      dataRaces?.map((item) => {
        let status = 'SCHEDULE';
        let result = '';
        if (item.passed) {
          status = 'COMPLETE';
          result = 'RESULTS';
        }
        if (item.latest) {
          status = 'NEXT RACE';
        }
        return {
          key: item.round,
          round: item.round,
          race: item.raceName,
          date: moment(item?.date).format('DD MMM YYYY'),
          result: result,
          status: `${status}${status !== 'COMPLETE' ? ` ${moment(item?.date).fromNow()}` : ''}`,
          dataExtend: item
        };
      }) ?? []
    );
  }, [dataRaces]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'ROUND',
      dataIndex: 'round',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'RACE',
      dataIndex: 'race',
      className: 'race'
    },
    {
      title: 'DATE',
      dataIndex: 'date'
    },
    {
      title: '',
      dataIndex: 'result',
      width: '10%',
      render: (text, record) => {
        const name = record.race.replace(' Grand Prix', '').toLowerCase();
        return (
          <>
            {text && (
              <Tag className='result' key={text} onClick={() => nav(`/results/${year}/races/${name}/race-result`)}>
                {text}
                <MdNavigateNext style={{ color: 'red' }} size='20px' />
              </Tag>
            )}
          </>
        );
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      width: '5%',
      render: (text) => {
        let color = 'default';
        if (text === 'COMPLETE') {
          color = '#2c8949';
        }
        if (text.includes('NEXT RACE')) {
          color = '#dc3545';
        }
        if (text.includes('SCHEDULE')) {
          color = 'default';
        }
        return (
          <Tag color={color} key={text} className='status' id={text.includes('NEXT RACE') ? 'next-race' : ''}>
            {text === 'COMPLETE' && <BsFlagFill />}
            {text.includes('NEXT RACE') && <MdOutlineDoubleArrow />}
            {text.includes('SCHEDULE') && <IoTimeSharp />}
            {text}
          </Tag>
        );
      }
    }
  ];

  const expandedRowRender = (record) => {
    const columns: ColumnsType<ExpandedDataType> = [
      { title: 'Race weekend', dataIndex: 'name' },
      { title: 'Date', dataIndex: 'date' },
      { title: 'Local Time', dataIndex: 'time' }
    ];
    let dataExtend: any[] = [];
    const race = record.dataExtend;
    if (race.FirstPractice) {
      dataExtend.push({
        key: 'First Practice',
        name: 'First Practice',
        date: race.FirstPractice.date,
        time: race.FirstPractice.time
      });
    }
    if (race.SecondPractice) {
      dataExtend.push({
        key: 'Second Practice',
        name: 'Second Practice',
        date: race.SecondPractice.date,
        time: race.SecondPractice.time
      });
    }
    if (race.ThirdPractice) {
      dataExtend.push({
        key: 'Third Practice',
        name: 'Third Practice',
        date: race.ThirdPractice.date,
        time: race.ThirdPractice.time
      });
    }
    if (race.Qualifying) {
      dataExtend.push({
        key: 'Qualifying',
        name: 'Qualifying',
        date: race.Qualifying.date,
        time: race.Qualifying.time
      });
    }
    if (race.Sprint) {
      dataExtend.push({
        key: 'Sprint',
        name: 'Sprint',
        date: race.Sprint.date,
        time: race.Sprint.time
      });
    }
    if (race.raceName) {
      dataExtend.push({
        key: 'Race',
        name: 'Race',
        date: race.date,
        time: race.time
      });
    }
    dataExtend = dataExtend.map((item) => {
      return {
        key: item.key,
        name: item.name,
        date: moment(item.date).format('dddd, DD MMM'),
        time: item.time ? `${convertTimeZone(item.time)[0] + ':' + convertTimeZone(item.time)[1]}` : ''
      };
    });
    return <Table columns={columns} dataSource={dataExtend} pagination={false} style={{ marginBottom: 10 }} />;
  };

  const handleExpand = (record) => {
    let newRowKeys = expandedRowKeys;
    if (expandedRowKeys.includes(record.key as string)) {
      newRowKeys = newRowKeys.filter((e) => e !== record.key);
    } else {
      newRowKeys = [...newRowKeys, record.key as string];
    }
    setExpandedRowKeys(newRowKeys);
  };

  return (
    <div className='schedule-container'>
      <div className='schedule-content'>
        <SeasonFilter />
        <Typography.Title> F1 Schedule {year}</Typography.Title>
        <div className='schedule-table'>
          <Table
            style={{ width: '80%' }}
            loading={racesQuery.isFetching}
            columns={columns}
            dataSource={data}
            pagination={false}
            expandable={{
              expandedRowRender,
              onExpand: (_, record) => handleExpand(record),
              expandedRowKeys: expandedRowKeys
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
