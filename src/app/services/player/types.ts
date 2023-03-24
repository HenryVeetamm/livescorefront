export interface PlayerDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  position: number;
  shirtNumber: number;
  profileAbsoulteUri: string | undefined
}

export interface AddPlayerDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  position: number;
  shirtNumber: number;
  teamId: string;
}

export interface EditPlayerDto {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  position: number;
  shirtNumber: number;
  teamId: string;
}

export interface PlayerFormType {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: moment.Moment;
  position: number;
  shirtNumber: number;
}

export interface AddingToGame {
  id: string;
  firstName: string;
  lastName: string;
  alreadyAdded: boolean;
  shirtNumber: number;
}

export interface PlayerInGameDto {
  id : string;
  player: PlayerDto,
  aces: number,
  attackFault: number,
  attackInGame: number,
  attackToPoint: number,
  blockFault: number,
  blockPoint: number,
  goodReception: number,
  perfectReception: number,
  receptionFault: number,
  serveFaults: number
}

export interface PlayersTransferDto {
  teamId: string;
  rightPlayers: PlayerInGameDto[]
}

export interface ManagePlayerScoreDto {
  playerInGameId: string;
  method: number;
  categoryResult: number;
  category: number;
  playerId: string;
  teamId: string;
  gameId: string
}

export interface PlayerStatistics {
  totalAttacks: number;
  attackFaults: number;
  attackPoints: number;

  aces: number;
  serveFaults: number;

  blockPoints: number;
  blockFaults: number;

  totalReception: number;
  receptionFaults: number;
  perfectReception: number;
  goodReception: number;
}

export interface PlayerCommentaryDto {
  player: PlayerDto;
  method: number;
  categoryResult: number;
  category: number;
}