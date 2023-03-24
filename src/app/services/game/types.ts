import { TeamDto } from '../team/types';

export interface AddGameDto {
  awayTeamId?: string,
  awayTeamName?: string,

  location: string,
  scheduledTime: Date,
  GameType: number
}

export interface GameDto {
  id: string;
  homeTeam: TeamDto,
  awayTeam?: TeamDto,
  awayTeamName?: string,
  homeTeamSetWins?: number,
  awayTeamSetWins?: number,
  location: string,
  scheduledTime: Date,
  gameType: number,
  gameStatus: number,
  confirmed?: boolean,
  isGameLive: boolean,
  startTime?: Date,
  endTime?: Date,
}

export interface AddPlayerToGameDto {
  gameId: string;
  playerId: string;
  active: boolean;
}

export interface SetDto {
  id : string;
  gameId: string;
  isActive: boolean;
  homeTeamScore: number;
  awayTeamScore: number;
  setIndex: number;
}

export interface ManageGameScoreDto {
  gameId: string;
  method: number;
  team: number;
}

export interface SearhcDto {
  page: string | null;
  pageSize: string |null
}

export interface Commentary {
  method: number;
  category: number;
  categoryResult: number;
  player: { firstName: any, lastName: any, shirtNumber: any }
}