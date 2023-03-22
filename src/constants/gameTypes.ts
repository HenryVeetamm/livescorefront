export const gameType = {
  NOT_REGISTERED_TEAM: 2,
  REGISTERD_TEAM: 3,
};

export const gameTypeValues = {
  [gameType.NOT_REGISTERED_TEAM]: 'Mängi registreerimata võistkonna vastu',
  [gameType.REGISTERD_TEAM]: 'Mängi registreeritud võistkonna vastu',
};

export const gameTypeSelectList = [
  {
    value: gameType.NOT_REGISTERED_TEAM,
    label: gameTypeValues[gameType.NOT_REGISTERED_TEAM],
  },
  {
    value: gameType.REGISTERD_TEAM,
    label: gameTypeValues[gameType.REGISTERD_TEAM]
  }
];