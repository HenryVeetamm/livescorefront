import { Col, Descriptions, Divider, Row } from 'antd';
import { useGetCompletedSetsByGameIdQuery } from 'app/services/game';
import { selectors } from 'app/services/game/slice';
import { GameDto, SetDto } from 'app/services/game/types';
import { useSelector } from 'react-redux';
import { getDateTime } from 'utils/date';
import sortBy from 'lodash/sortBy';
import '../../styles.less';
import { Fragment } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const GameInfo = ({ game } : { game: GameDto }) => {
  const sets = useSelector(selectors.getAllGameSets);
  useGetCompletedSetsByGameIdQuery(game ? game.id : skipToken, { refetchOnMountOrArgChange: true });

  const isHomeTeamWinner = (set: SetDto) => set.homeTeamScore > set.awayTeamScore;

  const renderList = () => {
    if (!sets) return null;
    const sortedSets = sortBy(sets, (set: any) => set.setIndex);
    return sortedSets.map((set : SetDto) => {
      const data = isHomeTeamWinner(set);
      return <Fragment key={set.id}>
        <Divider>{set.setIndex}. geim</Divider>
        <Row justify={'center'}>
          <Col span={8} ><span className={`${data ? 'text-bold': ''}`}>{game.homeTeam.name}</span></Col>
          <Col span={8}><span className={'text-bold'} style={{ paddingLeft: '1em' }}>{set.homeTeamScore} : {set.awayTeamScore}</span></Col>
          <Col ><span className={`${!data ? 'text-bold': ''} `}>{game.awayTeam ? game.awayTeam.name : game.awayTeamName }</span></Col>
        </Row>
      </Fragment>;
    });
  };

  return <><Descriptions title="Mängu info">

    <Descriptions.Item label="Koduvõistkond">{game.homeTeam.name}</Descriptions.Item>
    <Descriptions.Item label="Külalisvõistkond">{game.awayTeam ? game.awayTeam.name : game.awayTeamName}</Descriptions.Item>
    <Descriptions.Item label="Toimumiskoht">{game.location}</Descriptions.Item>
    <Descriptions.Item label="Aeg">{getDateTime(game.scheduledTime)}</Descriptions.Item>

  </Descriptions>
  <div className='game-set-container'>
    {renderList()}
  </div>
  </>;

};

export default GameInfo;