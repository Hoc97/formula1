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

    if (valueForm.type === 'races' && listRaceName.length > 0) {
      setResponseLabel('Race name');
      setResponseData(['ALL', ...listRaceName]);
      return;
    }
    if (valueForm.type === 'drivers' && listDrivers.length > 0) {
      setResponseLabel('Driver');
      setResponseData(['ALL', ...listDrivers]);
      return;
    }
    if (valueForm.type === 'teams' && listTeams.length > 0) {
      setResponseLabel('Team');
      setResponseData(['ALL', ...listTeams]);
      return;
    } else if (valueForm.type === 'teams' && listTeams.length === 0) {
      setResponseLabel('Team');
      setResponseData(['ALL']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueForm, listRaceName, listDrivers, listTeams]);

  const handleSeason = () => {
    form.setFieldsValue({
      responseKey: 'ALL'
    });
    setTimeout(() => {
      setCurrentTabMenu('race-result');
    }, 300);
    formRef.current?.submit();
  };

  const handleSubmit = (value: string) => {
    if (value === 'races' && racesResultsQuery.isStale) {
      racesResultsQuery.refetch();
    }
    if (value === 'drivers' && driversQuery.isStale) {
      driversQuery.refetch();
    }
    if (value === 'teams' && teamsQuery.isStale) {
      teamsQuery.refetch();
    }
    if (value === 'drivers' || value === 'teams' || value === 'races') {
      form.setFieldsValue({
        responseKey: 'ALL'
      });
      setTimeout(() => {
        setCurrentTabMenu('race-result');
      }, 300);
    }
    formRef.current?.submit();
  };

  const onFinish = (values) => {
    if (!values.responseKey) {
      setValueForm(values.season, values.type, 'ALL');
    } else {
      setValueForm(values.season, values.type, values.responseKey);
    }

    if (values.responseKey && values.responseKey !== 'ALL') {
      if (values.type === 'races') {
        nav(`/results/${values.season}/${values.type}/${values.responseKey.toLowerCase()}/${currentTabMenu}`);
        return;
      }
      if (values.type === 'drivers' || values.type === 'teams') {
        nav(`/results/${values.season}/${values.type}/${values.responseKey.toLowerCase()}`);
        return;
      }
    }
    nav(`/results/${values.season}/${values.type}`);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <>
      <Form ref={formRef} form={form} layout='vertical' autoComplete='off' onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name='season' label='Season'>
              <Select placeholder='Select season' onChange={handleSeason}>
                <>
                  {yearArray.map((item) => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </>
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
