import { useDriverStandings, useRaceResults, useTabMenu, useTeams, useValueForm, useYear } from '@/modules';
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Row, Select, Spin } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FormType = {
  value: string;
  label: string;
}[];

const dataType: FormType = [
  { label: 'RACES', value: 'races' },
  { label: 'DRIVERS', value: 'drivers' },
  { label: 'TEAMS', value: 'teams' },
  { label: 'DHL FASTEST LAP AWARD', value: 'fastest-laps-award' }
];

const Search = () => {
  const nav = useNavigate();
  const formRef = useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const [responseLabel, setResponseLabel] = useState('Race name');
  const [responseData, setResponseData] = useState(['ALL']);
  const { valueForm, setValueForm } = useValueForm();
  const { currentTabMenu, setCurrentTabMenu } = useTabMenu();

  const yearArray = useMemo(() => {
    const thisYear = new Date().getFullYear();
    const filterSize = thisYear - 1950 + 1;
    return Array(filterSize)
      .fill(0)
      .map((_, i) => i + 1950)
      .reverse();
  }, []);

  const [year] = useYear();

  const racesResultsQuery = useRaceResults(year, { enabled: false });
  const driversQuery = useDriverStandings(year, { enabled: false });
  const teamsQuery = useTeams(year, { enabled: false });

  const listRaceName: string[] = useMemo(() => {
    const dataRaceResults = (racesResultsQuery.data?.RaceTable?.Races as any[]) ?? [];
    return dataRaceResults.map((item) => item.raceName.replace(' Grand Prix', '').toUpperCase());
  }, [racesResultsQuery.data]);

  const listDrivers = useMemo(() => {
    const dataDrivers = (driversQuery.data?.StandingsTable?.StandingsLists[0]?.DriverStandings as any[]) ?? [];
    return dataDrivers.map((item) => `${item.Driver.familyName}, ${item.Driver.givenName}`.toUpperCase()).sort();
  }, [driversQuery.data]);

  const listTeams = useMemo(() => {
    const dataTeams = (teamsQuery.data?.StandingsTable?.StandingsLists[0]?.ConstructorStandings as any[]) ?? [];
    return dataTeams.map((item) => item.Constructor.name.toUpperCase()).sort();
  }, [teamsQuery.data]);

  useEffect(() => {
    form.setFieldsValue(valueForm);
    const { type } = valueForm;
    const label = {
      races: 'Race name',
      drivers: 'Driver',
      teams: 'Team'
    };
    const responseData = {
      races: listRaceName,
      drivers: listDrivers,
      teams: listTeams
    };
    if (type !== 'fastest-laps-award' && responseData[type].length > 0) {
      setResponseLabel(label[type]);
      setResponseData(['ALL', ...responseData[type]]);
    } else if (type === 'teams' && responseData[type].length === 0) {
      setResponseLabel('Team');
      setResponseData(['ALL']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueForm, listRaceName, listDrivers, listTeams]);

  const handleSeason = () => {
    form.setFieldsValue({ responseKey: 'ALL' });
    if (currentTabMenu !== 'race-result') {
      setTimeout(() => {
        setCurrentTabMenu('race-result');
      }, 300);
    }
    formRef.current?.submit();
  };

  const handleSubmit = (value: string) => {
    const query = {
      races: racesResultsQuery,
      drivers: driversQuery,
      teams: teamsQuery
    };
    const typeValue = ['races', 'drivers', 'teams'];

    if (typeValue.includes(value)) {
      form.setFieldsValue({ responseKey: 'ALL' });
      if (query[value].isStale) query[value].refetch();
      if (currentTabMenu !== 'race-result') {
        setTimeout(() => {
          setCurrentTabMenu('race-result');
        }, 300);
      }
    }
    formRef.current?.submit();
  };

  const onFinish = (values: { season: number; type: string; responseKey: string }) => {
    const { season, type, responseKey } = values;
    if (!responseKey) {
      setValueForm(season, type, 'ALL');
    } else {
      setValueForm(season, type, responseKey);
    }
    if (responseKey && responseKey !== 'ALL') {
      if (type === 'races') {
        nav(`/results/${season}/${type}/${responseKey.toLowerCase()}/${currentTabMenu}`);
        return;
      }
      if (type === 'drivers' || type === 'teams') {
        const nameDetailArray = responseKey.replace(',', '').split(' ');
        const nameDetail = [...nameDetailArray.slice(-1), ...nameDetailArray.slice(0, -1)].join('-').toLowerCase();
        // console.log('nameDetail', nameDetailArray, nameDetail);
        nav(`/results/${season}/${type}/${nameDetail}`);
        return;
      }
    }
    nav(`/results/${season}/${type}`);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <>
      <Form ref={formRef} form={form} layout='vertical' autoComplete='off' onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name='season' label='Season'>
              <Select placeholder='Select season' onChange={handleSeason}>
                {yearArray.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='type' label='Type'>
              <Select placeholder='Select type' onChange={handleSubmit}>
                {dataType.map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.type !== currentValues.type;
            }}>
            {({ getFieldValue }) =>
              getFieldValue('type') === 'races' ||
              getFieldValue('type') === 'drivers' ||
              getFieldValue('type') === 'teams' ? (
                <Col span={8}>
                  {racesResultsQuery.isFetching || driversQuery.isFetching || teamsQuery.isFetching ? (
                    <span>
                      <Spin indicator={antIcon} style={{ marginTop: '25px' }} />
                    </span>
                  ) : (
                    <Form.Item name='responseKey' label={`${responseLabel}`}>
                      <Select placeholder={`Select ${responseLabel.toLowerCase()}`} onChange={handleSubmit}>
                        {responseData.map((item, index) => {
                          return (
                            <Option key={index} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  )}
                </Col>
              ) : null
            }
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default Search;
