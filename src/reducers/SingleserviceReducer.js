import {SINGLSERVICEPENDING, SINGLSERVICESUCCESS} from '../redux/constants';

const intialState = {
  singlecategory: [],
  pending: false,
};

export default function SingleserviceReducer(state = intialState, action) {
  switch (action.type) {
    case SINGLSERVICEPENDING:
      return {
        ...state,
        pending: true,
      };
    case SINGLSERVICESUCCESS:
      return {
        ...state,
        pending: false,
        singlecategory: action.singlecategory,
      };

    default:
      return {
        ...state,
      };
  }
}
