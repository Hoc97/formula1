import useDrivers from '@/modules/useDrivers';
import useRQGlobalState from '@/modules/useRQGlobalState';
import useRaces from '@/modules/useRaces';
import useTeams from '@/modules/useTeams';
import { Col, Form, FormInstance, Row, Select } from 'antd';
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
  const [responseLabel, setResponseLabel] = useState('Location');
  const [responseData, setResponseData] = useState<string[]>(['all']);
  const [initialValueForm, setInitialValueForm] = useRQGlobalState('initialValueForm', {
    season: 2023,
    type: 'races',
    responseKey: 'all'
  });

  // const dataSeasonsQuery = useSeasons();

  const dataRacesQuery = useRaces({ season: initialValueForm?.season, type: 'race' });
  const dataTeamsQuery = useTeams({ season: initialValueForm?.season });
  const dataDriversQuery = useDrivers({ season: initialValueForm?.season });

  const listLocation = useMemo(() => {
    return dataRacesQuery?.data?.map?.((item) => {
      return item?.competition?.location?.country;
    });
  }, [dataRacesQuery.data]);

  const listDrivers = useMemo(() => {
    return dataDriversQuery?.data
      ?.map?.((item) => {
        return `${item?.driver?.name?.split(' ')[1]}, ${item?.driver?.name?.split(' ')[0]}`;
      })
      ?.sort();
  }, [dataDriversQuery.data]);

  const listTeams = useMemo(() => {
    return dataTeamsQuery?.data?.map?.((item) => item?.team?.name)?.sort();
  }, [dataTeamsQuery.data]);

  useEffect(() => {
    form.setFieldsValue(initialValueForm);

    if (initialValueForm?.type === 'races' && listLocation) {
      setResponseLabel('Location');
      setResponseData(['all', ...listLocation]);
      return;
    }
    if (initialValueForm?.type === 'drivers' && listDrivers) {
      setResponseLabel('Driver');
      setResponseData(['all', ...listDrivers]);
      return;
    }
    if (initialValueForm?.type === 'teams' && listTeams) {
      setResponseLabel('Team');
      setResponseData(['all', ...listTeams]);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValueForm, listLocation, listDrivers]);

  const handleSubmit = (value: string) => {
    if (value === 'races' && dataRacesQuery.isStale) {
      dataRacesQuery.refetch();
    }
    if (value === 'drivers' && dataDriversQuery.isStale) {
      dataDriversQuery.refetch();
    }
    if (value === 'teams' && dataTeamsQuery.isStale) {
      dataTeamsQuery.refetch();
    }
    if (
      value === 'drivers' ||
      value === 'teams' ||
      (value === 'races' && !listLocation?.includes(initialValueForm.responseKey))
    ) {
      form.setFieldsValue({
        responseKey: 'all'
      });
    }
    formRef.current?.submit();
  };

  const onFinish = (values) => {
    console.log(values);

    setInitialValueForm(values);
    if (values.responseKey && values.responseKey !== 'all') {
      if (values.type === 'races' && listLocation) {
        const dataItem = dataRacesQuery.data?.[listLocation.indexOf(values.responseKey)];
        nav(`/results/${values.season}/${values.type}/${values.responseKey.toLowerCase()}/race-result`, {
          state: { name: dataItem }
        });
        return;
      }
      if (values.type === 'drivers' || values.type === 'teams') {
        nav(`/results/${values.season}/${values.type}/${values.responseKey.toLowerCase()}`, {
          state: { name: values }
        });
        return;
      }
    }
    nav(`/results/${values.season}/${values.type}`, { state: { name: values } });
  };

  return (
    <>
      <Form ref={formRef} form={form} layout='vertical' autoComplete='off' onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name='season' label='Season'>
              <Select placeholder='Select season' onChange={handleSubmit}>
                <>
                  {/* {[...(dataSeasonsQuery?.data ?? [])]?.reverse?.().map((item) => { */}
                  {[2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012].map((item) => {
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
                  <Form.Item name='responseKey' label={`${responseLabel}`}>
                    <Select placeholder={`Select ${responseLabel.toLowerCase()}`} onChange={handleSubmit}>
                      {responseData.map((item, index) => {
                        return (
                          <Option key={index} value={item}>
                            {item.toUpperCase()}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
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
