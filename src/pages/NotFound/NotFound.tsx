import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="We couldn't find the page you were looking for"
      extra={
        <Button type="primary" onClick={() => nav('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
