import '@/pages/Drivers/Drivers.scss';
import SeasonFilter from '@/components/SeasonFilter/SeasonFilter';
import { useDriverStandings, useYear } from '@/modules';
import { Col, Row, Typography, Spin } from 'antd';
import { Card } from 'antd';
import { useMemo } from 'react';
import env from '@/configs/env';
import f1 from '@/assets/f1/f1';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
}

interface Team {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

interface DataType {
  key: React.Key;
  pos: string;
  driver: Driver;
  nationality: string;
  team: Team;
  pts: string;
}

const Drivers = () => {
  const nav = useNavigate();
  const { driverinfo } = useParams();
  const [year] = useYear();
  const driversQuery = useDriverStandings(year);

  const data: DataType[] = useMemo(() => {
    const dataDrivers = (driversQuery.data?.StandingsTable?.StandingsLists[0]?.DriverStandings as any[]) ?? [];
    return (
      dataDrivers.map((item) => {
        return {
          key: item.position,
          pos: item.position,
          driver: item.Driver,
          nationality: item.Driver.nationality,
          team: item.Constructors[0],
          pts: item.points
        };
      }) ?? []
    );
  }, [driversQuery.data]);

  const handlePhoto = (data, type) => {
    if (type === 'number') {
      return `${env.photoUrl}2018-redesign-assets/drivers/number-logos/${data}.png.transform/2col/image.png`;
    }
    if (type === 'driver') {
      return `${env.photoUrl}drivers/${data}.png.transform/2col/image.png`;
    }
  };

  const handleNav = (driver: Driver) => {
    nav(`${driver.driverId}`);
  };

  const loading = driversQuery.isFetching || driversQuery.isLoading;
  return (
    <div className='drivers-container'>
      {driverinfo ? < Outlet /> : (
        <div className='drivers-content'>
          <div className='header'>
            <SeasonFilter />
            <Typography.Title> F1 Drivers {year}</Typography.Title>
          </div>
          <Spin tip="Loading..." spinning={loading}>
            <div className='drivers-card'>
              <Row gutter={16} wrap>
                {data.map((item, index) => {
                  const codeNumber = `${item.driver.givenName.substring(0, 3)}${item.driver.code}01`.toUpperCase();
                  const codeDriver = `${item.driver.givenName.charAt(0)}/${codeNumber}_${item.driver.givenName}_${item.driver.familyName}/${codeNumber.toLowerCase()}`;
                  return (
                    <Col key={item.key} span={index === 0 || index === 1 || index === 2 ? 8 : 6}>
                      <Card onClick={() => handleNav(item.driver)} hoverable={true} style={{ marginTop: 16, paddingRight: 10 }}>
                        <div className='list-standing'>
                          <div className='rank'>{item.pos} </div>
                          <div className='points'>
                            <div className='points-number'>{item.pts}</div>
                            <div className='points-label'>PTS</div>
                          </div>
                        </div>
                        <div className='container'>
                          <div className='list-item--info'>
                            <div className='item-name'>
                              <span className='item-name-before' style={{ backgroundColor: f1.constructors[item.team.constructorId]?.color1 ?? '#000' }}></span>
                              <span className='given-name'>{item.driver.givenName}</span>
                              <span className='family-name'>{item.driver.familyName}</span>
                            </div>
                            <div className='country-flag'>
                              <img src={f1.nationality[item.nationality]} alt='sss' />
                            </div>
                          </div>
                          <p className='list-item--team'>{item.team.name}</p>
                          <div className='list-item--image'>
                            <span className='image-number'>
                              <img src={handlePhoto(codeNumber, 'number')} />
                            </span>
                            <img src={handlePhoto(codeDriver, 'driver')} />
                          </div>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Spin>
        </div>
      )}

    </div>
  );
};

export default Drivers;
