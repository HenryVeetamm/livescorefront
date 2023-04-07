import { PlayerInGameDto } from 'app/services/player/types';

export type EfficiencyDto = {
  totalPoints: number,
  efficiency: number
}

export const calculateEfficiency= (pig: PlayerInGameDto) : EfficiencyDto => {
  const totalPoints = pig.blockPoint + pig.attackToPoint + pig.aces;
  const mistakes = pig.blockFault + pig.attackFault + pig.serveFaults + pig.receptionFault;
  return { totalPoints, efficiency: totalPoints - mistakes };
};