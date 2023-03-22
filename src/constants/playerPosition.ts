export const positions = {
  LIBERO: 1,
  MIDDLE_BLOCKER: 2,
  OUTSIDES_HITTER: 3,
  RIGHT_SIDE_HITTER: 4,
  SETTER: 5,
};

export const positionValues = {
  [positions.LIBERO]: 'Libero',
  [positions.MIDDLE_BLOCKER]: 'Temporündaja',
  [positions.OUTSIDES_HITTER]: 'Diagonaalründaja',
  [positions.RIGHT_SIDE_HITTER]: 'Nurgaründaja',
  [positions.SETTER]: 'Sidemängija',
};

export const positionSelectList = [ {
  value: positions.LIBERO,
  label: positionValues[positions.LIBERO],
}, {
  value: positions.MIDDLE_BLOCKER,
  label: positionValues[positions.MIDDLE_BLOCKER],
}, { value: positions.OUTSIDES_HITTER,
  label: positionValues[positions.OUTSIDES_HITTER] }, {
  value: positions.RIGHT_SIDE_HITTER,
  label: positionValues[positions.RIGHT_SIDE_HITTER] }, {
  value: positions.SETTER,
  label: positionValues[positions.SETTER],
} ];