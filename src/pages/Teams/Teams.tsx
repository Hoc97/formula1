import f1 from '@/assets/f1/f1';
import SeasonFilter from '@/components/SeasonFilter/SeasonFilter';
import { useTeamDriversByIdSeason, useTeams, useYear } from '@/modules';
import '@/pages/Teams/Teams.scss';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Image from './components/Image';

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
  team: Team;
  pts: string;
}

const Teams = () => {
  const nav = useNavigate();
  const { teaminfo } = useParams();

  const [year] = useYear();
  const teamsQuery = useTeams(year);

  const dataTeams: DataType[] = useMemo(() => {
    const dataTeams = (teamsQuery.data?.StandingsTable?.StandingsLists[0]?.ConstructorStandings as any[]) ?? [];
    return dataTeams.map((item) => {
      return {
        key: item.position,
        pos: item.position,
        team: item.Constructor,
        pts: item.points
      };
    });
  }, [teamsQuery.data]);

  const teamIdArray = dataTeams.map((item) => item.team.constructorId);

  const teamDriversQuery = useTeamDriversByIdSeason(year, teamIdArray, { enabled: !!teamIdArray.length });

  const dataTeamDrivers = useMemo(() => {
    const dataTeamDrivers = teamDriversQuery.map((item) => item.data?.DriverTable.Drivers as any[]);
    return dataTeamDrivers;
  }, [teamDriversQuery]);
  console.log('dataTeamDrivers', dataTeams);

  const handleNav = (team: Team) => {
    nav(`${team.constructorId}`);
  };

  const loading = teamsQuery.isFetching || teamsQuery.isLoading;
  return (
    <div className='teams-container'>
      {teaminfo ? (
        <Outlet />
      ) : (
        <div className='teams-content'>
          <div className='header'>
            <SeasonFilter />
            <Typography.Title> F1 teams {year}</Typography.Title>
          </div>
          <Spin tip='Loading...' spinning={loading}>
            <div className='teams-card'>
              <Row gutter={16} wrap>
                {dataTeams.length > 0 ? (
                  dataTeams.map((item, index) => {
                    const driver1GivenName = dataTeamDrivers[index]?.[0]?.givenName || '';
                    const driver1FamilyName = <b>{dataTeamDrivers[index]?.[0]?.familyName.toUpperCase()}</b>;
                    const driver2GivenName = dataTeamDrivers[index]?.[1]?.givenName || '';
                    const driver2FamilyName = <b>{dataTeamDrivers[index]?.[1]?.familyName.toUpperCase()}</b>;

                    const codeNumber1 = `${dataTeamDrivers[index]?.[0]?.givenName.substring(0, 3)}${
                      dataTeamDrivers[index]?.[0]?.code
                    }01`.toUpperCase();
                    const codeDriver1 = `${dataTeamDrivers[index]?.[0]?.givenName.charAt(0)}/${codeNumber1}_${
                      dataTeamDrivers[index]?.[0]?.givenName
                    }_${dataTeamDrivers[index]?.[0]?.familyName}/${codeNumber1.toLowerCase()}`;
                    const codeNumber2 = `${dataTeamDrivers[index]?.[1]?.givenName.substring(0, 3)}${
                      dataTeamDrivers[index]?.[1]?.code
                    }01`.toUpperCase();
                    const codeDriver2 = `${dataTeamDrivers[index]?.[1]?.givenName.charAt(0)}/${codeNumber2}_${
                      dataTeamDrivers[index]?.[1]?.givenName
                    }_${dataTeamDrivers[index]?.[1]?.familyName}/${codeNumber2.toLowerCase()}`;
                    return (
                      <Col key={item.key} span={12}>
                        <Card
                          onClick={() => handleNav(item.team)}
                          hoverable={true}
                          style={{ marginTop: 16, paddingRight: 10 }}>
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
                                <span
                                  className='item-name-before'
                                  style={{
                                    backgroundColor: f1.constructors[item.team.constructorId]?.color1 ?? '#000'
                                  }}></span>
                                <span className='list-item--team'>{item.team.name}</span>
                              </div>
                              <div className='team-car'>
                                <Image data={f1.constructors[item.team.constructorId]?.name} type='team' />
                              </div>
                            </div>
                            <div>
                              <div className='given-name'>
                                {driver1GivenName} {driver1FamilyName}
                                <Image data={codeDriver1} type='driver' />
                              </div>
                              <div className='given-name'>
                                {driver2GivenName} {driver2FamilyName}
                                <Image data={codeDriver2} type='driver' />
                              </div>
                            </div>
                            <div className='list-item--car'>
                              <Image data={f1.constructors[item.team.constructorId]?.name} type='car' />
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <div>
                    {!loading && (
                      <>
                        The Constructors Championship was not awarded until <b>1958</b>
                      </>
                    )}
                  </div>
                )}
              </Row>
            </div>
          </Spin>
        </div>
      )}
    </div>
  );
};

export default Teams;
