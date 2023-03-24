import { Commentary } from 'app/services/game/types';
import { CategoryResult, PointCategory } from 'constants/assignScore';

export const generateComment = (comment : Commentary) => {
  let resultText = '';
  if(comment.category === PointCategory.Attack) resultText = getAttackText(comment.categoryResult);
  if(comment.category === PointCategory.Block) resultText = getBlockText(comment.categoryResult);
  if(comment.category === PointCategory.Serve) resultText = getServeText(comment.categoryResult);
  if(comment.category === PointCategory.Reception) resultText = getReceptionText(comment.categoryResult);

  return resultText;
};

const getAttackText = (categoryResult : number) => {
  if (categoryResult === CategoryResult.Good) return 'tõi rünnakuga punkti.';
  if (categoryResult === CategoryResult.Bad) return 'eksis rünnakul';
  return 'ründas, aga pall jäi mängu';
};

const getBlockText = (categoryResult : number) => {
  if (categoryResult === CategoryResult.Good) return 'tõi blokiga punkti.';
  if (categoryResult === CategoryResult.Bad) return 'eksis blokis';
  return '';
};

const getServeText = (categoryResult : number) => {
  if (categoryResult === CategoryResult.Good) return 'tõi serviga punkti';
  if (categoryResult === CategoryResult.Bad) return 'eksis serviga';
  return '';
};

const getReceptionText = (categoryResult : number) => {
  if (categoryResult === CategoryResult.Good) return 'tegi suurepärase vastuvõtu';
  if (categoryResult === CategoryResult.Bad) return 'eksis vastuvõtul';
  return 'võttis palli vastu';
};