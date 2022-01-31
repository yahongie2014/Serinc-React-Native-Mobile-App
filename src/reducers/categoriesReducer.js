import {
  CATEGORIES_PENDING,
  CATEGORIES,
  CATEGORIES_SUCCESS,
} from '../redux/constants';

const intialState = {
  categories: [],
  pending: false,
};

export default function CategoriesReducer(state = intialState, action) {
  switch (action.type) {
    case CATEGORIES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CATEGORIES:
      return {
        ...state,
        pending: true,
        categories: action.categories,
      };
    case CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        categories: action.categories,
      };

    default:
      return {
        ...state,
      };
  }
}
