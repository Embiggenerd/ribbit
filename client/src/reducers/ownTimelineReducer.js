import { OWN_TIMELINE, RIB } from '../actions/types';
import rankTimeline from '../utils/rankOwnTimeline';
import updateRibbed from '../utils/updateRibbed';

export default (state = [], action) => {
  switch (action.type) {
    case OWN_TIMELINE:
      return rankTimeline([...action.timeline]).sort(
        (a, b) => b.ranking - a.ranking
      );

    case RIB:
      if (Object.keys(state).length !== 0) {
        return updateRibbed(state, action).sort(
          (a, b) => b.ranking - a.ranking
        );
      }
      return state;

    default:
      return state;
  }
};
