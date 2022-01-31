import {SEARCH_POSTS_SUCCESS, SEARCH_POSTS_STOPPED} from '../redux/constants';

const intialState = {
  postsInSearch: [],
  isFetchingSearch: false,
  isSearched: false,
};

export default function SearchReducer(state = intialState, action) {
  switch (action.type) {
    case SEARCH_POSTS_SUCCESS: {
      return {
        ...state,
        error: null,
        isFetchingSearch: false,
        isSearched: true,
        postsInSearch: payload,
      };
    }

    case SEARCH_POSTS_STOPPED: {
      return {
        ...state,
        isFetchingSearch: false,
        isSearched: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
