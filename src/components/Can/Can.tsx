import { selectors } from 'app/services/session';
import { useGetUserTeamIdQuery } from 'app/services/team';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';

type CanProps = {
  teamId?: string[];
  children: ReactNode | ReactNode[],
  gameStatus?: number;
  requiredStatus?: number
}

const Can = ({ teamId, children, gameStatus, requiredStatus } : CanProps) => {
  const userTeamId = useSelector(selectors.getUserTeamId);
  useGetUserTeamIdQuery();

  if (teamId && !isEmpty(teamId) && !includes(teamId, userTeamId)) return null;
  if (gameStatus !== requiredStatus) return null;

  return <>{children}</>;
};

export default Can;