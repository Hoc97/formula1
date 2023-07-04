import { useYear } from '@/modules';
import { Col, Form, Select } from 'antd';
import { useEffect, useMemo } from 'react';

const { Option } = Select;
const SeasonFilter = () => {
  const [form] = Form.useForm();
  const [year, setYear] = useYear();

  useEffect(() => {
    form.setFieldsValue({ season: year });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const handleChange = (value: number) => {
    setYear(value);
  };

  const yearArray = useMemo(() => {
    const thisYear = new Date().getFullYear();
    const filterSize = thisYear - 1950 + 1;
    return Array(filterSize)
      .fill(0)
      .map((_, i) => i + 1950)
      .reverse();
  }, []);

  return (
    <Form form={form} layout='vertical'>
      <Col span={6}>
        <Form.Item name='season' label='Season'>
          <Select placeholder='Select season' onChange={handleChange}>
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
    </Form>
  );
};

export default SeasonFilter;
