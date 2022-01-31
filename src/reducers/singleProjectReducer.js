import {
  SINGLEPROJECTPENDING,
  SINGLEPROJECT,
  SINGLEPROJECTSUCCESS,
} from '../redux/constants';

const intialState = {
  single: [],
  pending: false,
};

export default function SingleProjectReducer(state = intialState, action) {
  switch (action.type) {
    case SINGLEPROJECTPENDING:
      return {
        ...state,
        pending: true,
      };
    case SINGLEPROJECT:
      return {
        ...state,
        pending: false,
        single: action.single,
      };
    case SINGLEPROJECTSUCCESS:
      return {
        ...state,
        pending: false,
        single: action.single,
      };

    default:
      return {
        ...state,
      };
  }
}
